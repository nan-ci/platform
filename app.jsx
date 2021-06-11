import { render } from 'preact'
import { Router } from './lib/router.js'
import { Profile } from './page/profile.jsx'
import { Home } from './page/home.jsx'
import { Settings } from './page/settings.jsx'
import { Login } from './page/login.jsx'
import { Challenges } from './page/challenges.jsx'
import { LearningChoice } from './page/learningchoice.jsx'
import { Curriculum } from './page/curriculum.jsx'
import { Cours } from './page/cours.jsx'

const App = () => (
  <Router>
    <Profile path="/profile" />
    <Login path="/login" />
    <Settings path="/settings" />
    <Challenges path="/challenges" />
    <LearningChoice path="/learningchoice" />
    <Curriculum path="/curriculum" />
    <Cours path="/cours" />
    <Home path="*" />
  </Router>
)

render(h(App, {}), document.getElementById('root'))
