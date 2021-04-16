import { Link, Div, Color, Title } from './elements.jsx'
import { roles } from '../data/discord.js'
import { user } from '../lib/auth.js'
import { HASH } from '../lib/env.js'

const parseColor = (c) =>
  `rgb(${(c >> 16) & 0xff},${(c >> 8) & 0xff},${c & 0xff})`

const LinkMatch = ({ match, children, ...props }) => (
  <li>
    {match ? (
      <Color.Green>{children}</Color.Green>
    ) : (
      <a {...props}>{children}</a>
    )}
  </li>
)

const clearStorage = () => localStorage.clear()

// prettier-ignore
const NavLink = (props) => <li> - <Link {...props} /></li>
const LogAction = () => {
  if (!user) {
    return (
      <NavLink href="/api/link/github" icon="Github">
        Join with Github
      </NavLink>
    )
  }

  return user.discordId ? (
    <NavLink href="/api/logout" onclick={clearStorage}>
      Logout
    </NavLink>
  ) : (
    Object.entries(roles).map(([key, { id, name, color }]) => (
      <NavLink
        key={key}
        href={`/api/link/discord?speciality=${key}`}
        icon="Discord"
        style={{ color: parseColor(color) }}
      >
        {name}
      </NavLink>
    ))
  )
}

const Version = () => (
  <Div fg="comment">#/bin/nan --hash={HASH.slice(0, 80 - 17)}</Div>
)

const Nav = () => (
  <nav>
    <Version />
    {'\n'}
    <Title>Menu</Title>
    {'\n'}
    <ul style={{ width: '100%' }}>
      {'  '}
      <LinkMatch href="/" match>
        Home
      </LinkMatch>
      {' - '}
      <LinkMatch href="/doc">Documentation</LinkMatch>
      <LogAction />
    </ul>
    {'\n'}
  </nav>
)

export const Header = ({ user, page, title, children }) => (
  <header>
    <Nav />
    {'\n'}
    <Title>Title</Title>
    {'\n'}
    <h1>{`  ${title}`} </h1>
    {'\n'}
    {children}
  </header>
)
