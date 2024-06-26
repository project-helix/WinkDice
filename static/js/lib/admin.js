import axios from "./axios.min.js";
import Utils, {
  Cookies,
  Toast,
  InfoUtils as PageInfo,
  CONFIG,
  cError,
  cWarn,
  _utils,
} from "./Utils.js";
import { html } from "./framework/index.js";
import { modal } from "../_globals.js";

document.onerror = (e) => cError(e, "lib/admin.js");
window.onerror = (e) => cError(e, "lib/admin.js");

document.onwarn = (e) => cWarn(e, "lib/admin.js");
window.onwarn = (e) => cWarn(e, "lib/admin.js");

const cookie = new Cookies();

export function RejectPageRequest(type, msg) {
  function writeDoc(msg) {
    document.querySelector("html").innerHTML = `
      <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" href="/css/theme/core.css" />
    
      <script src="/js/_globals.js" type="module" defer></script>
    
      <script src="https://code.iconify.design/iconify-icon/1.0.8/iconify-icon.min.js"></script>
      </head>
      <body>
      ${msg}
      </body>
    `;
  }
  html("main#main").env(async ({ set, on, get, add, attr }) => {
    if (type == "NoAdmin") {
      set(
        '<h1 class="button-label">403: Forbidden</h1><hr/>You are not allowed to access this page.<br/>also ur friendzoned'
      );
    } else if (type == "custom") {
      set('<h1 class="button-label">403: Forbidden</h1><hr/>' + msg);
    } else if (type == "maintenance") {
      set(
        '<h1 class="button-label">403: Forbidden</h1><hr/>Site is in maintenance mode'
      );
    } else if (type == "banned") {
      set(
        '<h1 class="button-label">403: Forbidden</h1><hr/>it seems like you are banned :('
      );
    } else {
      set('<h1 class="button-label">403: Forbidden</h1>');
    }
  });
  html(".footer-0").env(async ({ set, on, get, add, attr }) => {
    if(type == "maintenance" || type == "banned") {
    set(`
    <div class="nav">
      <button disabled class="openbtn" data-icon onclick="openNav()" style="cursor:not-allowed;color:var(--dark_5);width:20px;height:20px;padding:1px">
        <iconify-icon data-icon icon="mdi:menu-close" />
      </button>
      <button disabled href="/" data-icon class="openbtn" style="cursor:not-allowed;color:var(--dark_5);width:20px;height:20px;padding:1px">
        <iconify-icon data-icon icon="ic:round-home" />
      </button>
      <button disabled href="/login" data-icon class="openbtn" style="cursor:not-allowed;color:var(--dark_5);width:20px;height:20px;padding:1px">
        <iconify-icon data-icon icon="ph:sign-in-bold" />
      </button>
      <button disabled href="/dms" data-icon class="openbtn" style="cursor:not-allowed;color:var(--dark_5);width:20px;height:20px;padding:1px">
        <iconify-icon data-icon icon="ic:round-chat-bubble" />
      </button>
      <button disabled href="/files" data-icon class="openbtn" style="cursor:not-allowed;color:var(--dark_5);width:20px;height:20px;padding:1px">
      <iconify-icon data-icon icon="mdi:folder" />
      </button>
      <button disabled href="/theme" data-icon class="openbtn" style="cursor:not-allowed;color:var(--dark_5);width:20px;height:20px;padding:1px">
        <iconify-icon data-icon icon="solar:palette-round-bold" />
      </button>
      <hr/>
      <button disabled data-icon class="createPostBTN-1 openbtn" style="cursor:not-allowed;color:var(--dark_5);width:20px;height:20px;padding:1px">
        <iconify-icon data-icon icon="mdi:pencil-plus" />
      </button>
    </div>
    `);}
    attr("style").set("background:var(--red_err);cursor:not-allowed;");
  });
  // html(".sidebar").env(async ({ set, on, get, add, attr }) => {
  //   attr("style").set("background:var(--red_err);cursor:not-allowed;");
  //   add(`
  //     <style>
  //       .sidebar a {color:white;}
  //     </style>
  //   `)
  // });
}
export function CheckIfLoggedIn() {
  if (!_utils.$cookies.Check("UsrToken") == true) return false;
  else return true;
}

export async function CheckIfHasRole(role) {
  if (!_utils.$cookies.Check("UsrToken") == true) return false;
  if (!_utils.$cookies.Check("UsrName") == true) return false;
  else {
    const ax = await axios({
      method: "POST",
      url: "/api/users/getRawData",
      data: {
        data: {
          userName: _utils.$cookies.Get("UsrName"),
          userToken: _utils.$cookies.Get("UsrToken"),
        },
      },
    });
    try {
    return ax.data.roles.includes(role);
    } catch (e) {
      if (role == "banned") return true;
      else cError(e, "lib/admin.js")
    }
  }
}

export async function CheckIfAdmin() {
  return await CheckIfHasRole("admin")
  // return true
}
export function CheckIfAdminSync() {
  const ThisFuncSync = `<code>CheckIfAdminSync()</code>`
  const ThisFuncAsync = `<code>CheckIfAdmin()</code>`
  html("main#main").set(`
    <h1>CLIENTSIDE ERROR: Use of an experimental function</h1>
    <p>${ThisFuncSync} is used instead of ${ThisFuncAsync}</p>
    <p>${ThisFuncSync} is only avalible in development as of right now</p>
    <p>Please report this to the admins</p>
  `)
  setInterval(() => {
    alert("[IGNORE THIS, THIS IS TO BLOCK ANY INTERACTIONS WITH THIS PAGE]")
  }, 1);
  // if (!_utils.$cookies.Check("UsrToken") == true) return false;
  // else {
  //   const ax = axios({
  //     method: "POST",
  //     url: "/api/users/getRawData",
  //     data: {
  //       data: {
  //         userToken: _utils.$cookies.Get("UsrToken"),
  //       },
  //     },
  //   }).then(resp => resp);

  //   console.log(ax)
  //   // return ax.data.roles.includes("admin");
  // }
  // // return true
}

export function RejectIfNotAdmin() {
  if (!CheckIfAdmin()) RejectPageRequest("NoAdmin");
}

export async function checkIfBanned() {
  if (await CheckIfHasRole("banned") == false) return
  else {
    RejectPageRequest("banned")
    setInterval(async () => await modal({
      title: "ur Banned mother trucker",
      content: "",
      targets: ["global"]
    }), 100)
  }
}

checkIfBanned()