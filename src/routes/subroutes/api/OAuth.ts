import express, { Express, Request, Response, IRouter, IRoute } from "express";
import path from "node:path"

const OAuth_Conf: IOAuth_Conf = {
    clientId: "617261487613804545",
    clientSecret: "7-60RAt3SMKvdOArAAt6aiyssvfS8oEl"
}

type Req = Request;
type Res = Response;

class API_OAuth {
    public router: IRouter;
    constructor() {
        this.router = express.Router();
        // this.router.get("/", this.index)
    }

//     index(req: Req, res: Res): IRoute {
//         res.send(`
//         <!DOCTYPE html>
//         <html>
//             <head>
//                 <title>My Discord OAuth2 App</title>
//             </head>
//             <body>
//                 <div id="info">Hoi!</div>
//                 <a id="login" style="display: none;" href="your-oauth2-URL-here">Identify Yourself</a>
// <script>
// 	window.onload = () => {
// 		const fragment = new URLSearchParams(window.location.hash.slice(1));
// 		const [accessToken, tokenType] = [fragment.get('access_token'), fragment.get('token_type')];

// 		if (!accessToken) {
// 			return (document.getElementById('login').style.display = 'block');
// 		}

// 		fetch('https://discord.com/api/users/@me', {
// 			headers: {
// 				authorization: \`\${tokenType} \${accessToken}\`,
// 			},
// 		})
// 			.then(result => result.json())
// 			.then(response => {
// 				const { username, discriminator } = response;
// 				document.getElementById('info').innerText += \` \${username}#\${discriminator}\`;
// 			})
// 			.catch(console.error);
// 	};
// </script>
//             </body>
//         </html>
        
//         `)
//         return
//     }
}

export const APIRoutes_OAth = new API_OAuth().router
export default APIRoutes_OAth

interface IOAuth_Conf {
    clientId: string;
    clientSecret: string;
}