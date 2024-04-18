import { exec } from 'node:child_process';

import { Queue, Worker } from 'bullmq';
import io from 'socket.io';

import { ValidateAuthenticity } from './utils/validators';
import logger from './utils/logger';
import { crashHandler } from './crashHandler';

import { AppDataSource as db } from './data-source';
import { Env } from './entity/Env';

import { queueNames, Caches } from './namespaces';
import { cache } from './cache';

import { db as mdb } from '..';


const AllowedAdmins = ['xA_Emiloetjex'];
let data = {
	session: {
		sessionToken: String(),
		userName: String(),
		userToken: String(),
	},
};
const io_ = io;

const connection = {
	host: '127.0.0.1',
	port: 6379,
};

const wsQueue = new Queue(queueNames.wsQueue, { connection });

let internalProcessing = {
	val: 0,
	cache: [],
};

// const env_table = mdb

const envRepo = db.getRepository(Env);


export async function getEnv(id: number) {
	let result;
	let isCached = false;
	try {
		const cacheResult = cache.get(`${Caches.env}__env_${id}`);
		if (cacheResult) {
			isCached = true;
			result = JSON.parse(cacheResult);
		} else {
			result = await envRepo.findOneBy({id})
			if (result.length === 0) {
				throw `cache not found and could not be constructed`;
			}
			cache.set(
				`${Caches.env}__env_${id}`,
				JSON.stringify(result)
			);
		}

		return {
			status: 'success',
			data: result,
		};
	} catch (e) {
		console.log(e)
		return {
			status: 'failed',
			data: crashHandler.DB.general[100](e),
		};
	}
}

export async function addWScache(data: process) {
	internalProcessing.val++;
	await wsQueue.add(
		`${queueNames.wsQueue}_job_${internalProcessing.val}`,
		data
	);
}

export async function ioServe(Server) {
	const io = new io_.Server(Server);
	io.on('connection', async (socket) => {
		// logger.info(`Socket connected:`, socket.id);
		// socket.on("disconnect", () => {
		//     logger.info(`1 connection lost`)
		// })
		socket.on('requestGlobalState', async () => {
			const maps = await syncGlobalStateCookies();
			socket.emit('responseGlobalState', maps);
		});
		socket.on('newMessage', async (data) => {
			io.emit('newMessage', data.target);
		});
		socket.on('incidentReport', incidentReport);

		socket.on('addQueue', async (data) => {
			addWScache(data);
		});

		let wsQueue_worker;
		wsQueue_worker = new Worker(
			queueNames.wsQueue,
			async (job) => {
				logger.info(`[WS_Queue Job]: ${job.id}`, job.data);
				exec(job.data);

				return (internalProcessing.val -= 1);
			},
			{ connection }
		);
		wsQueue_worker.on('completed', (job) => {
			logger.info(`[WS_Queue Job]: ${job.id}`, `COMPLETED!`);
		});

		wsQueue_worker.on('failed', (job, err) => {
			logger.error(`[WS_Queue Job]: ${job.id}`, `Failed with: `, err.message);
		});

		function exec(process: process) {
			console.log(process);
			if (process.id == 'setcookie') {
				const data: ICookie = process.args as unknown as ICookie;
				setGlobalStateCookies(data.key, data.value);
				return io.emit(process.id, process.args);

				interface ICookie {
					key: string;
					value: string;
					exp?: Date | number;
				}
			} else if (process.id == 'incidentReport')
				return incidentReport(process.args, socket);
			else if (process.id == 'notification_send')
				return ntfc_r(process.args, socket, io);
			else if (process.id == 'console_cmd')
				return execConsole(process.args as unknown as IConsole_ws, io);
			// else if (process.id == "sendAimedMesg")
			//   return void(0);
			else return io.emit(process.id, process.args);
		}
	});
	return io;
}

export const env = async () => (await getEnv(1)).data;

async function execConsole(data: IConsole_ws, io) {
	const sesh = {
		username: data.session.userName,
		usertoken: data.session.userToken,
		sessiontoken: data.session.sessionToken,
	};

	const neoData = {
		user: {
			name: sesh.username,
			token: sesh.usertoken,
		},
	};

	try {
		if ((await ValidateAuthenticity(neoData)) == false)
			return io.emit('console_err', {
				response:
					"Your username and token don't match, please log out and back in!",
				session: data.session,
			});
		else {
			if (data.type == undefined) data.type = '';
			if (data.type == 'node') {
				if (!AllowedAdmins.includes(sesh.username))
					return io.emit('console_err', {
						response: 'You are not allowed to use this',
						session: data.session,
					});
				return io.emit('console_resp', {
					response: await eval(data.cmd),
					session: data.session,
				});
			} else if (data.type == 'server_function') {
				if (data.cmd == 'restart') {
					await io.emit('console_resp', {
						response: 'Restart command initiated',
						session: data.session,
					});
					await addWScache({
						id: 'modal',
						args: {
							title: 'WARNING!',
							content:
								'<header style="color:var(--theme-fg)">Server Restart initiated (Service shuts down in 3 seconds)</header>',
							targets: ['global'],
						},
					});
					await setTimeout(() => process.exit(0), 3000);
				} else
					io.emit('console_err', {
						response: 'unknown command',
						session: data.session,
					});
				return;
			} else {
				if (!AllowedAdmins.includes(sesh.username))
					return io.emit('console_err', {
						response: 'You are not allowed to use this',
						session: data.session,
					});
				const cmdExc = exec(data.cmd);
				cmdExc.stdout.on('data', (_) =>
					io.emit('console_resp', {
						response: _,
						session: data.session,
					})
				);
				cmdExc.stderr.on('data', (_) =>
					io.emit('console_err', {
						response: _,
						session: data.session,
					})
				);
			}
		}
	} catch (e) {
		io.emit('console_err', { response: e, session: data.session });
	}
}

function incidentReport(data, socket) {
	try {
		logger[data.level](
			`{file:${data.data.file},userID:${data.data.userId},sessionID:${data.data.sessionId}}}:\n${data.message}`
		);
	} catch (e) {
		socket.emit('console_err', { response: e, session: data.session });
	}
}

async function setMaintenance(val: string) {
	const envi = new Env();
	envi.id = 1;
	envi.maintenance = val;
	await db.manager.save(envi);

	await cache.set(
		`${Caches.env}__env_1`,
		JSON.stringify(await envRepo.findOneBy({ id: 1 }))
	);
}
async function getMaintenance() {
	return await env()
}

async function ntfc_r(args, socket, io) {
	try {
		const { msg, data } = args;
		console.log('Confirm that this is the Console.log!!!', msg);
		if (msg.split('')[0] == '@') {
			if (msg.split(' ')[0] == '@maintenance') {
				if (msg.split(' ')[1] == 'status') {
					// StoreMessage({
					//   target: data.target,
					//   sender: "[ADMIN BOT]",
					//   content:
					//     "Maintenance enabled == " + (await getMaintenance()).maintenance,
					//   isBot: true,
					//   cmdSender: data.sender,
					// });
					io.emit('sendAimedMesg', {
						target: 'global',
						message: {
							text: `Maintenance enabled == ${
								(await getMaintenance()).maintenance
							}`,
							position: 'top-right',
							pauseOnHover: true,
							pauseOnFocusLoss: true,
						},
					});
				}
				if (msg.split(' ')[1] == 'set') {
					try {
						setMaintenance(msg.split(' ')[2]);
						setGlobalStateCookies('maintenanceMode', msg.split(' ')[2]);

						console.log(data);

						// StoreMessage({
						//   target: data.target,
						//   sender: "[ADMIN BOT]",
						//   content:
						//     "Maintenance enabled == " + (await getMaintenance()).maintenance,
						//   isBot: true,
						//   cmdSender: data.sender,
						// });
						if (msg.split(' ')[2] == 'true') {
							io.emit('sendAimedMesg', {
								target: 'global',
								message: {
									text: 'Site is put into maintenance mode, you will be redirected in about 3 seconds!',
									position: 'top-right',
									pauseOnHover: true,
									pauseOnFocusLoss: true,
								},
							});
							setTimeout(() => {
								io.emit('server command', 'rl', [null]);
							}, 3000);
						} else if (msg.split(' ')[2] == 'false') {
							io.emit('sendAimedMesg', {
								target: 'global',
								message: {
									text: "Site isn't in maintenance (anymore), you will be redirected in about 3 seconds!",
									position: 'top-right',
									pauseOnHover: true,
									pauseOnFocusLoss: true,
								},
							});
							setTimeout(() => {
								io.emit('server command', 'rl', [null]);
							}, 3000);
						} else {
							setMaintenance('false');
							// StoreMessage({
							//   target: data.target,
							//   sender: "[ADMIN BOT]",
							//   content:
							//     "Sorry... couldn't set maintenance mode to: " +
							//     (await getMaintenance()).maintenance +
							//     " Only true or false are allowed options",
							//   isBot: true,
							//   cmdSender: data.sender,
							// });
						}
					} catch (e) {}
				}
			}
			if (msg.split(' ')[0] == '@eval') {
				const args = String(msg).split(' ').slice(1, msg.length);
				io.emit('server command', 'test', args, data.meta);
			}
			if (msg == '@rl') {
				io.emit('server command', 'rl', [null]);
			}
			if (msg.split(' ')[0] == '@rlUser') {
				io.emit('server command', 'rlUser', msg.split(' ')[1]);
			}
			if (msg.split(' ')[0] == '@rlSpec') {
				io.emit('server command', 'rlSpec', msg.split(' ')[1]);

				io.emit('sendAimedMesg', {
					target: data.sender,
					message: {
						text: `Reloaded: ${msg.split(' ')[1]}`,
						position: 'top-right',
						pauseOnHover: true,
						pauseOnFocusLoss: true,
					},
				});
			}
		} else {
			// console.log("Potential Loop poi #1");
			io.emit('sendAimedMesg', {
				target: 'global',
				message: {
					text: msg,
					position: 'top-right',
					pauseOnHover: true,
					pauseOnFocusLoss: true,
				},
			});
		}
	} catch (e) {
		socket.emit('console_err', { response: e, session: data.session });
	}
}

export const globalState = {
	cookies: new Map(),
};

const globalStateCookies = ['epilepsyMode', 'maintenanceMode'];
let globalStateMaps = [];

async function syncGlobalStateCookies() {
	await globalStateCookies.forEach((cookie) => {
		const cookie_ = globalState.cookies.get(cookie);
		const cookie_Sate = cookie_ == undefined ? false : cookie_;
		return globalStateMaps.push({ key: cookie, value: cookie_Sate });
	});
	return globalStateMaps;
}
function setGlobalStateCookies(key, value) {
	if (globalState.cookies.has(key)) globalState.cookies.delete(key);
	return globalState.cookies.set(key, value);
}

function executeShell(cmd) {
	return new Promise((resolve, reject) => {
		exec(cmd, (error, stdout, stderr) => {
			if (error) {
				reject(error);
			} else {
				resolve(stdout);
			}
		});
	});
}

interface IConsole_ws {
	type: 'node' | 'bash' | string;
	cmd: string;
	session: {
		sessionToken: string;
		userName: string;
		userToken: string;
	};
}

interface process {
	id: string;
	args: object | string;
}
