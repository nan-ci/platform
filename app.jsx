import { render } from 'preact'
import { Router } from './lib/router.js'
import { Profile } from './page/student/profile.jsx'
import { Home } from './page/student/home.jsx'
import { Settings } from './page/student/settings.jsx'
import { Login } from './page/student/login.jsx'
import { Challenges } from './page/student/challenges.jsx'
import { LearningChoice } from './page/student/learningchoice.jsx'
import { Curriculum } from './page/student/curriculum.jsx'
import { Cours } from './page/student/cours.jsx'
import { Quizzes } from './page/student/quizzes.jsx'
import { Quiz } from './page/student/quiz.jsx'
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
    return navigate('/student/dashboard')

  return (
    <Router>
      <Profile path="/student/profile" />
      <Login path="/login" />
      <Settings path="/student/settings" />
      <Challenges path="/student/challenges" />
      <Quizzes path="/student/quizzes" />
      <Quiz path="/student/quiz" />
      <LearningChoice path="/learningchoice" />
      <Curriculum path="/student/curriculum" />
      <Cours path="/student/cours" />
      <Home path="/student/dashboard" />
    </Router>
  )
}

render(h(App, {}), document.getElementById('root'))
