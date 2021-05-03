import { P } from '../component/elements.jsx'
import { css } from '../lib/dom.js'
import { Button } from '../component/form.jsx'
import { Github } from '../component/icons.jsx'
import { API } from '../lib/env.js'
import { logo } from '../data/ascii'

css(`
.signin-container{
  min-height: 100vh;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: space-evenly;
}
`)

export const Login = () => {
  return (
    <div class="signin-container">
      <P fg="comment">{logo.split('#').join('')}</P>
      <Button
        value="Sign in with Github"
        link={`${API}/link/github`}
        icon={Github}
      />
    </div>
  )
}
