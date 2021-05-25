import { Div, P } from "../component/elements";
import { NavLink } from "../component/header";
import { logo } from "../data/ascii";
import { css } from "../lib/dom";
import { API } from "../lib/env";

css(`
.div-login {
  display: flex;
  flex-flow: column wrap;
  min-height: 100vh;
  justify-content: center;
  align-items:center;
}
`)


export const Login = () => (
  <Div class="div-login">
    <P fg="comment">{logo.split("#")}</P>
    <NavLink href={`${API}/link/github`}  style={{fontSize: 30}}>
      Join with Github
    </NavLink>
  </Div>
)
