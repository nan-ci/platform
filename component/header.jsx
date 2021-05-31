import { Link, Div, Color, Title, divider } from './elements.jsx'
import { user } from '../lib/auth.js'
import { HASH, API } from '../lib/env.js'
import { navigate, useURL } from '../lib/router.js'

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
  return (
    user.discordId && (
      <NavLink href={`${API}/logout`} onclick={clearStorage}>
        Logout
      </NavLink>
    )
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
      <LogAction />
    </ul>
    {'\n'}
  </nav>
)

export const Header = ({ page, title, children }) => {
  const { pathname: path } = useURL()
  if (!user) return navigate('/login')
  if (!user.discordId) return navigate('/learningchoice')
  return (
    <header>
      <Nav path={path} />
      {'\n'}
      <Title>Page</Title>
      {'\n'}
      <h1>{`  ${path}`} </h1>
      {'\n'}
      {children}
      {divider}
    </header>
  )
}
