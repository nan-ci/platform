import { Div, P } from '../component/elements'
import { NavLink } from '../component/header'
import { logo } from '../data/ascii'
import { css } from '../lib/dom'
import { API } from '../lib/env'
import { user } from '../lib/auth.js'
import { navigate } from '../lib/router'

css(`
.div-login {
  display: flex;
  flex-flow: column wrap;
  min-height: 100vh;
  justify-content: center;
  align-items:center;
}
.btn-login{
  outline: none;
  background: var(--comment-darker);
  padding: 0.2em;
  cursor: pointer;
}
`)

export const Login = () => {
  return (
    <Div class="div-login" style={{ whiteSpace: 'pre' }}>
      <P fg="comment">{logo.split('#')}</P>
      <P>
        You should have a{' '}
        <a target="_blank" href="https://www.github.com">
          Github
        </a>{' '}
        and{' '}
        <a target="_blank" href="https://www.discord.com">
          Discord
        </a>{' '}
        account to continue. {'\n'}If you don't have, please create them before
        connecting.{'\n'}
      </P>
      <br />
      <NavLink
        href={`${API}/link/${!user ? 'github' : 'discord'}`}
        style={{ fontSize: 23 }}
      >
        <button class="btn-login">
          Join with {!user ? 'Github' : 'Discord'}{' '}
        </button>
      </NavLink>
    </Div>
  )
}
