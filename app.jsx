import { render } from 'preact'

import { center } from './data/ascii.js'
import { Header } from './component/header.jsx'
import { P, divider } from './component/elements.jsx'
import { Router } from './lib/router.js'
import { Profile } from './page/profile.jsx'
import { Home } from './page/home.jsx'
import { Exercise } from './page/exercise.jsx'

const App = () => (
  <>
    <Header />
    <Router>
      <Exercise path="/exercise" />
      <Profile path="/profile" />
      <Home path="*" />
    </Router>
    <footer>
      {divider}
      <P fg="comment">{center('Work in progress - NaN - Abidjan')}</P>
      {divider}
    </footer>
  </>
)

render(h(App, {}), document.getElementById('root'))
