import { render } from 'preact'

import { center } from './data/ascii.js'
import { Header } from './component/header.jsx'
import { P, divider } from './component/elements.jsx'
import { Router } from './lib/router.js'
import { Profile } from './page/profile.jsx'
import { Home } from './page/home.jsx'
import { SideBar } from './component/sideBar';




const App = () => (
  <>
    <SideBar />
      <Router>
          <Profile path="/profil" />
          <Home path="*" />
      </Router>
  </>
)

render(h(App, {}), document.getElementById('root'))
