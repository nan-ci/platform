import { render, Fragment } from 'preact'
import { Router } from './lib/router.js'
import { Profile } from './page/profile.jsx'
import { Login } from './page/login.jsx'
import { Challenge } from './page/challenge.jsx'
import { Home } from './page/home.jsx'
import { TimeLine } from './page/timeline'
import { StudentList } from './page/studentlist.jsx'

const App = () => (
  <Fragment>
    <Router>
      <Profile path="/profile" />
      <StudentList path="/studentlist" />
      <Home path="*" />
      <Login path="/login" />
      <TimeLine path="/timeline" />
      <Challenge path="/challenge" />
    </Router>
  </Fragment>
)

render(h(App, {}), document.getElementById('root'))
