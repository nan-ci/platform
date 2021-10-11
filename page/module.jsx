import { css } from '../lib/dom.js'
import { useState } from 'preact/hooks'
import { Div, P, Span, Main } from '../component/elements.jsx'
import { ExerciseCard } from '../component/exerciseCard.jsx'
import { QuizCard } from '../component/quizCard.jsx'

css(`
    ._module {
       width:100%;
       height: auto;
    }

    ._module>h1 {
      font-size: 2.5rem;
    }

    ._module p.description {
      font-size: 1.2rem;
      color:darkgrey;
      margin-top: 2px;
      white-space: normal !important;
      padding: 0.9rem;
      background: #1e2029;
      border-radius: 0.3rem;
    }

    ._module div.notions {
       margin-top:5px;
       padding: 0.6rem;
    }

    ._module div.notions span {
        font-size: 1.4rem;
        font-weight:bolder;
    }

    ._module div.notions ul {
       list-style-type: circle !important;
       margin-top: 7px;
       margin-left: 15px;
    }

    ._module div.notions ul li {
       display:block !important;
       font-size: 1remimport { ExerciseCard } from '../component/exerciseCard';
;
       margin: 7px auto;
       font-weight:bolder;
       font-size:1.2rem;
    }

    ._module div.notions ul li:before {
         content:'';
         display:inline-block;
         width:15px;
         height:15px;
         border-radius: 2.3em 0rem 2.3rem 0rem;
         background:white;
    }

    ._module div.big-content {
      width: 100%;
      margin-top: 25px;
    }

    ._module .big-content header {
      width:100%;
      display:flex;
      flex-direction: row;
      align-items:center;
      justify-content: space-between;
    }

    ._module .big-content header h1 {
       font-size: 2.3rem;
       margin-top: -5px;
    }

    ._module .big-content header .names {
       display:flex;
       flex-direction: row;
       align-items:center;
       justify-content: space-between;
       border-radius: 0.5rem;
       border:1px solid white;
       overflow:hidden;
    }

  ._module .names button {
    padding:0.5rem;
    cursor:pointer;
    border-right:1px solid white;
  }

  ._module .names button.active {
    background: #606060;
  }

  ._module .tab-content {
    width:100%;
    height: 410px;
    overflow-x:hidden;
    overflow: hidden;
    margin-top: 20px;
    display:flex;
    flex-direction: column;
    align-items:flex-start;
    justify-content:flex-start;
    position:relative;
  }
  ._module .tab-content .tab {
    position:absolute;
    width: 100%;
    height: 100%;
    transition: all 0.4s ease-in-out;
  }

  ._module .tab-content .tab .exercises {
    width:100%;
    height:100%;
    overflow-x:hidden;
  }

  ._module .tab-content .tab .quizzes {
    width:100%;
    height:100%;
    overflow-x:hidden;
  }

`)

export const Module = () => {
  const [active, setActive] = useState('Exercises')

  const exercises = [
    'Hello Here',
    'Anything To Declare ?',
    'An Undefined Future',
    'The Great Escape',
    'A String Of Number',
    'Redeclaration Of Love',
    'Smooth Operator',
    'Placeholders',
    'Duplicate',
  ]

  const quizzes = {
    'Look for the intruders ?': {
      beginDate: '',
      endDate: '',
      perceontOfValidation: '',
    },
    'In DOM world ?': { beginDate: '', endDate: '', perceontOfValidation: '' },
    'What is variable ?': {
      beginDate: '',
      endDate: '',
      perceontOfValidation: '',
    },
    'Are you an Object ?': {
      beginDate: '',
      endDate: '',
      perceontOfValidation: '',
    },
  }

  const fakeUserExercisesData = {
    'Hello Here': { seconds: 90, attempts: 5 },
    'Anything To Declare ?': { seconds: 30, attempts: 17 },
    'An Undefined Future': { attempts: 5 },
  }

  const fakeUserQuizzesData = {
    'Look for the intruders ?': { endTime: '', percent: '60%' },
  }

  return (
    <Main>
      <section class="_module">
        <h1> JS-Intro </h1>
        <P class="description">
          {' '}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate
        </P>
        <Div class="notions">
          <Span>in this module you will learn :</Span>
          <ul>
            <li> variables </li>
            <li> conditions </li>
            <li> iteraction </li>
            <li> data type</li>
          </ul>
        </Div>
        <Div class="big-content">
          <header>
            <h1> {active} </h1>
            <Div class="names">
              <button
                class={active === 'Exercises' ? 'active' : ''}
                onClick={() => setActive('Exercises')}
              >
                {' '}
                Exercises{' '}
              </button>
              <button
                class={active === 'Quizzes' ? 'active' : ''}
                onClick={() => setActive('Quizzes')}
              >
                {' '}
                Quizzes{' '}
              </button>
            </Div>
          </header>
          <Div class="tab-content">
            <Div
              class="tab"
              style={{
                transform: `scale(${active === 'Exercises' ? '1' : '0'})`,
              }}
            >
              <Div class="exercises">
                {exercises.map((exo, ind) => (
                  <ExerciseCard
                    key={exo}
                    prev={exercises[ind - 1]}
                    exo={exo}
                    data={fakeUserExercisesData}
                  />
                ))}
              </Div>
            </Div>
            <Div
              class="tab"
              style={{
                transform: `scale(${active === 'Quizzes' ? '1' : '0'})`,
              }}
            >
              <Div class="quizzes">
                {Object.keys(quizzes).map((name, ind) => (
                  <QuizCard
                    key={name}
                    prev={Object.keys(quizzes)[ind - 1]}
                    name={name}
                    {...quizzes[name]}
                    data={fakeUserQuizzesData}
                  />
                ))}
              </Div>
            </Div>
          </Div>
        </Div>
      </section>
    </Main>
  )
}
