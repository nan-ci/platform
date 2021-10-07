import { useState } from 'preact/hooks'
import { css } from '../../lib/dom.js'
import { Div, P, Span } from '../../component/elements.jsx'
import { Input } from '../../component/form.jsx'
import { Layout } from '../../component/layout.jsx'

css(`
    ._module {

    }

    ._module h1 {
      font-size: 3rem;
    }

    ._module>p {
        font-size: 1.2rem;
        color: darkgrey;
        margin-top: 20px;
    }

    ._module>h3 {
       margin: 15px auto;
       font-size: 1.3rem;
    }
    ._module ul {
      list-style: square !important;
      list-style-type:circle;
    }
    ._module ul li {
      display:inherit;
      font-weight:bolder;
      font-size: 1.2rem;
      margin: 5px auto;
    }

    ._module ul li:before {
      content: "";
      display:inline-block;
      width:15px;
      height:15px;
      background-color: white;
      border-radius: 25rem;
    }

    ._module>h2{
      font-size: 2rem;
      font-weight:bolder;
      margin-top: 20px;
    }

    ._module .exercises_content {
      display:flex;
      flex-direction:column;
      align-items:flex-start;
      justify-conten:flex-start;
      margin-top: 7px;
    }

    ._module  .exercise_card {
      display:flex;
      align-items:center;
      justify-content: flex-start;
      width: 100%;
      padding: 0.5rem;
      border-radius: 0.5rem;
      margin: 5px auto;
    }

    ._module .exercise_card .check {
      display:block;
      width: 20px;
      height: 20px;
      border-radius: 25rem;
    }

    ._module .exercise_card  p {
      margin-left: 10px;
      font-size: 1.3rem;
    }

    ._module .exercise_card.done {
      background: white;
      cursor:pointer;
    }

    ._module .exercise_card.done p {
      color: var(--comment-darker);
      font-weight:bolder;
    }

    ._module .exercise_card.done .check {
        background: var(--comment-darker);
    }

    ._module .exercise_card.next {
       border: 2px solid white;
       cursor:pointer;
    }

    ._module .exercise_card.next p {
      color: white;
    }

    ._module .exercise_card.next .check {
      border: 1px solid white;
  }

    ._module .exercise_card.lock {
      border: 2px solid grey;
      cursor:not-allowed;
    }

    ._module .exercise_card.lock p {
      color: grey;
    }

    ._module .exercise_card.lock .check {
        border: 1px solid grey;
    }
`)

export const Module = () => {
  const [err, setErr] = useState({})

  const mockExercisesValidate = [
    { name: 'A better World', seconds: 20, attempt: 2 },
    { name: 'Always Love', seconds: 10, attempt: 7 },
  ]

  const mockExercice = [
    'A better World',
    'Always Love',
    'Great Song',
    'Understand world',
    'Greeting',
  ]

  const isValidate = (val) => {
    return mockExercisesValidate.find((e) => e.name === val)
  }

  const isNext = (name) => {
    let last = mockExercisesValidate[mockExercisesValidate.length - 1].name
    let nextInd = mockExercice.findIndex((name) => name === last) + 1
    return mockExercice[nextInd] === name
  }

  return (
    <Layout>
      <Div class="_module">
        <h1> JS-Intro </h1>
        <P>
          {' '}
          this module is an introduction of the javascript language . Lorem
          ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
          Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem
          ipsum Lorem ipsum Lorem ipsum Lorem ipsum
        </P>
        <h3> In this module, you will learn : </h3>
        <ul>
          <li> variables </li>
          <li> data types </li>
          <li> Hosting </li>
        </ul>
        <h2>Exercises</h2>
        <Div class="exercises_content">
          {mockExercice.map((mock) => (
            <Div
              class={`exercise_card ${
                isValidate(mock) ? 'done' : isNext(mock) ? 'next' : 'lock'
              }`}
              key={mock}
            >
              <Div class={`check`} />
              <P>{mock}</P>
            </Div>
          ))}
        </Div>
      </Div>
    </Layout>
  )
}
