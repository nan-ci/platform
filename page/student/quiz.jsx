import { useState, useEffect, useRef } from 'preact/hooks'
import { courses } from '../../data/courses.js'
import { Div, P } from '../../component/elements.jsx'
import { Layout } from '../../component/layout.jsx'
import {
  durationToSeconds,
  progressColor,
  getQuiz,
  time,
  getUser,
} from '../../lib/quiz.js'
import { css } from '../../lib/dom.js'
import {
  Chrono,
  ArrowLeft,
  ArrowRight,
  Done,
  NotDone,
} from '../../component/icons.jsx'
import { API } from '../../lib/env.js'
import { navigate } from '../../lib/router.js'
import { equals } from '../../lib/quiz.js'

css(`
  .quiz-h1{
    text-align:center;
  }

  .quiz-h1 span {
    font-size:1.4rem;
  }

  .quiz-h1 span:nth-child(1) {
    color:var(--green-darker)
  }

  .quiz-container {
     width:100%;
     height:400px;
     margin-top:20px;
     background:#272729;
     position:relative;
     border-radius:0.6rem;
     border:1px solid var(--comment-darker);
  }

  .quiz-container header {
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:flex-start;
    margin:0 auto;
    width: 100%;
  }

  .quiz-container h2.chrono {
     text-align:center;
    font-size:1.4rem;
    padding: 1rem;
    display:flex;
    align-items:center;
    flex-direction:row;
    justify-content:center;
  }

  .quiz-container h2.chrono i {
    font-weight:bolder;
    font-size: 1.4rem;
    color:var(--red-darker);
  }

  .quiz-container .progression-bar {
    width: 300px;
    height: 15px;
    border:1px solid grey;
    border-radius:0.3rem;
  }

  .quiz-container .progression-bar div {
    height:13px;
    border-radius: 0.3rem 0 0 0.3rem;
    transform:skew(-5deg);
    transition:all 0.25s ease-in-out;
  }

  .quiz-container .middle {
    display:flex;
    flex-direction:row;
    align-items:flex-start;
    justify-content:space-between;
  }

  .quiz-container section.question {
    width: 70%;
    padding: 1rem;
    display:flex;
    flex-direction:column;
    align-items:flex-start;
    justify-content:space-between;
  }

  .quiz-container section.question header {
    height:55px;
    display:flex;
    flex-direction:column;
    align-items:flex-start;
    justify-content:space-between;
  }


  .quiz-container section.question header h1 {
    display:flex;
    flex-direction:row;
    align-items:center;
  }

  .quiz-container section.question header h1 span {
    font-weight:bolder;
    font-size:1.3rem;
    text-decoration:underline;
  }

  .quiz-container section.question header h1 i{
     font-size: 1.5rem;
     margin-right:7px;
  }

  .quiz-container section.question header p {
    margin:0;
    padding:0;
    font-size: 1.1rem;
  }

  .quiz-container section.question .responses {
    margin-top:20px;
    margin-left: 20px;
  }

  .quiz-container section.question .responses  p{
     font-weight:bolder;
     margin: 5px;
     cursor:pointer;
     display:flex;
     flex-direction:row;
     align-items:center;
     justify-content:flex-start;
  }

  .quiz-container section.question .responses  p label{
    margin-left: 10px;
    cursor:pointer;
 }

 .quiz-container section.question .next-prev {
   display:flex;
   flex-direction:row;
   align-items:center;
   margin-top: 20px;
 }

 .quiz-container section.question .next-prev button {
    padding:0.3rem;
    outline:none;
   cursor:pointer;
   width:35px;
   height:35px;
    border-radius:0.5rem;
    margin: 5px;
    background:var(--comment-darker);

}

 .quiz-container section.questionNumber {
  display:flex;
  flex-direction:column;
  align-items:flex-start;
  justify-content: flex-start;
  padding: 1rem;
  width: 30%;
 }

 .quiz-container section.questionNumber button {
    background: var(--comment-darker);
    padding: 0.5rem;
    border-radius: 0.3rem;
    margin:0 auto;
    cursor:pointer;
    margin-top: 20px;
    width: 100%;
 }

  .quiz-container section.questionNumber .content-card {
     display:flex;
     flex-direction:row;
     align-items:flex-start;
     justify-content: center;
     flex-wrap: wrap;
     width: 100%;
     height: 150px;
     padding: 0.1rem;
  }


  .quiz-container section.questionNumber .content-card  div{
    width: 50px;
    hegith: 50px;
    font-weight:bolder;
    background: transparent;
    border:2px solid var(--comment-darker);
    border-radius:0.5rem;
    margin: 3px;
    padding: 0.5rem;
    padding: 0.5rem;
    text-align:center;
    cursor:pointer
}


.quiz-container section.questionNumber .content-card div.respond{
  background:var(--green-darker);
  border:1px solid var(--green-darker);
}

.quiz-container section.questionNumber .content-card div.notfound{
  background:var(--red-darker);
  border:1px solid var(--red-darker);
}

.quiz-container section.questionNumber .content-card div.active{
  background:var(--comment-darker);
  border: 1px solid var(--comment-darker);
}

.quiz-container .legend {
  position:absolute;
  bottom: 30px;
  right:15px;
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content:space-between;
  width: 300px;
}

.quiz-container .legend div {
  display:flex;
  flex-direction:row;
  align-items:center;
}

.quiz-container .legend span.b{
     display:inline-block;
    padding: 0.2rem;
    border-radius:0.1rem;
    width:15px;
    height:15px;
}

.quiz-container .legend div span.no-answered {
   border:1px solid var(--comment-darker);
   background:transparent;
}

.quiz-container .legend div span.answered {
  border:1px solid var(--green-darker);
  background:var(--green-darker);
}

.quiz-container .legend div span.active {
  border:1px solid var(--coment-darker);
  background:var(--comment-darker);
}

.submit-quiz {
  position:absolute;
  top: 30%;
  left:50%;
  right:50%;
  width: 400px;
  padding:1rem;
  background: black;
  text-align:center;
  border:2px solid red;
  border-radius:0.6rem;
  transition:all 0.5s ease-in-out;
}

.submit-quiz h1 {
  font-size: 1.4rem;
}

.submit-quiz button.close {
  padding: 0.5rem 0.9rem;
  border-radius: 5rem;
  position:absolute;
  top: -30px;
  right: -15px;
  border:none;
  outline:none;
  cursor:pointer;
  font-size: 2rem;
}

.submit-quiz button.yes {
  background:var(--red-darker);
  padding: 0.5rem;
  width: 70px;
  margin: 0 auto;
  margin-top: 20px;
  cursor:pointer;
}


.circle {
    border-radius:15px;
   padding:0.07rem;
    background: white;
}

.circle>div{
  border-radius:15px;
  height:10px;
  width: 10px;
}

.square {
  border-radius: 2px;
  padding: 0.07rem;
  background: white;
}

.square>div{
  border-radius:2px;
  height:10px;
  width: 10px;
}

`)

export const InputExample = ({ type, checked }) => {
  return (
    <Div
      class={type === 'radio' ? 'circle' : 'square'}
      style={{
        border: checked ? '1px solid var(--comment-darker)' : '1px solid white',
      }}
    >
      <Div
        style={{ background: checked ? 'var(--comment-darker)' : 'white' }}
      ></Div>
    </Div>
  )
}

export const Quiz = ({ params: { name, relecture } }) => {

  const quiz = courses
    .find((c) => c.name === getUser().speciality)
    .quizzes.find((q) => q.name === decodeURI(name))

  const QuiZ = getQuiz()

  const [chrono, setChrono] = useState(null)
  const [progressPercent, setProgressPercent] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)

  const [currentQuestion, setCurrentQuestion] = useState(
    Object.keys(quiz.questions)[currentIndex],
  )

  const [currentResponses, setCurrentResponses] = useState(
    quiz.questions[currentQuestion],
  )
  
  const [manyResponse, setManyResponse] = useState(
    Object.values(currentResponses).filter((f) => f).length > 1,
  )

  const [myResponses, setMyResponses] = useState({})

  const [showModal, setShowModal] = useState(false)

  let chronoInterval = null
  let progressInterval = null

  const submitQuiz = async () => {
    clearInterval(chronoInterval)
    clearInterval(progressInterval)
    const fetching = await fetch(`${API}/user/quizzes?name=${name}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ submit: true }),
    })
    const resp = await fetching.json()
    if (resp.status) {
      localStorage.removeItem('quiz')
      navigate('/quizzes')
    }
  }

  const changeQuestion = (name) => {
    setCurrentQuestion(name)
    setCurrentIndex(Object.keys(quiz.questions).findIndex((q) => q === name))
    setCurrentResponses(quiz.questions[name])
    setManyResponse(
      Object.values(quiz.questions[name]).filter((f) => f).length > 1,
    )
  }

  const chooseResponse = async (value) => {
    if (manyResponse) {
      if (myResponses[currentQuestion]) {
        myResponses[currentQuestion].includes(value)
          ? myResponses[currentQuestion].splice(
              myResponses[currentQuestion].findIndex((r) => r === value),
            )
          : myResponses[currentQuestion].push(value)
      } else {
        myResponses[currentQuestion] = [value]
      }
    } else {
      myResponses[currentQuestion] = value
    }
    setMyResponses((r) => {
      return { ...r, ...myResponses }
    })
    await (
      await fetch(`${API}/user/quizzes?name=${name}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ responses: { ...myResponses } }),
      })
    ).json()
    sessionStorage.setItem(
      'quiz',
      JSON.stringify({ ...getQuiz(), responses: { ...myResponses } }),
    )
  }

  const checkIfFound = (key, resp = null) => {
    const question = quiz.questions[key]
    const { responses } = QuiZ
    if (Object.values(question).filter((t) => t).length > 1) {
      const resps = Object.entries(question)
        .flatMap((val) => (val[1] ? val[0] : null))
        .filter((f) => f)
      if (
        (!resp && equals(resps, responses[key])) ||
        (resp && resps.includes(resp))
      )
        return true
    } else if (
      (!resp && question[responses[key]]) ||
      (resp && question[resp])
    ) {
      return true
    } else {
      return false
    }
  }

  useEffect(async () => {
    // check if  session on the page to get infos from localStorage (simulate database);
    if (QuiZ) {
      setMyResponses(QuiZ.responses)
    }
  }, [])

  useEffect(() => {
    if (!relecture) {
      chronoInterval = setInterval(() => {
        const duration = time('all', QuiZ.end_date)
        if (duration.asSeconds() > 0) {
          setChrono(
            `${
              duration.minutes() < 10
                ? '0' + duration.minutes()
                : duration.minutes()
            }:${
              duration.seconds() < 10
                ? '0' + duration.seconds()
                : duration.seconds()
            }`,
          )
        } else {
          submitQuiz()
        }
      }, 1000)
    }

    return () => {
      clearInterval(chronoInterval)
    }
  }, [relecture])

  useEffect(() => {
    if (!relecture) {
      progressInterval = setInterval(() => {
        const seconds = time('asSeconds', QuiZ.end_date)
        if (seconds >= 0) {
          setProgressPercent(
            100 -
              (seconds * 100000) / (durationToSeconds(quiz.duration) * 1000),
          )
        } else {
          clearInterval(progressInterval)
        }
      }, 100)
    }
    return () => {
      clearInterval(progressInterval)
    }
  }, [relecture])
  if (!QuiZ) return navigate('/quizzes')

  return (
    <Layout>
      <h1 class="quiz-h1">
        <span>{!relecture ? 'Quiz' : 'Proofreading'} : </span>
        <span>{quiz.name}</span>
      </h1>
      <Div class="quiz-container">
        {!relecture ? (
          <header>
            <h2 class="chrono">
              <Chrono size={25} color="red" style={{ marginRight: '10px' }} />{' '}
              {chrono ? chrono : ' ... '}
            </h2>
            <Div class="progression-bar">
              <Div
                style={{
                  width: progressPercent + '%',
                  background: `${progressColor(parseInt(progressPercent))}`,
                }}
              />
            </Div>
          </header>
        ) : (
          <>
            <br />
            <br />
          </>
        )}
        <Div class="middle">
          <section class="question">
            <header>
              <h1>
                <i class="far fa-question-circle" aria-hidden="true"></i>
                <span>Question {currentIndex + 1}</span>
              </h1>
              <P style={{ width: '100%', whiteSpace: 'normal' }}>
                {' '}
                {currentQuestion} ?{' '}
              </P>
            </header>

            <Div class="responses">
              {Object.keys(currentResponses).map((val, index) => {
                return !relecture ? (
                  <P key={val}>
                    <input
                      disabled={relecture}
                      checked={
                        myResponses[currentQuestion] &&
                        (!manyResponse
                          ? val === myResponses[currentQuestion]
                          : myResponses[currentQuestion].includes(val))
                      }
                      type={manyResponse ? 'checkbox' : 'radio'}
                      id={`check${index}`}
                      name="resp"
                      onChange={(e) => chooseResponse(e.target.value)}
                      value={val}
                    />
                    <label for={`check${index}`}> {val}</label>
                  </P>
                ) : (
                  <P key={val}>
                    <InputExample
                      type={manyResponse ? 'checkbox' : 'radio'}
                      checked={
                        myResponses[currentQuestion] &&
                        (!manyResponse
                          ? val === myResponses[currentQuestion]
                          : myResponses[currentQuestion].includes(val))
                      }
                    />
                    <label> {val}</label> &nbsp;
                    {myResponses[currentQuestion] &&
                      (!manyResponse
                        ? val === myResponses[currentQuestion]
                        : myResponses[currentQuestion].includes(val)) && (
                        <>
                          {checkIfFound(currentQuestion, val) ? (
                            <Done size={10} color="lime" />
                          ) : (
                            <NotDone size={10} color="red" />
                          )}
                        </>
                      )}
                    {checkIfFound(currentQuestion, val) &&
                      !(
                        myResponses[currentQuestion] &&
                        (!manyResponse
                          ? val === myResponses[currentQuestion]
                          : myResponses[currentQuestion].includes(val))
                      ) && <Done size={10} color="lime" />}
                  </P>
                )
              })}
            </Div>

            <Div class="next-prev">
              <button
                onClick={() =>
                  currentIndex > 0 &&
                  changeQuestion(Object.keys(quiz.questions)[currentIndex - 1])
                }
              >
                <ArrowLeft size={15} color="white" />
              </button>
              <button
                onClick={() =>
                  currentIndex < Object.keys(quiz.questions).length - 1 &&
                  changeQuestion(Object.keys(quiz.questions)[currentIndex + 1])
                }
              >
                <ArrowRight size={15} color="white" />
              </button>
            </Div>
          </section>

          <section class="questionNumber">
            <Div class="content-card">
              {Object.keys(quiz.questions).map((val, index) => {
                return !relecture ? (
                  <Div
                    key={val}
                    class={`${val === currentQuestion && 'active'} ${
                      !relecture &&
                      val !== currentQuestion &&
                      Object.keys(myResponses).includes(val) &&
                      'respond'
                    }`}
                    onClick={() => changeQuestion(val)}
                  >
                    {index + 1}
                  </Div>
                ) : (
                  <Div
                    key={val}
                    class={`${val === currentQuestion && 'active'} ${
                      val !== currentQuestion && checkIfFound(val)
                        ? 'respond'
                        : 'notfound'
                    }`}
                    onClick={() => changeQuestion(val)}
                  >
                    {index + 1}
                  </Div>
                )
              })}
            </Div>
            <button
              onClick={() =>
                !relecture ? setShowModal(true) : navigate('/profile')
              }
            >
              {!relecture ? 'submit' : 'cancel'}{' '}
            </button>
          </section>
        </Div>

        <Div class="legend">
          <Div>
            <span
              class="b no-answered"
              style={{
                background: relecture && 'red',
                border: relecture && '1px solid red',
              }}
            ></span>
            &nbsp;
            <span> {!relecture ? 'no-answered' : 'not found'}</span>
          </Div>
          <Div>
            <span class="b answered"></span>&nbsp;
            <span> {!relecture ? 'answered' : 'found'}</span>
          </Div>
          <Div>
            <span class="b active"></span>&nbsp;
            <span> active</span>
          </Div>
        </Div>
      </Div>
      <Div
        class="submit-quiz"
        style={{
          transform: `translate(-50%,-50%) ${
            showModal ? 'scale(1)' : 'scale(0)'
          }`,
        }}
      >
        <button class="close" onClick={() => setShowModal(false)}>
          &times;
        </button>
        <h1> Do you want really submit this quiz ??</h1>
        <button class="yes" onClick={() => submitQuiz()}>
          Yes
        </button>
      </Div>
    </Layout>
  )
}
