import { render } from 'preact'

import { center } from './data/ascii.js'
import { Header } from './component/header.jsx'
import { P, divider } from './component/elements.jsx'
import { Router } from './lib/router.js'
import { Profile } from './page/profile.jsx'
import { Home } from './page/home.jsx'
import { Skills } from './page/skills.jsx'
import { StudentList } from './page/studentlist'

const App = () => (
  <>
    <Header />
    <Router>
      <Profile path="/profile" />
      <StudentList path="/studentlist" />
      <Skills path="/skills" />
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
