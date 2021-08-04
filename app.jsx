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

// profs route
import { Login as LoginProf } from './page/professor/login.jsx'
import { Home as HomeProf } from './page/professor/home.jsx'
import { Modules as ModulesProf } from './page/professor/modules.jsx'
import { ModuleCours as ModuleCoursProf } from './page/professor/module_cours.jsx'
import { Quizzes as QuizzesProf } from './page/professor/quizzes.jsx'

const Redirection = (pathname) => {
  const tab = pathname.split('/')
  if (user && user.role === 'student' && !tab.includes('student'))
    return (location.href = '/student/dashboard')
  if (user && user.role === 'professor' && !tab.includes('professor'))
    return (location.href = '/professor/dashboard')
  if (user && user.role === 'admin' && !tab.includes('admin'))
    return (location.href = '/admin/dashboard')

  if (tab.includes('professor')) {
    // redirection for prof
    if (
      !user &&
      pathname !== '/professor/auth' &&
      pathname !== '/professor/dashboard'
    )
      return navigate('/professor/auth')

    if (user && pathname === '/professor/auth')
      return navigate('/professor/dashboard')
  } else if (tab.includes('admin')) {
    // redirection for admin
  } else {
    // redirection for student
    if (!user && pathname !== '/login') return navigate('/login')

    if (user && !user.discordId && pathname !== '/learningchoice')
      return navigate('/learningchoice')

    if (
      user &&
      user.discordId &&
      (pathname === '/login' || pathname === '/learningchoice')
    )
      return navigate('/student/dashboard')
  }
}

const App = () => {
  const { pathname } = useURL()

  Redirection(pathname)

  return (
    <Router>
      <Home path="/student/dashboard" />
      <Profile path="/student/profile" />
      <Login path="/login" />
      <Settings path="/student/settings" />
      <Challenges path="/student/challenges" />
      <Quizzes path="/student/quizzes" />
      <Quiz path="/student/quiz" />
      <LearningChoice path="/learningchoice" />
      <Curriculum path="/student/curriculum" />
      <Cours path="/student/cours" />

      <LoginProf path="/professor/auth" />
      <HomeProf path="/professor/dashboard" />
      <ModulesProf path="/professor/modules" />
      <ModuleCoursProf path="/professor/module-cours/:moduleName" />
      <QuizzesProf path="/professor/quizzes" />
    </Router>
  )
}

render(h(App, {}), document.getElementById('root'))
