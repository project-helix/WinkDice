import axios from "/js/lib/axios.min.js";
// import { QuickDB } from "./lib/QuickDB/index.js";

import Utils, {
  Cookies,
  Toast,
  InfoUtils as PageInfo,
  CONFIG as CFG,
  cError,
  cWarn,
  _utils,
} from "./lib/Utils.js";
import { html } from "./lib/framework/index.js";

import { CheckIfAdminSync, CheckIfLoggedIn, RejectPageRequest } from "./lib/admin.js";

import "./_globals.js";
import { socket } from "./_globals.js";

// const db = new QuickDB({});
// const table = await db.table("test1");

// console.log(db, table);

// table.set("stateStore", {});
// table.set("stateStore.counter", 0);
// for (let i = 10; i > 0; i--) {
//   table.set(`stateStore.counter_${i}`, i);
//   _utils.$utils.getDomElement(".output").innerHTML = JSON.stringify(
//     await table.all()
//   );
//   // _utils.$utils.getDomElement(".output").innerHTML += JSON.stringify(await table.get(`stateStore.counter_${i}`))
// }

// _utils.$utils.getDomElement(".output").innerHTML += JSON.stringify(await table.all())

let state = {
  count: 0,
};

const ebolaState = {
  sex: {
    enabled: true,
  },
};

html(`:root`).env(async ({ set, on, get, add, attr }) => {
  // attr("data-theme").set("light");
  // attr("data-colorscheme").set("blue");
  // // attr("style").set("transition: all 0.1s;")
  // setInterval(() => {
  //   // attr("data-theme").set(nextTheme());
  //   attr("data-colorscheme").set(nextColor());
  // }, 150);
});
html("main.main2").env(async ({ set, on, get, add, attr }) => {
  set(`
    <button class="count btn">Count: 0</button>

    ${/* not verbose */ ebolaState.sex.enabled == true ? "sex" : ""}
    ${
      /* verbose */ (() => {
        let str = "";
        if (ebolaState.sex.enabled == true) str = "sex";
        return str;
      })()
    }
    ${(() => {
      let str = "";
      for (const item of [{ name: "a" }, { name: "b" }, { name: "c" }]) {
        str += "sex." + item.name + "<br/>";
      }
      return str;
    })()}
  `);
});

html(".count").on("click", async ({ set, on, get, add, attr }) => {
  attr("disabled").set("0");
  set(`Loading . . .`);
  setTimeout(incr, 100);
  function incr() {
    attr("disabled").remove();
    state.count++;
    set(`Count: ${state.count}`);
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
  "monochrome",
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






html("main.main2").add("<main class=\"main3\"></main>")
html("main.main3").env(({ set, on, get, add, attr }) => {
  set(`You Gea!`)
  attr("style").set(`
    background-color: #000;
    color: #FFF;
  `)
  on("click", ({ set, on, get, add, attr }) => {
    set(`just kidding <3`)
    attr("style").set(`
      background-color: #022;
      color: #FAA;
    `)
  })
});
