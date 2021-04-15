import { FatLink } from './elements.jsx'
import { roles } from '../data/discord.js'
import Registration_form from './registration_form'

const parseColor = (c) =>
  `rgb(${(c >> 16) & 0xff},${(c >> 8) & 0xff},${c & 0xff})`

const LinkMatch = ({ match, children, ...props }) => (
  <li>{match ? children : <a {...props}>{children}</a>}</li>
)

const LogOut = () => {
  const onclick = () => localStorage.clear()
  return (
    <a href="/api/logout" onclick={onclick}>
      Logout
    </a>
  )
}

export const Header = ({ user, page }) => (
  <header>
    <nav>
      <ul>
        <li>Logo</li>
        <LinkMatch href="/" match={page === 'home'}>
          Home
        </LinkMatch>
        <LinkMatch href="/doc" match={page === 'doc'}>
          Documentation
        </LinkMatch>
      </ul>
      <ul>
        <li>{user && <LogOut />}</li>
      </ul>
    </nav>
    <h1>
      <code>NaN</code> Platform
    </h1>
    <p>
      Page Subheading with <mark>highlighting</mark>
    </p>
    <br />
    <p>
      {!user ? (
        <FatLink href="/api/link/github" icon="Github">
          Join with Github
        </FatLink>
      ) : (
        <>
          {user.discordId ? (
            <b>
              Welcome{' '}
              <span style={{ color: parseColor(roles[user.speciality].color) }}>
                {user.name}
              </span>
              <Registration_form />
            </b>
          ) : (
            <>
              <b>Welcome {user.name}</b>
              {Object.entries(roles).map(([key, { id, name, color }]) => (
                <FatLink
                  key={key}
                  href={`/api/link/discord?speciality=${key}`}
                  icon="Discord"
                  color={parseColor(color)}
                >
                  {name}
                </FatLink>
              ))}
            </>
          )}
        </>
      )}
    </p>
  </header>
)
