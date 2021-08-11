import { Link, Div, Color, divider, P } from './elements.jsx'
import { user } from '../lib/auth.js'
import { HASH, API } from '../lib/env.js'
import { useURL } from '../lib/router.js'
import { useState } from 'preact/hooks'
import { css } from '../lib/dom.js'

css(`
    .usercard-contain {
      width: 180px;
      text-align: center;
      position: relative;
      margin-top: -7px;
    }
    .header-div{
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: space-between;
    }
    .sub-menu{
      position: absolute;
      top: 95%;
      z-index:2;
      height: auto;
      border: 1px dashed var(--white-lighter);
      padding: 0.5rem;
      width: 100%;
      margin-top: 10px;
      text-align: left;
      background: var(--white-lighter);
    }
    .us-link {
      border: 2px dashed var(--white-lighter);
      padding: 0.5rem;
      width: 100%;
      cursor: pointer;
    }
`)

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

const clearStorage = () => {
  localStorage.clear()
  sessionStorage.clear()
}

// prettier-ignore
export const NavLink = (props) => <li> <Link {...props} /></li>

const Version = () => (
  <Div fg="comment">#/bin/nan --hash={HASH.slice(0, 80 - 17)}</Div>
)

const Nav = ({ path }) => (
  <nav>
    {/* links student */}

    {user.role !== 'professor' && user.role !== 'admin' && (
      <ul style={{ width: '100%' }}>
        {'  '}
        <LinkMatch path={path} href="/student/dashboard">
          Home
        </LinkMatch>
        {' - '}
        <LinkMatch path={path} href="/student/curriculum">
          Curriculum
        </LinkMatch>
        {user && user.role === 'student' && (
          <>
            {' - '}
            <LinkMatch path={path} href="/student/challenges">
              Challenges
            </LinkMatch>
            {' - '}
            <LinkMatch path={path} href="/student/quizzes">
              Quizzes
            </LinkMatch>
            {' - '}
            <LinkMatch path={path} href="/student/projects">
              Projects
            </LinkMatch>
          </>
        )}
      </ul>
    )}

    {/* links professor */}

    {user.role === 'professor' && (
      <ul style={{ width: '100%' }}>
        {'  '}
        <LinkMatch path={path} href="/professor/dashboard">
          Home
        </LinkMatch>
        {' - '}
        <LinkMatch path={path} href="/professor/modules">
          modules
        </LinkMatch>
        {' - '}
        <LinkMatch path={path} href="/professor/quizzes">
          Quizzes
        </LinkMatch>
        {' - '}
        <LinkMatch path={path} href="/professor/students">
          students
        </LinkMatch>
      </ul>
    )}

    {'\n'}
  </nav>
)

const UserCard = ({ user: { username, name }, path }) => {
  const Links = [
    {
      name: 'Profile',
      path:
        user.role === 'student'
          ? '/student/profile'
          : user.role === 'professor'
          ? '/professor/profile'
          : '/admin/profile',
    },
    {
      name: 'Settings',
      path:
        user.role === 'student'
          ? '/student/settings'
          : user.role === 'professor'
          ? '/professor/settings'
          : '/admin/settings',
    },
    { name: 'Logout', path: `${API}/logout` },
  ]
  const [openSubMenu, setOpenSubMenu] = useState(false)

  return (
    <Div class="usercard-contain">
      <P onClick={() => setOpenSubMenu((v) => !v)} class="us-link">
        {username ?? name} ▿
      </P>

      <Div
        class="sub-menu"
        style={{
          display: openSubMenu ? 'block' : 'none',
        }}
      >
        {Links.map((data) => {
          return (
            <>
              <LinkMatch
                path={path}
                href={data.path}
                key={data.name}
                style={{ marginTop: '10px', color: ' black' }}
                onClick={data.name === 'Logout' && clearStorage}
              >
                {data.name}
              </LinkMatch>
              <br />
            </>
          )
        })}
      </Div>
    </Div>
  )
}

export const Header = ({ page, title, children }) => {
  const { pathname: path } = useURL()
  return (
    <header>
      <Version />
      {'\n'}
      <Div class="header-div">
        <Nav path={path} />
        <UserCard user={user} path={path} />
      </Div>
      {divider}
    </header>
  )
}
