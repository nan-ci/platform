import { css } from '../lib/dom.js'
import { Div, P } from './elements.jsx'
import { useState, useEffect, useRef } from 'preact/hooks'
import moment from 'moment'
import { navigate } from '../lib/router.js'
import { format, getUser } from '../lib/quiz.js'
import { Chrono, Quiz, Done, NotDone, Lock } from '../component/icons.jsx'

css(`
    .quizz-container {
      display:flex;
      flex-direction:row;
      align-items:center;
      justify-content:space-between;
      width:100%;
      padding: 1.3rem;
      cursor:pointer;
      transition:all 0.5s ease-in-out;
      margin:7px auto;
    }

    .canHover:hover{
      transform: scale(1.07);
    }

    .quizz-container .r,.quizz-container .r p{
        display:flex;
        flex-direction:row;
        align-items:center;
        justify-content:center;
    }

    .quizz-container .r  p span{
      margin-left: 10px;
  }


    .quizz-container .l {

      width:50%;
      display:flex;
      flex-direction:row;
      align-items:center;
      justify-content:space-between;
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
  const [quizStart, setQuizStart] = useState(moment().isAfter(beginDate))

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
    setQuizStart(moment().isAfter(start))
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
      class={`quizz-container ${
        !quizClose &&
        (!user.quizzes || (user.quizzes && user.quizzes[name])) &&
        'canHover'
      }`}
      style={{
        background:
          !quizClose && (!user.quizzes || (user.quizzes && user.quizzes[name]))
            ? '#788bb061'
            : '#4f4f4f',
      }}
      onClick={() => {
        if (
          !quizClose &&
          user.quizzes &&
          user.quizzes[name] &&
          !user.quizzes[name].submit &&
          moment().isBefore(user.quizzes[name].end)
        )
          navigate('/quiz?name=' + name)
        !quizClose &&
          selectQuiz({ name, duration, percentOfValidation, questions })
      }}
    >
      <Div class="l">
        <Quiz size={20} color="orangered" style={{ fontWeight: 'bolder' }} />
        <h1>{name}</h1>
        <Chrono size={20} color="red" style={{ fontWeight: 'bolder' }} />
        <span>{duration}</span>
      </Div>
      <Div class="r">
        {!quizClose && (
          <P>
            <strong>{quizStart ? 'close' : 'open'} in :</strong>
            <span>{time}</span>
          </P>
        )}
        {quizClose && (
          <P>
            <Lock size={20} /> <span> Closed </span>
          </P>
        )}
        {user.quizzes && user.quizzes[name] && (
          <P>
            <Done size={20} color="green" />
            <span> Done </span>
          </P>
        )}
        {quizClose && (!user.quizzes || (user.quizzes && !user.quizzes[name])) && (
          <P>
            <NotDone size={20} color={'red'} />
            <span> Not Done </span>
          </P>
        )}
      </Div>
    </Div>
  )
}
