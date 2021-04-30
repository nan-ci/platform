import { Link, Div,Image } from './elements.jsx'
import { specialities } from '../data/discord.js'
import { user } from '../lib/auth.js'
import { HASH, API } from '../lib/env.js'
import { useURL } from '../lib/router.js'
import {ChevronRight,Home,LogOut,Close} from './icons.jsx';

const parseColor = (c) =>
  `rgb(${(c >> 16) & 0xff},${(c >> 8) & 0xff},${c & 0xff})`


const LinkMatch = ({ match, children, path, ...props }) => (
  <li>
      <Link {...props}>
          <div class={`n-item${path === props.href ? " active":""}`}>
            {h(ChevronRight)}
              <span>{children}</span>
          </div>
      </Link>
  </li>
)


const clearStorage = () => localStorage.clear()

// prettier-ignore
const NavLink = (props) => <li> - <Link {...props} /></li>

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
    Object.entries(specialities).map(([key, { id, name, color }]) => (
      <NavLink
        key={key}
        href={`${API}/link/discord?speciality=${key}`}
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

const SideBarFirst = () => (
  <div class="sidebar__first">
      <ul>
          <li>
              <Link href="/profil">
                  <div class="user-photo">
                    <Image image="user.png" alt="photo de profil" />
                  </div>
              </Link>
          </li>
          <li>
              <Link href="/">
              {h(Home)}
              </Link>
          </li>
          <li>
            <Link href={`${API}/logout`}>
               {h(LogOut)}
            </Link>
          </li>
      </ul>
    </div>
);

const SideBarSecond = ({children}) => (
  <div class="sidebar__second">
        <ul class="mac-control">
            <li>
                <span class="--red"></span>
            </li>
            <li>
                <span class="--yellow"></span>
            </li>
            <li>
                <span class="--green"></span>
            </li>
        </ul>
       {children}
      </div>
  );

const Nav = ({ path }) => (
  <nav class="side-nav">
  <ul>
      <li>
          <div class="n-item" id="sidebar_close_controller">
              {h(Close)}
              <span>Fermer</span>
          </div>
      </li>
      <LinkMatch path={path} href="/">Tableau de bord</LinkMatch>
      <LinkMatch path={path} href="/evaluations">Evaluations et Quizz</LinkMatch>
      <LinkMatch path={path} href="/results">Mes Résultats</LinkMatch>
      <LinkMatch path={path} href="/profil">Mon Profil</LinkMatch>
  </ul>
</nav>
)

export const Header = () => {
  const { pathname: path } = useURL()
  return (
    <div class="sidebar" id="sideMenu">
      <SideBarFirst/>
      <SideBarSecond>
        <Nav path={path} />
      </SideBarSecond>
    </div>
  )
}
