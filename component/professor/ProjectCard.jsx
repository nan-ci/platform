import { Div, P } from '../elements.jsx'
import { css } from '../../lib/dom.js'
import { useState, useEffect } from 'preact/hooks'
import { Stack } from '../../component/icons.jsx'
import { format, time as Time } from '../../lib/quiz.js'
import moment from 'moment'

css(`
   .prof-module-projectCard {
      width: 100%;
      height: auto;
      padding: 0.5rem;
      border: 1px solid #444;
      background:#7675530d;
      margin: 20px 0px;
      border-radius: 0.5rem;
      transition: all .2s ease-in-out;
   }

   .prof-module-projectCard .container {
      display:flex;
      flex-direction:row;
      align-items:center;
      justify-content:flex-start;
   }


   .prof-module-projectCard svg {
     width:20%;
   }

   .prof-module-projectCard .left_block{
     position: relative;
     width: 80%;
     padding: 0 0.6rem;
   }

   .prof-module-projectCard .left_block h1{
      font-size: 2rem;
      font-weight:bolder;
  }

  .prof-module-projectCard .left_block p{
    margin-top: 6px;
    white-space:normal
  }


  .prof-module-projectCard  .buttons_group{
      display:flex;
      width: 100%;
      flex-direction:row;
      align-items:center;
      justify-content: space-between;
  }

  .prof-module-projectCard  .buttons_group  span{
        font-weight:bolder;
        color:grey;
  }



  .prof-module-projectCard  .buttons_group div button{
    padding: 0.5rem;
    margin: 5px;
    cursor:pointer;
    border-radius:0.4rem;
    outline:none;
  }

`)

export const ProjectCard = ({
  data: { id, name, description, beginDate, endDate },
  setProjectToUpdate,
}) => {
  let [projectStart, setProjectStart] = useState(
    moment(new Date()).isAfter(moment(beginDate)),
  )

  let [projectClose, setProjectClose] = useState(
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
      setProjectStart(moment().isAfter(beginDate))
      setProjectClose(moment(new Date()).isAfter(endDate))
    }, 1000)

    return () => {
      clearInterval(inter)
    }
  }, [id, endDate, beginDate])

  return (
    <Div class="prof-module-projectCard">
      <Div class="container">
        <Stack size={90} color="white" />
        <Div class="left_block">
          <h1>{name}</h1>
          <P>
            <span style={{ color: 'grey' }}> description : </span>
            {description.length > 110
              ? description.slice(0, 110) + '...'
              : description}
          </P>

          <P>
            <span style={{ fontWeight: 'bolder', color: 'darkgrey' }}>
              {!projectClose
                ? projectStart
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
            (projectStart && !projectClose) || projectClose
              ? 'space-between'
              : 'flex-end',
        }}
      >
        {projectStart && !projectClose && (
          <span> 2 students have finished</span>
        )}
        <Div>
          <button
            style={{ background: 'dodgerblue' }}
            onClick={(e) => {
              e.stopPropagation()
              setProjectToUpdate(id, projectStart && !projectClose)
            }}
          >
            {' '}
            Modify{' '}
          </button>
          {!projectStart && !projectClose && (
            <button
              style={{ background: 'var(--red-darker)' }}
              onClick={(e) => {
                e.stopPropagation()
                setProjectToUpdate(id, 'delete')
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
