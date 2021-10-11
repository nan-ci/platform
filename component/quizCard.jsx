import { useEffect, useState } from 'preact/hooks'
import { css } from '../lib/dom.js'
import { Div, Span } from './elements'

css(`
   ._module ._quiz-card {
        padding:0.7rem;
        width: 96%;
       margin: 7px  auto;
       border-radius: 0.4rem;
       display:flex;
       flex-direction:row;
       align-items:center;
       border:2px solid darkgrey;
       justify-content: space-between;
       cursor:not-allowed;
      }

      ._module ._quiz-card.pass {
          border-color: white;
          background: white;
          cursor:pointer;
      }

    ._module ._quiz-card.pass .check {
        background: var(--comment-darker);
        border-color: var(--comment-darker);
    }

    ._module ._quiz-card.pass h4 {
      color: var(--comment-darker);
    }

    ._module ._quiz-card.pass .second_block h3{
      color: var(--comment-darker);
    }


      ._module ._quiz-card.next {
        border:2px solid white;
        cursor:pointer;
      }

      ._module ._quiz-card.next .check {
        border-color: white;
        color: white;
    }

    ._module ._quiz-card.next h4 {
      color: white;
    }

    ._module ._quiz-card.next .second_block h3{
      color: white;
    }



      ._module ._quiz-card .first_block{
        display:flex;
        flex-direction:row;
        align-items:center;
        justify-content: flex-start;
      }

      ._module ._quiz-card .check {
             height: 20px;
             width: 20px;
             border:1px solid darkgrey;
             border-radius: 0.4rem;
      }

      ._module ._quiz-card h4 {
        font-size: 1.2rem;
        margin-left: 10px;
        color: darkgrey;
      }


      ._module ._quiz-card .second_block{
        display:flex;
        flex-direction:row;
        align-items:center;
        justify-content: flex-start;
      }

      ._module ._quiz-card .second_block h3 {
        color: darkgrey;
        font-weight:bolder;
      }

      ._module ._quiz-card .second_block h3:nth-child(1){
           margin-right: 15px;
      }


`)

export const QuizCard = ({ name, prev, data }) => {
  const [info, setInfo] = useState(null)
  useEffect(() => {
    if (data[name]) {
      setInfo({ ...data[name] })
    } else setInfo(null)
  }, [name])

  const isNext = () => {
    const val = Object.keys(data)
    const last = val[val.length - 1]
    return name === last || (name !== last && last === prev)
  }

  const isValidate = () => {
    return data[name]
  }

  return (
    <Div class={`_quiz-card ${isValidate() ? 'pass' : isNext() ? 'next' : ''}`}>
      <Div class="first_block">
        <Div class="check" />
        <h4>{name}</h4>
      </Div>

      {info && (
        <Div class="second_block">
          {info.seconds && <h3> {info.seconds}s</h3>}
        </Div>
      )}
    </Div>
  )
}
