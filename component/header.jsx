import { Link, Div, Icon } from './elements.jsx'
import { Img } from './image.jsx'
import { API } from '../lib/env.js'
import { useURL } from '../lib/router.js'
import { css } from '../lib/dom.js'
import { useEffect } from 'preact/hooks'

css(`
.sidebar {
  position: sticky;
  top: 0;
  height: 100vh;
  flex: 0 0 30rem;
  background-color: #14141c;
  display: flex; }
  @media only screen and (max-width: 62em) {
    .sidebar {
      position: fixed;
      z-index: 1000;
      width: 29rem;
      flex: initial;
      left: -29rem;
      transition: all .3s ease-in-out; } }
  @media only screen and (max-width: 62em) {
    .sidebar.open {
      left: 0; } }
  .sidebar__first {
    background-color: #121219;
    height: 100%;
    flex: 0 0 6rem;
    text-align: center; }
    .sidebar__first ul {
      padding-top: 2rem; }
    .sidebar__first li {
      padding: 1rem 0;
      transition: all .1s;
      border-left: 1px solid transparent; }
      .sidebar__first li:not(:first-child):hover {
        border-left: 1px solid #b0b0bd; }
    .sidebar__first .user-photo {
      height: 4rem;
      width: 4rem;
      background-color: #b0b0bd;
      margin: 0 auto; }
      .sidebar__first .user-photo img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        border-radius: 2px; }
    .sidebar__first svg {
      fill: #61616b;
      transition: all .1s;
      cursor: pointer; }
      .sidebar__first svg:hover {
        fill: #b0b0bd; }
  .sidebar__second {
    width: 100%; }
  .sidebar .side-nav {
    margin-top: 4rem; }
    .sidebar .side-nav ul li:first-child {
      display: none; }
      @media only screen and (max-width: 62em) {
        .sidebar .side-nav ul li:first-child {
          display: block;
          margin-bottom: 2rem; } }
  .sidebar .n-item {
    display: flex;
    align-items: center;
    color: #b0b0bd;
    font-size: 1.4rem;
    padding: 1rem;
    transition: all .1s ease-in-out; }
    .sidebar .n-item:hover,.sidebar .n-item.active {
      background-color: #171721;
      color: #545dd3;
      padding-left: 1.3rem; }
    .sidebar .n-item svg {
      fill: #b0b0bd91; }

      .mac-control {
        padding: 1rem 0 0 1.5rem; }
        .mac-control li {
          display: inline-block; }
          .mac-control li:not(:last-child) {
            margin-right: .5rem; }
          .mac-control li span {
            display: block;
            height: 10px;
            width: 10px;
            border-radius: 50%; }
            .mac-control li span.--green {
              background-color: #28c941; }
            .mac-control li span.--yellow {
              background-color: #ffbd2e; }
            .mac-control li span.--red {
              background-color: #fe5650; }
`)

const parseColor = (c) =>
  `rgb(${(c >> 16) & 0xff},${(c >> 8) & 0xff},${c & 0xff})`

const LinkMatch = ({ match, children, path, ...props }) => (
  <li>
    <Link {...props}>
      <div class={`n-item${path === props.href ? ' active' : ''}`}>
        <Icon icon="ChevronRight" />
        <span>{children}</span>
      </div>
    </Link>
  </li>
)

const clearStorage = () => localStorage.clear()

// prettier-ignore
// const NavLink = (props) => <li> - <Link {...props} /></li>

// const Version = () => (
//   <Div fg="comment">#/bin/nan --hash={HASH.slice(0, 80 - 17)}</Div>
// )

const SideBarFirst = () => (
  <div class="sidebar__first">
      <ul>
          <li>
              <Link href="/profil">
                  <div class="user-photo">
                    <Img source="user.png" alt="photo de profil" />
                  </div>
              </Link>
          </li>
          <li>
              <Link href="/">
              <Icon icon="Home" />
              </Link>
          </li>
          <li>
            <Link href={`${API}/logout`} onclick={clearStorage}>
             <Icon icon="LogOut" />
            </Link>
          </li>
      </ul>
    </div>
);

const SideBarSecond = ({ children }) => (
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
)

const Nav = ({ path }) => (
  <nav class="side-nav">
    <ul>
      <li>
        <div class="n-item" id="sidebar_close_controller">
          <Icon icon="Close" />
          <span>Close</span>
        </div>
      </li>
      <LinkMatch path={path} href="/">
        Home
      </LinkMatch>
      <LinkMatch path={path} href="/challenges">
        Challenges
      </LinkMatch>
      <LinkMatch path={path} href="/timeline">
        Timeline
      </LinkMatch>
      <LinkMatch path={path} href="/profil">
        Profile
      </LinkMatch>
    </ul>
  </nav>
)

export const Header = () => {
  const { pathname: path } = useURL()

  useEffect(() => {
    const hmenu = document.getElementById('hamburgerMenu')
    const sidebar = document.getElementById('sideMenu')
    const closeSidebarController = document.getElementById(
      'sidebar_close_controller',
    )

    hmenu.addEventListener('click', () => {
      sidebar.classList.toggle('open')
    })

    closeSidebarController.addEventListener('click', () => {
      sidebar.classList.toggle('open')
    })
  }, [])

  return (
    <div class={`sidebar`} id="sideMenu">
      <SideBarFirst />
      <SideBarSecond>
        <Nav path={path} />
      </SideBarSecond>
    </div>
  )
}
