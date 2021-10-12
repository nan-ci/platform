import { css } from '../lib/dom.js'
import { useState } from 'preact/hooks'
import { Div, P, Span, Main } from '../component/elements.jsx'
import { StackLi } from '../component/ModuleStackLi.jsx'
import fakeModule from '../data/fakeModule.json'
import fakeUserData from '../data/fakeUserData.json'

css(`
    .module {
       width: 100%;
       height: auto;
    }

    .module>h1 {
      font-size: 2rem;
    }

    .module>hr{
      width:100%;
      height:2px;
      background: grey;
      margin-top:10px;
    }

    .module>h3 {
        font-size: 2.5rem;
        margin-bottom:20px;
    }

    .module p.description {
      font-size: 1.2rem;
      color: darkgrey;
      margin-top: 16px;
      white-space: normal !important;
      padding: 0.9rem;
      background: #1e2029;
      border-radius: 0.3rem;
      overflow-x:hidden;
     max-height:120px;
    }

    .module div.notions {
       margin-top: 5px;
       padding: 0.6rem;
    }

    .module div.notions span {
        font-size: 1.4rem;
        font-weight: bolder;
    }

    .module div.notions ul {
       list-style-type: circle !important;
       margin-top: 7px;
       margin-left: 15px;
    }

    .module div.notions ul li {
       display: block !important;
       font-size: 1rem;
       margin: 7px auto;
       font-weight: bolder;
       font-size: 1.2rem;
    }

    .module div.notions ul li:before {
         content: '👉';
         display: inline-block;
         margin-top:2px;
         margin-right: 10px;
         font-size: 1.2rem;
    }

  .module .content {
    width: 100%;
    height: 430px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    overflow-x:hidden;
  }



`)

export const Module = () => {
  const Stack = [
    ...fakeModule.exercises.map((e) => {
      return { type: 'exercise', name: e }
    }),
    ...fakeModule.quizzes.map((q) => {
      return { type: 'quiz', name: q }
    }),
  ].sort(
    (a, b) => parseInt(a.name.split('-')[0]) - parseInt(b.name.split('-')[0]),
  )

  const checkIfIsPassed = ({ type, name }, check = 'pass') => {
    const exerciseIndice = parseInt(name.split('-')[0])
    const moduleIndice = parseInt(fakeModule.name.split('-')[0])
    const data = fakeUserData[type === 'exercise' ? 'exercises' : 'quizzes']
    const isPassed = data[name] && data[name].pass
    let [userModuleStep, userLevelStep] = fakeUserData.level.split('-')
    userLevelStep = parseInt(userLevelStep.slice(1))
    userModuleStep = parseInt(userModuleStep.slice(1))
    if (userModuleStep > moduleIndice) return true
    else if (userModuleStep === moduleIndice && userLevelStep > exerciseIndice)
      return true
    else if (
      userModuleStep === moduleIndice &&
      userLevelStep === exerciseIndice &&
      ((check === 'pass' && isPassed) || check === 'info')
    ) {
      return true
    } else return false
  }

  const getUserProgress = ({ type, name }) => {
    if (type === 'exercise') return fakeUserData.exercises[name]
    else if (type === 'quiz') return fakeUserData.quizzes[name]
  }

  const isNext = ({ type, name }, { type: pastType, name: pastName }) => {
    const last =
      type === 'exercise'
        ? fakeUserData.exercises[name]
        : fakeUserData.quizzes[name]

    let keys = Object.keys(
      fakeUserData[pastType === 'exercise' ? 'exercises' : 'quizzes'],
    )

    const past =
      keys.findIndex((key) => key === pastName) === keys.length - 1 &&
      fakeUserData[pastType === 'exercise' ? 'exercises' : 'quizzes'][pastName]
        .pass

    if ((last && !last.pass) || (!last && past)) {
      return true
    } else return false
  }

  return (
    <Main>
      <section class="module">
        <h1>&#x1F506; {fakeModule.name}</h1>
        <hr />
        <P class="description">{fakeModule.description}</P>
        <Div class="notions">
          <Span>In this module you will learn :</Span>
          <ul>
            {fakeModule.notions.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </Div>
        <h3> Exercises </h3>
        <Div class="content">
          {Stack.map((info, ind) => (
            <StackLi
              key={info.name}
              dataType={info.type}
              name={info.name}
              isNext={ind > 0 && isNext(info, Stack[ind - 1])}
              isPassed={checkIfIsPassed(info)}
              info={
                checkIfIsPassed(info, 'info') ? getUserProgress(info) : null
              }
            />
          ))}
        </Div>
      </section>
    </Main>
  )
}
