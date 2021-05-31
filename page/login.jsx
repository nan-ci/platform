import { Div, P } from '../component/elements'
import { NavLink } from '../component/header'
import { logo } from '../data/ascii'
import { css } from '../lib/dom'
import { API } from '../lib/env'

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
    <P fg="comment">{logo.split('#')}</P>

    <P fg="comment">
      {'\n'}
      <strong>NB : </strong>
      you should have a github and discord account first.{'\n'}
      If you don't have one, please create them before connecting.{'\n'} create
      a github account{' '}
      <NavLink
        style={{ cursor: 'pointer' }}
        target="_blank"
        href="https://www.github.com"
      >
        https://www.github.com
      </NavLink>
      {'\n'} create a discord account{' '}
      <NavLink
        style={{ cursor: 'pointer' }}
        target="_blank"
        href="https://www.discord.com"
      >
        https://www.discord.com
      </NavLink>
    </P>
    <br />
    <NavLink href={`${API}/link/github`} style={{ fontSize: 30 }}>
      <button
        style={{
          outline: 'none',
          background: '#6070a4',
          padding: '0.5rem',
          borderRadius: '12px',
          cursor: 'pointer',
        }}
      >
        Join with Github
      </button>
    </NavLink>
  </Div>
)
