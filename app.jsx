import { render } from 'preact'
import { Router } from './lib/router.js'
import { Profile } from './page/profile.jsx'
import { Home } from './page/home.jsx'
import { StudentList } from './page/studentlist.jsx'
import { Timeline } from './page/timeline.jsx'
import { Challenges } from './page/challenges.jsx'

const App = () => (
  <Router>
    <Profile path="/profile" />
    <StudentList path="/studentlist" />
    <Timeline path="/studentlist" />
    <Challenges path="/studentlist" />
    <Home path="*" />
  </Router>
)

render(h(App, {}), document.getElementById('root'))
