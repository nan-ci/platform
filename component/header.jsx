import { Link, Div, Color } from './elements.jsx'
import { roles } from '../data/discord.js'


const parseColor = (c) =>
  `rgb(${(c >> 16) & 0xff},${(c >> 8) & 0xff},${c & 0xff})`

const LinkMatch = ({ match, children, ...props }) => (
  <li>{match ? <Color.green>{children}</Color.green> : <a {...props}>{children}</a>}</li>
)

const clearStorage = () => localStorage.clear()

const LogAction = () => {
  if (!user) {
    return (
      <li>
      {' - '}
        <Link href="/api/link/github" icon="Github">
          Join with Github
        </Link>
      </li>
    )
  }

  return user.discordId ? (
    <li>
      {' - '}
      <a href="/api/logout" onclick={clearStorage}>
        Logout
      </a>
    </li>
  ) : (
    Object.entries(roles).map(([key, { id, name, color }]) => (
      <li>
        {' - '}
        <Link
          key={key}
          href={`/api/link/discord?speciality=${key}`}
          icon="Discord"
          style={{color:parseColor(color)}}
        >
          {name}
        </Link>
      </li>
    ))
  )
}

const Version = () => <Div fg="comment">#/bin/nan --hash={HASH.repeat(2).slice(0, 79-17)}</Div>
const Nav = () => (
  <nav>
    <Version />
    {'\n'}
    <Color.purple>Menu:</Color.purple>
    <ul style={{width: '100%'}}>
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
    <Color.purple>Title:</Color.purple>
    <h1>{`  ${title}`} </h1>
    {'\n'}
    {children}
  </header>
)
