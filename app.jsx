import { render } from 'preact'
import { Router } from './lib/router.js'
import { Profile } from './page/student/profile.jsx'
import { Home } from './page/student/home.jsx'
import { Settings } from './page/student/settings.jsx'
import { Login } from './page/login.jsx'
import { LearningChoice } from './page/learningchoice.jsx'
import { Challenges } from './page/student/challenges.jsx'
import { Curriculum } from './page/student/curriculum.jsx'
import { Cours } from './page/student/cours.jsx'
import { Quizzes } from './page/student/quizzes.jsx'
import { Projects } from './page/student/projects.jsx'
import { Quiz } from './page/student/quiz.jsx'
import { user } from './lib/auth.js'
import { navigate, useURL } from './lib/router.js'

// profs route

import { Home as HomeProf } from './page/professor/home.jsx'
import { Modules as ModulesProf } from './page/professor/modules.jsx'
import { Module as ModuleProf } from './page/professor/module.jsx'
import { Quizzes as QuizzesProf } from './page/professor/quizzes.jsx'
import { students as StudentsProf } from './page/professor/students.jsx'
import { Profile as ProfileProf } from './page/professor/profile.jsx'
import { Settings as SettingsProf } from './page/professor/settings.jsx'

const Redirection = (pathname) => {
  const tab = pathname.split('/')

  if (
    (!user || (user && (!user.discordId || !user.speciality))) &&
    pathname !== '/login' &&
    pathname !== '/learningchoice'
  )
    return navigate('/login')

  if (user && user.discordId && pathname === '/login') {
    if (user.role === 'professor') return navigate('/professor/dashboard')
    if (user.role === 'admin') return navigate('/admin/dashboard')
    if (user.role === 'visitor' || user.role === 'student') {
      console.log('user', user)
      return !user.speciality
        ? navigate('/learningchoice')
        : navigate('/student/dashboard')
    }
  }

  if (user && user.role === 'student' && !tab.includes('student'))
    return (location.href = '/student/dashboard')
  if (user && user.role === 'professor' && !tab.includes('professor'))
    return (location.href = '/professor/dashboard')
  if (user && user.role === 'admin' && !tab.includes('admin'))
    return (location.href = '/admin/dashboard')
}

const App = () => {
  const { pathname } = useURL()

  Redirection(pathname)

  return (
    <Router>
      <Login path="/login" />
      <LearningChoice path="/learningchoice" />

      {/**student route */}
      <Home path="/student/dashboard" />
      <Profile path="/student/profile" />
      <Settings path="/student/settings" />
      <Challenges path="/student/challenges" />
      <Quizzes path="/student/quizzes" />
      <Quiz path="/student/quiz" />
      <Curriculum path="/student/curriculum" />
      <Cours path="/student/cours" />
      <Projects path="/student/projects" />

      {/** professor routes */}
      <HomeProf path="/professor/dashboard" />
      <ModulesProf path="/professor/modules" />
      <ModuleProf path="/professor/module-cours/:moduleId" />
      <QuizzesProf path="/professor/quizzes" />
      <StudentsProf path="/professor/students" />
      <ProfileProf path="/professor/profile" />
      <SettingsProf path="/professor/settings" />
    </Router>
  )
}

render(h(App, {}), document.getElementById('root'))
