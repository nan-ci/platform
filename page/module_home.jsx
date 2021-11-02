import { css } from '../lib/dom'
import { Div, Span, P } from '../component/elements'
import { MTitle, MItalicWord } from '../component/markdown'
import modules from '../data/fakeModules.json'
import userData from '../data/fakeUserData.json'
import { ModuleLi } from '../component/moduleLi.jsx'

css(`
    .module_home p.describ {
        white-space: normal;
    }
`)

export const ModuleHome = () => {
  const getUserpassedExoLength = (moduleName, type) =>
    Object.entries(userData.results[moduleName]).filter(
      (f) => f[1].type === type && f[1].pass,
    ).length
  const getModueExoLength = (moduleName, type) =>
    modules[moduleName].children.filter((c) => c.type === type).length
  const getExoNumber = (name) => Number(name.split('-', 1).join(''))

  const isPassed = (moduleName) => {
    const exosLength = getModueExoLength(moduleName, 'exercise')
    const quizzesLength = getModueExoLength(moduleName, 'quiz')
    const keys = Object.keys(userData.results)
    if (getExoNumber(keys[keys.length - 1]) > getExoNumber(moduleName)) {
      return true
    }
    if (userData.results[moduleName]) {
      const userExercises = getUserpassedExoLength(moduleName, 'exercise')
      const userQuizzes = getUserpassedExoLength(moduleName, 'quiz')
      return exosLength === userExercises && quizzesLength === userQuizzes
    } else return false
  }

  const isActive = (name) => {
    const keys = Object.keys(userData.results)
    const last = keys[keys.length - 1]
    const find = keys.findIndex((n) => n === name)
    if (find === keys.length - 1 && !isPassed(name)) return true
    if (getExoNumber(name) === getExoNumber(last) + 1 && isPassed(last))
      return true
    return false
  }

  return (
    <Div class="module_home">
      <MTitle.h2> List of Modules</MTitle.h2>
      {'\n'}
      <P class="describ">
        Here, the list of modules ..., the modules are listed progressively. you
        must complete the first module before accessing the next one, the more
        you uncheck the modules, the more you will improve your skills.
      </P>
      {'\n'}
      <MItalicWord type="ps">
        PS: modules can be added at any time by the trainer, or at your request
      </MItalicWord>
      {'\n'}
      <MTitle.h3> Modules </MTitle.h3>
      {'\n'}
      <ul class="modules">
        {Object.keys(modules).map((name) => (
          <ModuleLi
            key={name}
            name={name}
            isPassed={isPassed(name)}
            isActive={isActive(name)}
            results={
              (isPassed(name) || isActive(name)) && {
                exercises: Object.entries(userData.results[name]).filter(
                  (v) => v[1].type === 'exercise' && v[1].pass,
                ).length,
                quizzes: Object.entries(userData.results[name]).filter(
                  (v) => v[1].type === 'quiz' && v[1].pass,
                ).length,
              }
            }
            exercises={
              modules[name].children.filter((c) => c.type === 'exercise').length
            }
            quizzes={
              modules[name].children.filter((c) => c.type === 'quiz').length
            }
          />
        ))}
      </ul>
    </Div>
  )
}
