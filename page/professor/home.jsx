import { Div, P } from '../../component/elements'
import { Layout } from '../../component/layout.jsx'
import { logo } from '../../data/ascii'
import { css } from '../../lib/dom'
import { API } from '../../lib/env'
import { user } from '../../lib/auth.js'
import { navigate } from '../../lib/router'
import moment from 'moment'
import 'moment/locale/fr'
import { useEffect, useState, useRef } from 'preact/hooks'
import { CircelStep } from '../../component/icons.jsx'

css(`
 ._container {
   display:flex;
   flex-direction:row;
   flex-wrap:wrap;
   align-items:center;
   justify-content: flex-start;
 }

   ._card {
     border-radius: 0.7rem;
     margin: 9px;
     cursor:pointer;
   }

   ._card.one {
     width: 100%;
     height: 180px;
     padding: 0.6rem;
     background: rgba(0,0,0,0.7);
   }

   ._card.one h1 {
     white-space:normal;
     font-size: 2.7rem;
     width: 500px;
   }

   ._card.one p {
      margin-top: 10px;
      width: 90%;
      display:flex;
      flex-direction:row;
      align-items:;
      justify-content: flex-start;
  }

  ._card.one p .red {
      display:block;
      width: 20px;
      height: 20px;
      background: red;
      border-radius: 2rem;
      margin-right: 10px;
  }
   ._card.two {
    width: 47%;
    height: 160px;
    background: black;
    padding: 0.7rem;

  }

  ._card.two h1 {
    width:100%;
    font-size: 1.3rem;
    text-decoration:underline;
  }

  ._card.two .flop{
    width:100%;
    height: 80%;
    overflow-y:scroll;
    padding-bottom: 1rem;
    background: black;
  }

  ._card.two .flop p{
      margin: 5px auto;
      display:flex;
      align-items:center;
      flex-direction:center;
  }

  ._card.two .flop p span{
      margin-left:10px;
      font-size: 1.2rem;
      font-weight:bolder;
  }

  ._card.three {
    width: 47%;
    height: 160px;
    background: black;
    padding:0.7rem;
  }

  ._card.three .flop {
     width: 100%;
     height: 80%;
     background: transparent;
    transition: all .5s ease-in-out;
  }

  ._card.three h1 {
    text-decoration:underline;
  }

  ._card.three .flop p {
     color: white;
     font-weight: bolder;
     font-size: 1.5rem;
     margin: 20px auto;
  }



`)

export const Home = () => {
  let inter = null
  let inter2 = null
  const [time, setTime] = useState(moment().format('llll'))
  const [eventIndex, setEventIindex] = useState(0)
  const [modulesLength, setModuleLength] = useState(0)
  const [projectsLength, setProjectsLength] = useState(0)
  const [courseslength, setCoursesLength] = useState(0)
  const [quizzesLength, setQuizzesLength] = useState(0)
  const eventsInfo = [
    'the quizz  javascript has beginning ',
    'the project juyfull is closed',
    '3 students are do the last project',
  ]

  useEffect(async () => {
    const p = await (
      await fetch(`${API}/projects`, { headers: { cookie: document.cookie } })
    ).json()
    if (p.data) setProjectsLength(p.data.length)
    const m = await (await fetch(`${API}/modules`)).json()
    if (m.data) setModuleLength(m.data.length)
    const c = await (await fetch(`${API}/courses`)).json()
    if (c.data) setCoursesLength(c.data.length)
    const q = await (await fetch(`${API}/quizzes`)).json()
    if (q.data) setQuizzesLength(q.data.length)
  }, [])

  useEffect(() => {
    let count = 1
    inter = setInterval(() => {
      setTime(moment().format('llll'))
    }, 60000)

    inter2 = setInterval(() => {
      document.querySelector('._card.three .flop').style.opacity = 0
      document.querySelector('._card.three .flop').style.opacity = 1
      document.querySelector('._card.three .flop').style.transform = `rotateX(${
        count * (180 * 2)
      }deg)`
      count++
      setEventIindex((d) => (d === eventsInfo.length - 1 ? 0 : d + 1))
    }, 5000)

    return () => {
      clearInterval(inter)
      clearInterval(inter2)
    }
  }, [])

  return (
    <Layout>
      <br />
      <P class="username-curriculum">Welcome back 👋, {user.name}</P>
      <Div class="_container">
        <Div class="_card one">
          <h1>{time}</h1>
          <P>
            <span class="red"></span> vous avez trois project en attente de
            correction
          </P>
        </Div>
        <Div class="_card two">
          <h1>Stats</h1>
          <Div class="flop">
            <P>
              <CircelStep size={20} colors={['#84CAFF', '#00A6FF']} />
              <span> student(s)</span>
            </P>
            <P>
              <CircelStep size={20} colors={['#84CAFF', '#00A6FF']} />
              <span> {modulesLength} module(s) </span>
            </P>
            <P>
              <CircelStep size={20} colors={['#84CAFF', '#00A6FF']} />
              <span> {courseslength} course(s) </span>
            </P>
            <P>
              <CircelStep size={20} colors={['#84CAFF', '#00A6FF']} />
              <span>{projectsLength} project(s) </span>
            </P>
            <P>
              <CircelStep size={20} colors={['#84CAFF', '#00A6FF']} />
              <span>{quizzesLength} quiz(zes) </span>
            </P>
          </Div>
        </Div>
        <Div class="_card three">
          <h1>Events</h1>
          <Div class="flop">
            <P>{eventsInfo[eventIndex]}</P>
          </Div>
        </Div>
      </Div>
    </Layout>
  )
}
