import { useState, useEffect } from 'preact/hooks'
import { Div, P, Span } from '../component/elements.jsx'
import { MTitle } from '../component/markdown.jsx'
import { css } from '../lib/dom.js'
import { Form } from '../component/form.jsx'
import quiz from '../data/fakeQuiz.json'
import { QuestionCard } from '../component/quizQuestionCard.jsx'

css(`
  .quiz {
    width: 100%;
    height: auto;
  }
  .quiz .questions-container {
    width: 100%;
    height:700px;
    overflow-x:hidden;
  }

  .quiz .options {
    display:flex;
    width: 100%;
    align-items:center;
     justify-content: space-between;
  }

`)

export const Quiz = () => {
  const [answeredQuestions, setAnsweredQuestions] = useState({})
  const [time, setTime] = useState(quiz.time)
  const [timeColor, setTimeColor] = useState('white')
  let timeInterval = null

  const deCount = () => {
    const seconds =
      time
        .split(':')
        .map((r, ind) => (ind === 0 ? Number(r) * 60 : Number(r)))
        .reduce((ac, at) => ac + at, 0) - 1

    let min = Math.floor(seconds / 60)
    let sec = seconds % 60
    if (min <= 1) setTimeColor('red-darker')
    setTime((min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec))
  }

  const setAnswer = (question, response, isMultiple) => {
    if (answeredQuestions[question] && isMultiple) {
      if (answeredQuestions[question].includes(response)) {
        answeredQuestions[question] = answeredQuestions[question].filter(
          (v) => v !== response,
        )
        if (!answeredQuestions[question].length)
          delete answeredQuestions[question]
      } else answeredQuestions[question].push(response)
    } else answeredQuestions[question] = isMultiple ? [response] : response
    return setAnsweredQuestions({ ...answeredQuestions })
  }

  useEffect(() => {
    timeInterval = setInterval(() => {
      deCount()
    }, 1000)
    return () => {
      clearInterval(timeInterval)
    }
  }, [time])

  return (
    <Div class="quiz">
      <MTitle.h2>{quiz.name}</MTitle.h2>
      {'\n'}
      <Div class="options">
        <P>
          {' '}
          > Time Remaining :{' '}
          <Span bg="selection" fg={timeColor}>
            [{time}]
          </Span>
        </P>
        <P>
          Answered :{' '}
          <Span bg="selection" fg="comment-lighter">
            [{Object.keys(answeredQuestions).length}/
            {Object.keys(quiz.questions).length}]
          </Span>
        </P>
      </Div>
      {'\n'}
      <Div class="questions-container">
        <Form submit="submit" title="Answer questions and submit">
          {Object.keys(quiz.questions).map((question) => {
            return (
              <QuestionCard
                key={question}
                question={question}
                responses={quiz.questions[question]}
                setAnswer={setAnswer}
              />
            )
          })}
        </Form>
      </Div>
      {'\n'}
    </Div>
  )
}
