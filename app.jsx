import { render } from 'preact'
import { Router } from './lib/router.js'
import { Profile } from './page/profile.jsx'
import { Home } from './page/home.jsx'
import { StudentList } from './page/studentlist.jsx'
import { Timeline } from './page/timeline.jsx'
import { Login } from './page/login.jsx'
import { Challenges } from './page/challenges.jsx'
import { LearningChoice } from './page/learningchoice'
import { user } from './lib/auth.js'

const App = () => (
  <Router>
    <Profile path="/profile" />
    <Login path="/login" />
    <StudentList path="/studentlist" />
    <Timeline path="/studentlist" />
    <Challenges path="/studentlist" />
    <LearningChoice path="/learningchoice" />
    <Home path="*" />
  </Router>
)

render(h(App, {}), document.getElementById('root'))
