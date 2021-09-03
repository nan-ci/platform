import { css } from '../../lib/dom.js'
import { Div, P } from '../elements.jsx'
import { useState, useEffect, useRef } from 'preact/hooks'
import moment from 'moment'
import { navigate } from '../../lib/router.js'
import { format } from '../../lib/quiz.js'
import { GET } from '../../lib/api.js'
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
      position:relative;
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

    .quizz-container .absolute {
      display:flex;
      flex-direction:row;
      align-items:center;
      justify-content:center;
      position:absolute;
      top: 4px;
      right: 5px;
    }

    .quizz-container .absolute  span{
       font-size: 0.8rem;
       margin-left: 4px;
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
    const resp = await GET(`user/${type}?key=${id}`)
    if (
      type === 'quizzes' &&
      resp.data &&
      !resp.data.submit &&
      moment().isBefore(resp.data.end_date)
    ) {
      sessionStorage.setItem('quiz', JSON.stringify(resp.data))
      return navigate(`/student/quiz?key=` + id)
    } else {
      selectData(
        type === 'quizzes'
          ? { id, name, duration, percentOfValidation, questions }
          : { id, name, description },
      )
    }
  }

  const checkCondition = (hover = null) => {
    if (
      type === 'projects' &&
      (!hover || (hover && moment().isAfter(beginDate)))
    ) {
      return true
    } else if (
      type === 'quizzes' &&
      (!ifDone ||
        (ifDone &&
          !datas[id].submit &&
          moment().isBefore(datas[id].end_date))) &&
      (!hover || (hover && moment().isAfter(beginDate)))
    ) {
      return true
    } else {
      return false
    }
  }

  return (
    <Div
      key={id}
      class={`quizz-container ${
        !close && checkCondition('hover') && 'canHover'
      }`}
      style={{
        background: !close && checkCondition() ? '#788bb061' : '#4f4f4f',
      }}
      onClick={() => {
        !close &&
          ((type === 'quizzes' &&
            (!ifDone ||
              (ifDone &&
                !datas[id].submit &&
                moment().isBefore(datas[id].end_date)))) ||
            type === 'projects') &&
          moment().isAfter(beginDate) &&
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
      </Div>
      <P class="absolute">
        {(type === 'projects' && ifDone) ||
        (type === 'quizzes' &&
          ifDone &&
          (datas[id].submit || moment().isAfter(datas[id].end_date))) ? (
          <Done size={10} color="green" />
        ) : close ? (
          <NotDone size={10} color={'red'} />
        ) : null}
        <span>
          {(type === 'projects' && ifDone) ||
          (type === 'quizzes' &&
            ifDone &&
            (datas[id].submit || moment().isAfter(datas[id].end_date)))
            ? 'Done'
            : type === 'quizzes' &&
              ifDone &&
              !datas[id].submit &&
              moment().isBefore(datas[id].end_date)
            ? 'in progress ...'
            : close
            ? 'Not Done'
            : null}
        </span>
      </P>
    </Div>
  )
}
