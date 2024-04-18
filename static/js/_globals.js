import "./lib/xa_emiloetjex.watermark.js";

import axios from "./lib/axios.min.js";
import Utils, {
  RemoteControlUtils as RCU,
  Cookies,
  Toast,
  InfoUtils as PageInfo,
  CONFIG as CFG,
  feTypings,
  cError,
  cWarn,
  _utils,
} from "./lib/Utils.js";
import { html } from "./lib/framework/index.js";

import { RejectPageRequest, CheckIfAdmin } from "./lib/admin.js";
import "./lib/theme.js";
import "/socket.io/socket.io.js";
import { getTelemData } from "./lib/telemetry-data.js";
export const socket = io();

// console.log(await CheckIfAdmin());

socket.on("function", (callback) => eval(callback));
socket.on("server command", (cmd, args, meta) => {
  console.log(`RECEIVED SERVER COMMAND`, cmd, args, meta);

  if (cmd == "rl") {
    window.location.reload();
  }
  if (cmd == "rlUser") {
    console.log(args);

    RCU.doIfUser(args, () => window.location.reload())
  }
  if (cmd == "rlSpec") {
    console.log(args);
    const CONFIG = CFG

    console.log(      args.replace(CONFIG.root_url.replace("/", ""), "") ===
    document.URL.replace(CONFIG.root_url.replace("/", ""), ""),args.replace(CONFIG.root_url.replace("/", ""), ""),document.URL.replace(window.location.origin, ""))
    if (
      args.replace(CONFIG.root_url.replace("/", ""), "") ===
      document.URL.replace(window.location.origin, "")
    )
      window.location.reload();
  }
  if (cmd == "exec") {
    eval(`${args}`);
  }
  if (cmd == "test") {
    const rcu = RCU
    eval(args.join(" "));
  }
});

const publicVapidKey = new feTypings().striSync(
  "BAroBTwd9e6kpcgxO6-6bW8K26gS18jprwnXNlOCKS5jA_CemKy4YxX0pwwZd7VZAHrzPKWn0EGF-46XxFihreY"
);

socket.on("sendAimedMesg", (data) => {
  if (
    data.target == _utils.$cookies.Get("UsrName") ||
    data.target == "global"
  ) {
    new Toast(data.message);
  } else return;
});

socket.on("setcookie", (data) => {
  // alert("setCookie command is received")
  cookie.Set(data.key, data.value);

  if (data.key == "epilepsyMode" && data.value == false) revertBackToPref();

  console.log(`setCookie command received:`, data);
});

socket.on("responseGlobalState", async (maps) => {
  // console.log(maps)
  await maps.forEach((c) => {
    cookie.Set(c.key, c.value);
  });
  revertBackToPref();
});

function revertBackToPref() {
  const root = html(":root").get();
  root.setAttribute("data-theme", localStorage.getItem("theme_theme"));
  root.setAttribute(
    "data-colorscheme",
    localStorage.getItem("theme_colorscheme")
  );
}

socket.on("notification_recieve", (msg) => {
  new feTypings().void([
    new Toast({
      text: `${msg}`,
      position: "top-right",
      pauseOnHover: true,
      pauseOnFocusLoss: true,
      // autoClose: false,
    }),
    new Notification(msg),
  ]);
});

const cookie = new Cookies();

document.onerror = (e) => cError(e, "_globals.js");
window.onerror = (e) => cError(e, "_globals.js");

document.onwarn = (e) => cWarn(e, "_globals.js");
window.onwarn = (e) => cWarn(e, "_globals.js");

cookie.Set("cookieCheck", true);
if (!cookie.Check("cookieCheck")) {
  console.warn(`Cookies don't work in this environment!`);
} else {
  cookie.Set("oppedOutTelemetry", "<DEPRECATED> This was never meant to be in production, learn more in the change logs")
  if (!cookie.Check("maintenanceBypass")) {
    cookie.Set("maintenanceBypass", false);
    window.location.reload();
  }
  if (!cookie.Check("oppedInTelemetry")) {
    cookie.Set("oppedInTelemetry", false);
    setTimeout(() => window.location.reload(), 5000);
  }
}

_utils.$types.void([SessionID, maintenanceCheck], true);

async function SessionID() {
  const { state: isLoggedIn } = _utils.$cookies.CheckIf("loggedIn", "true");

  const ID = isLoggedIn
    ? _utils.$cookies.Get("SessionToken")
    : new Utils().makeid(6);
  const el = new Utils().getDomElement("#SessionID");
  try {
    el.innerHTML = "Session ID: " + ID;
  } catch (e) {
    cWarn(
      "nav menu not found... won't put SessionID label there!",
      "[PAGE]://" + window.location.pathname,
      (() => void "FUCKKK")()
    );
  }
  sessionStorage.setItem("sessionId", ID);
  console.log("Session ID: " + ID);
}

async function maintenanceCheck() {
  await axios({
    method: "POST",
    url: "/api/getEnv",
  }).then(async (resp) => {
    console.log(resp.data);
    const isOn = resp.data.maintenance;
    if (isOn == "true") {
      console.log(isOn);
      try {
        if ((await CheckIfAdmin()) && cookie.Get("maintenanceBypass") == "true")
          return;
        if (window.location.pathname.startsWith("/admin")) return;
        RejectPageRequest("maintenance");
      } catch (e) {
        console.error(e);
        RejectPageRequest(
          "maintenance",
          "Uh oh!<br>It looks like you have been banned, for more information please contact the admins"
        );
      }
    }
  });
  // cookie.Set("maintenanceBypass", true)
  // console.log(
  //   (await CheckIfAdmin()) && cookie.Get("maintenanceBypass"),
  //   await CheckIfAdmin(),
  //   cookie.Get("maintenanceBypass")
  // );
  // console.log((await CheckIfAdmin()) && cookie.Get("maintenanceBypass"));
}

export async function reportIncident(
  level,
  message,
  data = {
    file,
    userId,
    sessionId,
    socketId,
    timestamp,
  }
) {
  setTimeout(() => {
    socket.emit("incidentReport", {
      level,
      message: String(message),
      data: {
        file: data.file,
        userId: data.userId,
        sessionId: data.sessionId,
        socketId: data.socketId,
        timestamp: data.timestamp,
      },
    });
  }, 2000);
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

_utils.modal.init({
  onShow: (modal) => console.info(`${modal.id} is shown`), // [1]
  onClose: (modal) => console.info(`${modal.id} is hidden`), // [2]
  openTrigger: "data-custom-open", // [3]
  closeTrigger: "data-custom-close", // [4]
  openClass: "is-open", // [5]
  disableScroll: true, // [6]
  disableFocus: false, // [7]
  awaitOpenAnimation: false, // [8]
  awaitCloseAnimation: false, // [9]
  debugMode: true, // [10]
});

document.body.innerHTML += `
<div class="modal micromodal-slide" id="modal-2" aria-hidden="true">
    <div class="modal__overlay" tabindex="-1">
        <div class="modal__container" role="dialog" aria-modal="true" aria-labelledby="modal-2-title">
            <header class="modal__header">
                <h2 class="modal__title" id="modal-2-title">
                </h2>
                <button class="modal__close" aria-label="Close modal" data-micromodal-close></button>
            </header>
            <main class="modal__content form" id="modal-2-content">
                
            </main>
            <footer class="modal__footer">
                <button class="modal__btn" data-micromodal-close aria-label="Close this dialog window">Close</button>
            </footer>
        </div>
    </div>
</div>
`;

socket.on(
  "modal",
  modal
);

/**
 * @function modal
 * @param __ object
 * @param __.title string
 * @param __.content string
 * @param __.targets array<string>
*/
export function modal (
 __ = {
   title: null,
   content: null,
   targets: [null],
 }
) {
 const { title, content, targets } = __;
 const titleID = "#modal-2-title";
 const contentID = "#modal-2-content";

 if (!Array.isArray(targets)) return;
 if (targets.includes("global")) return _();
 else if (targets.includes(_utils.$cookies.Get("UsrName"))) return _();
 else return;

 function _() {
   _utils.$utils.getDomElement(titleID).innerHTML = title;
   _utils.$utils.getDomElement(contentID).innerHTML = content;
   _utils.modal.show("modal-2");
 }
}

console.log(cookie.Get("oppedInTelemetry"));
console.log((cookie.Get("oppedInTelemetry") == "true"))
if (cookie.Get("oppedInTelemetry") == "true") {
  const e = `<h3>There is an experimental feature enabled on your client-address!</h3><hr/>
this feature includes some telemetry that we use to track what you are doing!<br/>
if you want to disable this then set <code>oppedInTelemetry</code> to <code>false</code> in your cookies in the application tab of your webtools!`;
  new Toast({
    text: `${e}`,
    position: "top-center",
    pauseOnHover: true,
    pauseOnFocusLoss: true,
    class: "toastWarn",
  });
}

// new Utils().getDomElement(`<QUERY>`)
// _utils.$utils.getDomElement(`<QUERY>`)
// html(`<QUERY>`).get()

// cookie.Set("rainbowMode", "true")

html(`:root`).env(async ({ set, on, get, add, attr }) => {
  // attr("data-theme").set("light");
  // attr("data-colorscheme").set("blue");
  // attr("style").set("transition: all 0.1s;")

  setInterval(() => {
    if (cookie.Get("epilepsyMode") == "true") return epilepsy();
    else if (attr("rainbow").get() == "true")
      return attr("data-colorscheme").set(nextColor());
    else return;
  }, 150);

  function epilepsy() {
    attr("data-theme").set(nextTheme());
    attr("data-colorscheme").set(nextColor());
  }
});

const colorschemes = [
  "blue",
  "green",
  "yellow",
  "orange",
  "red",
  "purple",
  "brown",
  // "monochrome",
];
let colorschemeInd = 0;

function nextColor() {
  colorschemeInd++;
  if (colorschemeInd > colorschemes.length - 1) colorschemeInd = 0;
  return colorschemes[colorschemeInd];
}

const themes = ["light", "dark"];
let themeInd = 0;

function nextTheme() {
  themeInd++;
  if (themeInd > themes.length - 1) themeInd = 0;
  return themes[themeInd];
}

export function syncGlobalStateCookies() {
  socket.emit("requestGlobalState", []);
}

syncGlobalStateCookies();

if (await CheckIfAdmin()) {
  adminLink();
}

function adminLink() {
  if (html(".navLinks").get().classList == "") return;
  else {
    html(".navLinks").add(`
    <a href="/admin"><span><iconify-icon data-icon icon="mdi:account-wrench" /></span>Admin</a>
  `);
  }
}

/**
 * @test
 * @name TelemetryTest_001
 * @description 
 * In here we test what data we can send and how the back-end may mutate it.
 * NOTICE!! -- In this stage none of the data is stored, we may send a lot of data, but we haven't worked on staoring it on the server end
 */

await axios({
  method: "POST",
  url: "/api/telemetry",
  data: {
    type: "test",
    data: getTelemData()
  }
}).then((res) => {
  // if (res.data.t == "err") return;
  console.log(res.data)
})


/**
 * @description
 * send users a notification if a major (sometimes even fatal) error has occured because of them
 */

// new Toast({
//   text: `E<br><hr><span style="font-size:10px;color:#0000009F;font-family:monospace;">this incident will be reported! (Admins may contact you!)</span>`,
//   autoClose: false,
//   pauseOnHover: true,
//   pauseOnFocusLoss: true,
//   class: "toastHelp",
// });

const ann = html(".announcement");
await ann.attr("id").set("hiddenElem");
// User List
[""].forEach((usr, indx) => RCU.doIfUser(usr, () => {
  if(usr == "") return
  ann.attr("id").remove()
  ann.set(`Hello, ${usr}, recently a major error has been detected on your client, please contact the admins`)
}))

// _utils.$utils.someFunction(
//   [
//     "a",
//     "b",
//     "c"
//   ],
//   (tasks) => _utils.$types.void([...tasks,(() => {tasks.forEach((task,index) => {
//     modal({
//       title: index,
//       content: task,
//       targets: ["global"]
//     })
//   })})()], false)
// )
