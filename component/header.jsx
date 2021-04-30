import { Link, Div, Color, Title } from './elements.jsx'
import { roles } from '../data/discord.js'
import { Skills } from '../page/skills.jsx'
import { user } from '../lib/auth.js'
import { HASH, API } from '../lib/env.js'
import { useURL } from '../lib/router.js'

export const parseColor = (c) =>
  `rgb(${(c >> 16) & 0xff},${(c >> 8) & 0xff},${c & 0xff})`

const LinkMatch = ({ match, children, path, ...props }) => (
  <li>
    {path === props.href ? (
      <Color.Green>{children}</Color.Green>
    ) : (
      <Link {...props}>{children}</Link>
    )}
  </li>
)

const clearStorage = () => localStorage.clear()

// prettier-ignore
export const NavLink = (props) => <li> <Link {...props} /></li>
const LogAction = () => {
  if (!user) {
    return (
      <NavLink href={`${API}/link/github`} icon="Github">
        Join with Github
      </NavLink>
    )
  }

  return user.discordId ? (
    <NavLink href={`${API}/logout`} onclick={clearStorage}>
      Logout
    </NavLink>
  ) : (
    <Skills
      roles={roles}
      title="Which programming language do you want to learn ? 📚"
    />
  )
}

const Version = () => (
  <Div fg="comment">#/bin/nan --hash={HASH.slice(0, 80 - 17)}</Div>
)

const Nav = ({ path }) => (
  <nav>
    <Version />
    {'\n'}
    <Title>Menu</Title>
    {'\n'}
    <ul style={{ width: '100%' }}>
      {'  '}
      <LinkMatch path={path} href="/">
        Home
      </LinkMatch>
      {' - '}
      <LinkMatch path={path} href="/profile">
        Profile
      </LinkMatch>
      {' - '}
      <LinkMatch path={path} href="/studentlist">
        Student list
      </LinkMatch>

      <LogAction />
    </ul>
    {'\n'}
  </nav>
)

export const Header = ({ page, title, children }) => {
  const { pathname: path } = useURL()
  return (
    <header>
      <Nav path={path} />
      {'\n'}
      <Title>Page</Title>
      {'\n'}
      <h1>{`  ${path}`} </h1>
      {'\n'}
      {children}
    </header>
  )
}