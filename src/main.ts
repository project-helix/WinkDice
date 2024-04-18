import * as http from 'node:http';

import axios from 'axios';
import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';

import logger, { morganMiddleware } from './utils/logger';
import { crashHandler, type CrashHandler } from './crashHandler';
// import { addWScache, ioServe } from './sockets';
import { AppDataSource } from './data-source';

import { PageRoutes } from './routes/main.router';
import { APIRoutes } from './routes/api.router';
import APIRoutes_Files from './routes/subroutes/api/files';

const ip = process.env.IP || '127.0.0.1';
const port = process.env.PORT || 3000;

const app: Express = express();
const server = http.createServer(app);

app.disable('x-powered-by')

const allowlist = ['*'];
const corsOptionsDelegate = function (req: Request, callback) {
	let corsOptions;
	if (allowlist.indexOf(req.header('Origin')) !== -1) {
		corsOptions = { origin: true };
	} else {
		corsOptions = { origin: false };
	}
	callback(null, corsOptions);
};

/**
 * @function Main
 */
export async function Main(): Promise<CrashHandler> {
	return new Promise(async (resolve, reject) => {
		try {
			await AppDataSource.initialize().then(async () => {
				logger.info(
					`Starting server on port http://${ip}:${port} (triggering an error in ${port} ms)`
				);

				const { addWScache, ioServe } = await import("./sockets")

				ioServe(server);

				app.use(cors(corsOptionsDelegate));

				app.set('view engine', 'ejs');
				app.set('views', 'views');
				app.set('layout', 'layouts/main');

				app.use(express.json());
				app.use(express.static('static'));
				app.use(require('cookie-parser')());
				app.use(require('express-ejs-layouts'));
				app.use(morganMiddleware);

				app.engine('.ejs', require('ejs').__express);

				app.use('/', PageRoutes);
				app.use('/api', APIRoutes);
				app.use('/files', APIRoutes_Files);

				app.all("*", (req: Request, res: Response, next: NextFunction) => {
					res.setHeader("x-powered-by", "Bigus Dickus")
					next();
				})

				app.all('*', (req: Request, res: Response, next: NextFunction) => {
					try {
						throw 'Could not find the page you were looking for';
					} catch (err) {
						return crashHandler.webResponseCodes[404](err, req, res);
					}
				});

				server.listen(Number(port), ip, () => {
					logger.info(`Server listening on port ${port}`);
					addWScache({
						id: 'sendAimedMesg',
						args: {
							target: 'global',
							message: {
								text: `Server re-started successfully`,
								position: 'top-center',
								pauseOnHover: true,
								pauseOnFocusLoss: true,
							},
						},
					});
				});
			});
		} catch (e) {
			resolve(crashHandler.mainFunctionExited(e));
		}
	});
}

async function fetchApiData(name: string) {
	const apiResponse = await axios.get(`https://api.genderize.io?name=${name}`);
	logger.info('Request sent to the API');
	return apiResponse.data;
}
