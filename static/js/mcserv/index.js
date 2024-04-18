import axios from '/js/lib/axios.min.js';

import Utils, {
	Cookies,
	Toast,
	InfoUtils as PageInfo,
	CONFIG as CFG,
	cError,
	cWarn,
	_utils,
} from '../lib/Utils.js';

import '../_globals.js';
import { socket } from '../_globals.js';
import {
	CheckIfAdmin,
	CheckIfLoggedIn,
	RejectIfNotAdmin,
	RejectPageRequest,
} from '../lib/admin.js';
import { html } from '../lib/framework/index.js';

import { DemoObject } from '/js/mcserv/demo-object.js';

if (!CheckIfLoggedIn()) RejectPageRequest('NoAdmin');
if (!(await CheckIfAdmin())) RejectPageRequest('NoAdmin');

window.console.warn = (e) => cWarn(e, 'adminPanel.js');
window.console.error = (e) => cError(e, 'adminPanel.js');
document.onerror = (e) => cError(e, 'adminPanel.js');
window.onerror = (e) => cError(e, 'adminPanel.js');
document.onwarn = (e) => cWarn(e, 'adminPanel.js');
window.onwarn = (e) => cWarn(e, 'adminPanel.js');

const Koenk = new Cookies();

const sjenks = {
	method: 'GET',
	url: '/api/services/mc',
};

if (String(window.location.search).includes('demo=1')) {

  html(".mcServ_Header").add(`<h3>This is a demo to exit just remove <code>?demo=1</code> from the url!</h3>`)

	let currentPing = 0;

	function NextPing() {
		const ping = currentPing;
		if (ping < 50) return (currentPing = 51);
		else if (ping < 100) return (currentPing = 101);
		else if (ping < 150) return (currentPing = 151);
		else if (ping < 200) return (currentPing = 201);
		else if (ping < 250) return (currentPing = 251);
		else if (ping < 300) return (currentPing = 301);
		else if (ping < 350) return (currentPing = 351);
		else if (ping < 400) return (currentPing = 401);
		else if (ping >= 400) return (currentPing = 0);
	}

  Populate()

	setInterval(Populate, 1000);


  function Populate() {
    html('.buglist').set('');
		addCard({
			servername: "Demo -- Dynamic",
			status: 'unavailable',
			players: [],
			playercount: 0,
			max_playercount: 0,
			software: 'unknown',
			ip: '127.0.0.1',
			port: 25565,
			ping: NextPing(),
			version: '',
			isBehindProxy: false,
		});
    for (const c of DemoObject) {
			addCard(c);
		}
  }
} else {
	axios(sjenks).then((resp) => {
		const inst = resp.data;
    if (inst.length == 0) return DemoMessage()
		for (const c of inst) {
			addCard(c);
		}
	});

	setInterval(() => {
		axios(sjenks).then((resp) => {
			const inst = resp.data;
			html('.buglist').set('');
      if (inst.length == 0) return DemoMessage()
			for (const c of inst) {
				addCard(c);
			}
		});
	}, 1000);
}
/**
 *
 * @param {IServerStats} data
 */
async function addCard(data) {
	// console.log(data)
	const availibleLabel =
		data.status == 'available'
			? `<code class="button-label bug-tag bug-fixed">Available</code>`
			: `<code class="button-label bug-tag bug-fatal">Unavailable</code>`;
	const ip =
		data.hostname == undefined ? `${data.ip}:${data.port}` : data.hostname;
	const proxied =
		data.isBehindProxy == true ? `[Accessible through the proxy server]` : ip;
	html('.buglist').add(`
      <li class="form">
        <header style="display:flex">
          ${availibleLabel}
          <span style="color:var(--theme-bg-shade-2)">----</span>
          ${data.servername}
          <span style="color:var(--theme-bg-shade-2)">----</span>
          <code class="button-label" style="background:var(--theme-bg-shade-4)">${
						data.playercount
					}/${data.max_playercount}</code>
        </header>
        <hr/>
        <code class="button-label" style="background:var(--theme-bg-shade-4)">${proxied}</code>
        ${pinglabel(data.ping)}
      </li>
      <br/>
    `);
}

function pinglabel(ping) {
	const colorize = (color) =>
		`Ping: <code class="button-label" style="background:${color}">${ping} ms</code>`;
	if (ping < 50) return colorize(`var(--green_5)`);
	else if (ping < 100) return colorize(`var(--green_3)`);
	else if (ping < 150) return colorize(`var(--green_1)`);
	else if (ping < 200) return colorize(`var(--yellow_1)`);
	else if (ping < 250) return colorize(`var(--yellow_3)`);
	else if (ping < 300) return colorize(`var(--orange_2)`);
	else if (ping < 350) return colorize(`var(--orange_4)`);
	else if (ping < 400) return colorize(`var(--red_2)`);
	else if (ping >= 400) return colorize(`var(--red_4)`);
}


function DemoMessage() {
  return html('.buglist').add(`
    <h3>It seems like we couldn't find any servers,
      if you want to know what the UI looks liek then check the<a href="?demo=1">DEMO</a>!</h3>
    `)
}