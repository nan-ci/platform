import { useState, useEffect } from 'preact/hooks'
import { Div, P } from '../component/elements.jsx'
import { Layout } from '../component/layout.jsx'
import { QuizCard } from '../component/quiz-card.jsx'
import { courses } from '../data/courses.js'
import { user } from '../lib/auth.js'
import { css } from '../lib/dom.js'
import { navigate } from '../lib/router.js'
import { API } from '../lib/env.js'
import { EndDate } from '../lib/quiz.js'
import moment from 'moment'

css(`
      .quizz-modal {
        position:absolute;
        top: 20%;
        left:50%;
        right:50%;
        width:350px;
        padding: 1.4rem;
        background: black;
        border:2px solid var(--comment-darker);
        transition:all 0.5s ease-in-out;
      }

      .quizz-modal .button-group {
           display:flex;
           flex-direction:row;
           align-items:center;
           justify-content:center;
           margin-top: 20px;
      }
      .quizz-modal .body .quiz-duration,  .quizz-modal .body .quiz-duration strong{
        text-align:center;
        font-size:1.1rem;
      }

      .quizz-modal .button-group .go {
        background:var(--comment-darker);
        color:white;
        font-weight:bolder;
        padding:0.4rem;
        cursor:pointer;
        margin: 5px;
        border:none;
      }

      .quizz-modal .button-group .cancel {
        background:var(--red-darker);
        color:white;
        font-weight:bolder;
        padding:0.4rem;
        cursor:pointer;
        margin: 5px;
        border:none;
      }
`)

const FinishedQuizInfos = ({ questions, name }) => {
  const responses = user.quizzes[name].responses
  let point = 0
  const ges = (v) => {
    let output = []
    for (let key in v) {
      v[key] && output.push(key)
    }
    return output
  }

  const d = () => {
    for (let key in responses) {
      if (
        (Array.isArray(responses[key]) && responses[key] === ges[key]) ||
        questions[key][responses[key]]
      ) {
        point += 1
      }
    }
  }

  d()

  return (
    <>
      <h1>Finished</h1>
    </>
  )
}

const QuizInfos = ({ currentQuiz }) => (
  <>
    <P>
      Are you sure you want to take the quiz{' '}
      <strong style={{ color: 'var(--green-darker)' }}>
        {currentQuiz && currentQuiz.name}
      </strong>{' '}
      now ?{' '}
    </P>
    <br />
    <P>
      <strong style={{ color: 'red' }}> NB : </strong> once the stopwatch has
      started, you won't be able to go back
    </P>
    <br />
    <P class="quiz-duration">
      <strong> Quiz duration : </strong> {currentQuiz && currentQuiz.duration}{' '}
      min
    </P>
    <P class="quiz-duration">
      <strong> Percent of validation : </strong>{' '}
      {currentQuiz && currentQuiz.percentOfValidation} %
    </P>
  </>
)

export const Quizzes = () => {
  const [currentQuiz, setCurrentQuiz] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [myQuizzes, setMyQuizzes] = useState(undefined)

  const quizzes = courses.find((c) => c.name === user.speciality).quizzes

  const selectQuiz = (quiz) => {
    setCurrentQuiz({ ...quiz })
    setShowModal(true)
  }

  useEffect(async () => {
    const resp = await (await fetch(`${API}/user/quizzes`)).json()
    if (resp.data) {
      setMyQuizzes(resp.data)
    }
  }, [])

  const initQuiz = async ({ name, duration }) => {
    const fetching = await fetch(`${API}/user/quiz`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        responses: {},
        percent: 0,
        end_date: EndDate(duration),
        submit: false,
      }),
    })

    const resp = await fetching.json()
    if (resp.status) {
      localStorage.setItem('quiz', JSON.stringify({ ...resp.data }))
      navigate('/quiz?name=' + resp.data.name)
    }
  }

  return (
    <Layout>
      <Div>
        {myQuizzes !== undefined &&
          quizzes.map((quiz) => (
            <QuizCard
              {...quiz}
              selectQuiz={(quiz) => selectQuiz(quiz)}
              quizzes={myQuizzes}
            />
          ))}
        {!myQuizzes && <h1>Loading ....</h1>}
      </Div>
      <Div
        class="quizz-modal"
        style={{
          transform: `translate(-50%,-50%) ${
            showModal ? 'scale(1)' : 'scale(0)'
          }`,
        }}
      >
        <Div class="body">
          {currentQuiz &&
            user.quizzes &&
            user.quizzes[currentQuiz.name] &&
            (user.quizzes[currentQuiz.name].submit ||
              moment().isAfter(user.quizzes[currentQuiz.name].end)) && (
              <FinishedQuizInfos
                name={currentQuiz.name}
                questions={currentQuiz.questions}
              />
            )}

          {currentQuiz &&
            (!user.quizzes ||
              (user.quizzes && !user.quizzes[currentQuiz.name])) && (
              <QuizInfos currentQuiz={currentQuiz} />
            )}

          <Div class="button-group">
            {currentQuiz &&
              (!user.quizzes ||
                (user.quizzes && !user.quizzes[currentQuiz.name])) && (
                <button
                  class="go"
                  onClick={() => currentQuiz && initQuiz(currentQuiz)}
                >
                  Go to quiz
                </button>
              )}
            <button class="cancel" onClick={() => setShowModal(false)}>
              {' '}
              Cancel{' '}
            </button>
          </Div>
        </Div>
      </Div>
    </Layout>
  )
}
