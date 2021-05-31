import { render } from 'preact'
import { navigate, Router, useURL } from './lib/router.js'
import { Profile } from './page/profile.jsx'
import { Home } from './page/home.jsx'
import { StudentList } from './page/studentlist.jsx'
import { Settings } from './page/settings.jsx'
import { Login } from './page/login.jsx'
import { Challenges } from './page/challenges.jsx'
import { LearningChoice } from './page/learningchoice.jsx'
import { Curriculum } from './page/curriculum.jsx'
import { user } from './lib/auth.js'

const App = () =>  (
    <Router>
      <Profile path="/profile" />
      <Login path="/login" />
      <StudentList path="/studentlist" />
      <Settings path="/settings" />
      <Challenges path="/studentlist" />
      <LearningChoice path="/learningchoice" />
      <Curriculum path="/curriculum" />
      <Home path="*" />
    </Router>
  )


render(h(App, {}), document.getElementById('root'))
