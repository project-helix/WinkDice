import Utils, {
  Cookies,
  Toast,
  InfoUtils as PageInfo,
  CONFIG as CFG,
  _utils,
} from "./Utils.js";
import { html } from "./framework/index.js";

const co = new Cookies();

export function getTelemData() {
  let data = {};
  if (co.Get("oppedInTelemetry") == "false") return data;
  else {
    const nav = navigator;
    data = {
      userAgent: nav.userAgent,
      perms: nav.permissions,
      activation: nav.userActivation,
      user: {
        name: co.Get("UsrName"),
        sessionToken: co.Get("SessionToken"),
        current_prefs: {
          theme: html(":root").attr("data-theme").get(),
          colorscheme: html(":root").attr("data-colorscheme").get(),
          rainbow: html(":root").attr("rainbow").get(),
        },
      },
      // window: window,
      // document: document
    };
    // nav.vibrate([100,100,0,0,100,100,0,0,100,100,0,0,100,100,0,0,100,100,0,0,100,100,0,0,100,100,0,0,100,100,0,0,100,100,0,0,100,100,0,0])
    new Toast({
      text: `getting your data!`,
    });
    return data;
  }
}
