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
import { Quizzes } from './page/quizzes.jsx'
import {Quiz} from './page/quiz.jsx';
import { user } from './lib/auth.js'
import { navigate, useURL } from './lib/router.js'

const App = () => {
  const { pathname } = useURL()
  if (!user && pathname !== '/login') return navigate('/login')
  if (user && !user.discordId && pathname !== '/learningchoice')
    return navigate('/learningchoice')
  if (
    user &&
    user.discordId &&
    (pathname === '/login' || pathname === '/learningchoice')
  )
    return navigate('/')

  return (
    <Router>
      <Profile path="/profile" />
      <Login path="/login" />
      <Settings path="/settings" />
      <Challenges path="/challenges" />
      <Quizzes path="/quizzes" />
      <Quiz path="/quiz" />
      <LearningChoice path="/learningchoice" />
      <Curriculum path="/curriculum" />
      <Cours path="/cours" />
      <Home path="*" />
    </Router>
  )
}

render(h(App, {}), document.getElementById('root'))
