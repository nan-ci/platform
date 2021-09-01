import { Div, P } from '../elements.jsx'
import { css } from '../../lib/dom.js'
import { useState, useEffect } from 'preact/hooks'
import { Quiz } from '../../component/icons.jsx'
import { format, time as Time } from '../../lib/quiz.js'
import moment from 'moment'

css(`
   .prof-quizzes-moduleCard {
      width: 100%;
      height: auto;
      padding: 0.5rem;
      border: 1px solid #444;
      background:#7675530d;
      margin: 20px 0px;
      border-radius: 0.5rem;
      transition: all .2s ease-in-out;
   }

   .prof-quizzes-moduleCard .container {
      display:flex;
      flex-direction:row;
      align-items:center;
      justify-content:flex-start;
   }


   .prof-quizzes-moduleCard svg {
     width:20%;
   }

   .prof-quizzes-moduleCard .left_block{
     position: relative;
     width: 80%;
     padding: 0 0.6rem;
   }

   .prof-quizzes-moduleCard .left_block h1{
      font-size: 2rem;
      font-weight:bolder;
  }

  .prof-quizzes-moduleCard .left_block p{
    margin-top: 6px;
    white-space:normal
  }


  .prof-quizzes-moduleCard  .buttons_group{
      display:flex;
      width: 100%;
      flex-direction:row;
      align-items:center;
      justify-content: space-between;
  }

  .prof-quizzes-moduleCard  .buttons_group  span{
        font-weight:bolder;
        color:grey;
        cursor:pointer;
        margin-top: 10px;
  }

  .prof-quizzes-moduleCard  .buttons_group  span:hover{
    color: skyblue;
  }



  .prof-quizzes-moduleCard  .buttons_group div button{
    padding: 0.5rem;
    margin: 5px;
    cursor:pointer;
    font-weight:normal;
    border-radius:0.4rem;
    outline:none;
  }

`)

export const QuizCard = ({
  data,
  setQuizToUpdate,
  showStudentsResults,
  studentsLength,
}) => {
  const {
    id,
    name,
    questions,
    beginDate,
    endDate,
    duration,
    percentOfValidation,
  } = data

  let [quizStart, setQuizStart] = useState(
    moment(new Date()).isAfter(moment(beginDate)),
  )

  let [quizClose, setQuizClose] = useState(
    moment(new Date()).isAfter(moment(endDate)),
  )

  let [time, setTime] = useState('00:00:00')

  let inter = null

  useEffect(() => {
    inter = setInterval(() => {
      let end = moment(moment().isBefore(beginDate) ? beginDate : endDate)
      const diff = moment.duration(end.diff(moment()))
      const meth = {
        hours: diff.hours(),
        days: diff.days(),
        minutes: diff.minutes(),
        seconds: diff.seconds(),
      }
      setTime(
        (meth['days'] > 0 ? format(meth, 'days') : '') +
          ' ' +
          (meth['hours'] ? format(meth, 'hours') : '') +
          ' ' +
          (meth['minutes'] ? format(meth, 'minutes') : '') +
          ' ' +
          (meth['seconds'] ? format(meth, 'seconds') : ''),
      )
      setQuizStart(moment().isAfter(beginDate))
      setQuizClose(moment(new Date()).isAfter(endDate))
    }, 1000)

    return () => {
      clearInterval(inter)
    }
  }, [id, endDate, beginDate])

  const studentsResults = () => {
    showStudentsResults(['d', 'f'], {
      id,
      name,
      questions,
      percentOfValidation,
    })
  }

  return (
    <Div class="prof-quizzes-moduleCard">
      <Div class="container">
        <Quiz size={90} color="white" />
        <Div class="left_block">
          <h1>{name}</h1>
          <P>
            <span style={{ color: 'grey' }}> duration : </span>
            {duration}
          </P>
          <P>
            <span style={{ color: 'grey' }}> questions : </span>
            {Object.keys(questions).length}
          </P>
          <P>
            <span style={{ color: 'grey' }}> percent for validation : </span>
            {percentOfValidation}
          </P>
          <P>
            <span style={{ fontWeight: 'bolder', color: 'darkgrey' }}>
              {!quizClose
                ? quizStart
                  ? `close in ${time}`
                  : `open in ${time}`
                : `closed`}
            </span>
          </P>
        </Div>
      </Div>
      <Div
        class="buttons_group"
        style={{
          justifyContent:
            (quizStart && !quizClose) || quizClose
              ? 'space-between'
              : 'flex-end',
        }}
      >
        {quizStart && (
          <span onClick={() => showStudentsResults(data)}>
            {' '}
            {studentsLength} students have finished
          </span>
        )}
        <Div>
          <button
            style={{ background: 'dodgerblue' }}
            onClick={(e) => {
              e.stopPropagation()
              setQuizToUpdate(data, quizStart && !quizClose)
            }}
          >
            {' '}
            Modify{' '}
          </button>
          {!quizStart && !quizClose && (
            <button
              style={{ background: 'var(--red-darker)' }}
              onClick={(e) => {
                e.stopPropagation()
                setQuizToUpdate(data, 'delete')
              }}
            >
              {' '}
              Delete{' '}
            </button>
          )}
        </Div>
      </Div>
    </Div>
  )
}
