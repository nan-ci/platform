import { render, Fragment } from 'preact'
import { Router } from './lib/router.js'
import { Profile } from './page/profile.jsx'
import { Home } from './page/home.jsx'
import { StudentList } from './page/studentlist.jsx'

const App = () => (
  <Fragment>
    <Router>
      <Profile path="/profile" />
      <StudentList path="/studentlist" />
      <Home path="*" />
    </Router>
  </Fragment>
)

render(h(App, {}), document.getElementById('root'))
