import { css } from '../lib/dom.js'
import { Div, P } from '../component/elements.jsx'
import { StackLi } from '../component/stackLi.jsx'

css(`
   .module h1 {
     font-size: 2rem;
     font-weight: bolder;
    }

   .module p.description {
     white-space: normal !important;
     font-size: 1.2rem;
     padding: 0.5rem;
     margin: 10px auto;
  }

  .module p.title{
    font-size: 1.2rem;
    font-weight: bolder;
  }

  .module ul li {
    display: block;
  }

  .module ul.notions {
    margin-left: 20px;
  }

  .module ul.notions li{
    margin: 8px auto;
  }

  .module ul.notions li:before {
     content:  "👉";
     font-size: 1.1rem;
     margin-right: 10px;
  }

  .module .stack-content {
    margin-top: 25px;
  }

  .module .stack-content h3 {
    font-size: 2.5rem;
    font-weight: bolder;
  }

  .module ul.stack{
    height: 400px;
    width: 100%;
    overflow-x: hidden;
  }
`)

const fakeModule = {
  name: 'JS Basics',
  description:
    'this  module talk about the basics  programmation in javascript',
  notions: ['variables', 'data types', 'operators', 'condition', 'iteraction'],
  exercises: [
    '01-Hello There',
    '02-Anything to Declare',
    '03-Good Search',
    '05-Redeclaration of Love',
    '06-Duplicate',
  ],
  quizzes: ['04-World of DOM', '07-Cool'],
  configs: {
    display: [
      { name: '01-hello There', type: 'exercise' },
      { name: '02-Anything to Declare', type: 'exercise' },
      { name: '03-Good Search', type: 'exercise' },
      { name: '04-World of DOM', type: 'quiz' },
      { name: '05-Redeclaration Love', type: 'exercise' },
      { name: '06-Duplicate', type: 'exercise' },
      { name: '07-cool', type: 'quiz' },
    ],
  },
}

export const Module = () => {
  return (
    <Div class="module">
      <h1> {fakeModule.name}</h1>
      <P class="description">{fakeModule.description}</P>
      <P class="title"> In this module you will learn : </P>
      <ul class="notions">
        {fakeModule.notions.map((n) => (
          <li>{n}</li>
        ))}
      </ul>
      <Div class="stack-content">
        <h3> Exercises </h3>
        <ul class="stack">
          {fakeModule.configs.display.map((s) => (
            <StackLi key={s.name} data={s} />
          ))}
        </ul>
      </Div>
    </Div>
  )
}
