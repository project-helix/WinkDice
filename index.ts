import { Main } from './src/main';
import { Database } from 'quickmongo';
import { crashHandler } from './src/crashHandler';

export const db = new Database('mongodb://127.0.0.1:27017/website');

// const db = new QuickDB({ driver });

db.on('ready', () => {
	console.log("Connected to the database!")
	Loop()
})

async function db_connect() {
	// await mongoose.connect(config.uri)
	await db.connect();

	db.set('posts', [{ post_id: '<DUMMY>', likes: ['<DUMMY>'] }]);
	// db.set(
	// 	'env1',
	// 	JSON.stringify({
	// 		id: 1,
	// 		maintenance: 'false',
	// 	})
	// );
	const placeholder_bug = {
		id: 0,
		platform: undefined,
		user: undefined,
		severity: undefined,
		title: undefined,
		description: undefined
	}
	db.set("bigArray", {bugs:[{...placeholder_bug}],bugsSplit:[[{...placeholder_bug}]]})
}

db_connect()

function Loop() {
	try {
		Main()/*.then((ret) => {
			if (ret.code === "10001") return Loop()
		})*/
	} catch (e) {
		Loop()
	}
	// if ((await Main()).code === '10001') return Loop();
}