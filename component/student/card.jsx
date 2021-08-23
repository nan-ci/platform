import { css } from '../../lib/dom.js'
import { Div, P } from '../elements.jsx'
import { useState, useEffect, useRef } from 'preact/hooks'
import moment from 'moment'
import { navigate } from '../../lib/router.js'
import { format, getQuiz } from '../../lib/quiz.js'
import { courses } from '../../data/courses.js'
import { API } from '../../lib/env.js'
import { Chrono, Quiz, Done, NotDone, Lock, Stack } from '../icons.jsx'

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
      justify-content:flex-start;
    }

    .quizz-container h1,.quizz-container p{
      margin-left:15px;
    }
`)

export const Card = ({
  type,
  id,
  name,
  description,
  duration,
  endDate,
  beginDate,
  questions,
  percentOfValidation,
  selectData,
  ifDone,
  datas,
}) => {
  const [time, setTime] = useState('00:00')
  const timeRef = useRef(null)

  const [close, setClose] = useState(moment().isAfter(endDate))
  const [start, setStart] = useState(moment().isAfter(beginDate))

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
    setStart(moment().isAfter(start))
    setTime(
      (meth['days'] > 0 ? format(meth, 'days') : '') +
        ' ' +
        (meth['hours'] ? format(meth, 'hours') : '') +
        ' ' +
        (meth['minutes'] ? format(meth, 'minutes') : '') +
        ' ' +
        (meth['seconds'] ? format(meth, 'seconds') : ''),
    )
    setClose(moment().isAfter(end))
  }

  useEffect(() => {
    timeRef.current = setInterval(() => {
      getDateInfos(endDate, beginDate)
    }, 1000)
    return () => {
      clearInterval(timeRef.current)
    }
  }, [datas])

  const findData = async () => {
    const resp = await (await fetch(`${API}/user/${type}?name=${name}`)).json()
    if (
      type === 'quizzes' &&
      resp.status &&
      !resp.data.submit &&
      moment().isBefore(resp.data.end_date)
    ) {
      localStorage.setItem('quiz', JSON.stringify(resp.data))
      return navigate(`/student/quiz?name='` + name)
    } else {
      selectData(
        type === 'quizzes'
          ? { name, duration, percentOfValidation, questions }
          : { name, description },
      )
    }
  }

  return (
    <Div
      key={id}
      class={`quizz-container ${!close && !ifDone && 'canHover'}`}
      style={{
        background: !close && !ifDone ? '#788bb061' : '#4f4f4f',
      }}
      onClick={() => {
        !close &&
          ((type === 'quizzes' && !ifDone) || type === 'projects') &&
          findData()
      }}
    >
      <Div
        class="l"
        style={{
          justifyContent: type === 'quizzes' ? 'space-between' : 'flex-start',
        }}
      >
        {type === 'quizzes' ? (
          <Quiz size={20} color="white" style={{ fontWeight: 'bolder' }} />
        ) : (
          <Stack size={20} color="white" style={{ fontWeight: 'bolder' }} />
        )}
        <h1>{name}</h1>
        {type === 'quizzes' && (
          <>
            <Chrono size={20} color="white" style={{ fontWeight: 'bolder' }} />
            <span>{duration}</span>
          </>
        )}
      </Div>
      <Div class="r">
        {!close && (
          <P>
            <strong>{start ? 'close' : 'open'} in :</strong>
            <span>{time}</span>
          </P>
        )}
        {close && (
          <P>
            <Lock size={20} /> <span> Closed </span>
          </P>
        )}
        {ifDone && (
          <P>
            <Done size={20} color="green" />
            <span> Done </span>
          </P>
        )}
        {close && !ifDone && (
          <P>
            <NotDone size={20} color={'red'} />
            <span> Not Done </span>
          </P>
        )}
      </Div>
    </Div>
  )
}
