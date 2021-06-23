import { css } from '../lib/dom.js'
import { Div, P } from './elements.jsx'
import { useState, useEffect, useRef } from 'preact/hooks'
import moment from 'moment'
import { navigate } from '../lib/router.js'
import { format, getUser } from '../lib/quiz.js'

css(`
    .quizz-container {
      display:flex;
      flex-direction:row;
      align-items:center;
      justify-content:space-between;
      width:100%;
      padding: 1.3rem;
      cursor:pointer;
      background:#8080803b;
      transition:all 0.5s ease-in-out;
      margin:7px auto;
    }

    .quizz-container:hover{
      transform: scale(1.07);
    }

    .quizz-container .l {
      width:auto;
      display:flex;
      flex-direction:row;
      align-items:center;
      justify-content:flex-start
    }

    .quizz-container h1,.quizz-container p{
      margin-left:15px;
    }
`)

export const QuizCard = ({
  id,
  name,
  duration,
  endDate,
  beginDate,
  questions,
  percentOfValidation,
  selectQuiz,
}) => {
  const [time, setTime] = useState('00:00')
  const timeRef = useRef(null)

  const [quizClose, setQuizClose] = useState(moment().isAfter(endDate))
  const [ifStart, setIfStart] = useState(moment().isBefore(beginDate))

  const user = getUser()

  const getDateInfos = (end, start) => {
    const currentDate = moment()
    end = moment(moment().isBefore(start) ? start : end)
    const diff = moment.duration(end.diff(currentDate))
    const meth = {
      hours: diff.hours(),
      days: diff.days(),
      minutes: diff.minutes(),
      seconds: diff.seconds(),
    }
    setIfStart(moment().isBefore(start))
    setTime(
      (meth['days'] > 0 ? format(meth, 'days') : '') +
        ' ' +
        (meth['hours'] ? format(meth, 'hours') : '') +
        ' ' +
        (meth['minutes'] ? format(meth, 'minutes') : '') +
        ' ' +
        (meth['seconds'] ? format(meth, 'seconds') : ''),
    )
    setQuizClose(moment().isAfter(end))
  }

  useEffect(() => {
    timeRef.current = setInterval(() => {
      getDateInfos(endDate, beginDate)
    }, 1000)
    return () => {
      clearInterval(timeRef.current)
    }
  }, [])

  return (
    <Div
      key={id}
      class="quizz-container"
      onClick={() => {
        if (
          user.quizzes &&
          user.quizzes[name] &&
          !user.quizzes[name].submit &&
          moment().isBefore(user.quizzes[name].end)
        )
          navigate('/quiz?name=' + name)
        selectQuiz({ name, duration, percentOfValidation, questions })
      }}
    >
      <Div class="l">
        <i
          class="fab fa-buffer"
          aria-hidden="true"
          style={{ color: 'orange' }}
        ></i>
        <h1>{name}</h1>
        <P>
          <i
            class="fas fa-stopwatch"
            aria-hidden="true"
            style={{ color: 'red' }}
          ></i>
          {duration}
        </P>
      </Div>
      <Div class="r">
        {!quizClose ? (
          <P>
            <strong>{ifStart ? 'open' : 'close'} in :</strong>
            {time}
          </P>
        ) : (
          <P> Closed </P>
        )}
      </Div>
    </Div>
  )
}
