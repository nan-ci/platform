import { render } from 'preact'

import { center } from './data/ascii.js'
import { Header } from './component/header.jsx'
import { P, divider } from './component/elements.jsx'
import { Router } from './lib/router.js'
import { Profile } from './page/profile.jsx'
import { Home } from './page/home.jsx'
import { Notion } from './page/notion.jsx'

const App = () => (
  <>
    <Header />
    <Router>
      <Profile path="/profile" />
      <Notion path="/notion" />
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
