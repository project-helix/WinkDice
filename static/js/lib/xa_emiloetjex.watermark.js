// import axios from "./axios.min.js";
import Utils, {
  Cookies,
  Toast,
  InfoUtils as PageInfo,
  CONFIG as CFG,
  _utils,
} from "./Utils.js";
import { html } from "./framework/index.js";
import { v3, v4, merge } from "./encryptionGen.js";

const lai = html(`.licensing-and-info`);

lai.env(async ({ set, on, get, add, attr }) => {
  add(
    commentOrNot(`
        <form>
            <label for="inf"><h1>Info:</h1></label>
            <ul id="inf">
                <li><h4>xA_Emiloetjex's web framework:</h4> <code>v2.0.1</code></li>
                <li><h4>xA_Emiloetjex's backend framework (Build on top of express):</h4> <code>v3.4.10</code></li>
                <li><h4>Express:</h4> <code>v4.18.2</code></li>
            </ul>
            <label for="lic"><h1>Licensing:</h1></label>
            <ul id="lic">
                <li><h4>The project as a whole:</h4>
                    <ol>
                        1. Just don't use any of my code for commercial use without my permission<br/>
                        2. Do not tell people that my code is your code / claim that it's your own (there is a difference but just don't do either of them)<br/>
                        3. Do not be a dick<br/>
                        4. if you so use my code then credit me and the page where you got the code<br/>
                        5. You cannot patent any part of your program where you use my code<br/>
                        6. I am not liable for any vulnerabilities that my code may bring into your program nor do i give you the warranty/guarantee of the following things:
                                - that my code is performant<br/>
                                - that my code is secure<br/>
                                - that i won't backdoor it so that i can disable functions in case of a break of this license<br/>
                                - that i won't change the terms of this license
                        <br/>
                        7. The license terms on this page are the ones that are valid, if you do not update your license and i change the terms and you break said new terms then you are liable<br/>
                        8. These are my terms that i set for my code, this license is valid since it's not only on every page in the devtools, but also it has it's own page<br/>
                    </ol>
                </li>
            </ul>
        </form>
    `)
  );
});

function commentOrNot(stuff) {
  if (document.URL.endsWith("/license")) return stuff;
  else return `<!-- ${stuff} -->`;
}