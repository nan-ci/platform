import { Div, P } from '../../component/elements'
import { Layout } from '../../component/layout.jsx'
import { logo } from '../../data/ascii'
import { css } from '../../lib/dom'
import { API } from '../../lib/env'
import { user } from '../../lib/auth.js'
import { navigate } from '../../lib/router'
import moment from 'moment'
import 'moment/locale/fr'
import { useEffect, useState } from 'preact/hooks'
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
     width: 400px;
     white-space:normal;
     font-size: 2.5rem;
   }

   ._card.one p {
      margin-top: 20px;
  }

   ._card.two {
    width: 47%;
    height: 150px;
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
    overflow:scroll;
    overflow-y:scroll;
    overflow-x:hidden;
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
    height: 150px;
    background: black;
    padding:0.7rem;
  }

`)

export const Home = () => {
  let inter = null
  const [time, setTime] = useState(moment().format('llll'))
  useEffect(() => {
    inter = setInterval(() => {
      setTime(moment().format('llll'))
    }, 60000)

    return () => {
      clearInterval(inter)
    }
  }, [])

  return (
    <Layout>
      <br />
      <P class="username-curriculum">Welcome back 👋, {user.name}</P>
      <Div class="_container">
        <Div class="_card one">
          <h1>{time}</h1>
          <P> vous avez trois project en attente de correction</P>
        </Div>
        <Div class="_card two">
          <h1>Stats</h1>
          <Div class="flop">
            <P>
              <CircelStep size={20} colors={['#84CAFF', '#00A6FF']} />
              <span>5 students</span>
            </P>
            <P>
              <CircelStep size={20} colors={['#84CAFF', '#00A6FF']} />
              <span>5 students</span>
            </P>
            <P>
              <CircelStep size={20} colors={['#84CAFF', '#00A6FF']} />
              <span>5 students</span>
            </P>
          </Div>
        </Div>
        <Div class="_card three">
          <h1>Events</h1>
          <Div class="flop"></Div>
        </Div>
      </Div>
    </Layout>
  )
}
