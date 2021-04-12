import { FatLink } from './elements.jsx'

const LinkMatch = ({ match, children, ...props }) => (
  <li>{match ? children : <a {...props}>{children}</a>}</li>
)

export const Header = ({ user, page }) => (
  <header>
    <nav>
      <ul>
        <li>Logo</li>
        <LinkMatch href='/' match={page === 'home'}>
          Home
        </LinkMatch>
        <LinkMatch href='/doc' match={page === 'doc'}>
          Documentation
        </LinkMatch>
      </ul>
      <ul>
        <li>
          <a href="#">Github</a>
        </li>
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
          <b>Welcome {user.name}</b>
          {user.discordId ? null : (
            <FatLink href="/api/link/discord" icon="Discord">
              link your Discord account
            </FatLink>
          )}
        </>
      )}
    </p>
  </header>
)
