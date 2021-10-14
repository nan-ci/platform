import { css } from '../lib/dom.js'
import { useState, useEffect } from 'preact/hooks'
import { Div, P, Span, Main } from '../component/elements.jsx'
import exercise from '../data/fakeExercise.json'
import { Editor } from '../component/editor.jsx'

css(`
    .exercise {
       width: 100%;
       height: auto;
    }

    .exercise>h1 {
      font-size: 2rem;
    }

    .exercise>hr {
      width: 100%;
      height: 2px;
      background: grey;
      margin: 7px auto;
    }

    .exercise h3 {
      font-size: 1.7rem;
      font-weight: bolder;
    }

    .exercise  li {
      display: block;
      margin: 5px auto;
      transition: all 0.5s ease-in-out;
    }

    .exercise .instructions {
      margin: 16px auto;
    }

    .exercise .instructions ul {
       margin-left: 15px;
    }

    .exercise .instructions li {
    }

    .exercise .instructions li:before {
      content: '👉';
      font-size: 1.2rem;
      margin-right: 9px;
      font-weight: bolder;
    }

    .exercise .notions {
      margin: 20px auto;
      padding:0.5rem;
      background: grey;
      border-radius: 0.5rem;
      background: #201717;
    }

    .exercise .notions h3{
      margin-top: -10px;
    }

    .exercise .notions h3 span {
       font-size: 2.7rem;
       color: yellow;
    }

    .exercise .notions p {
        font-size: 1.1rem;
    }

    .exercise .notions ul {
        background: red;
        text-align:left;
        width:0;
    }

    .exercise .notions ul li {
      cursor: pointer;
      background: grey;
    }

    .exercise .notions ul li:before {
      content:'🔗';
      font-size:1.2rem;
    }

    .exercise .notions ul li:hover{
          transform: scale(1.2);
          color: skyblue;
          font-weight: bloder;
    }

    .exercise  p.description {
      font-size: 1.1rem;
      color: darkgrey;
      margin: 7px auto;
      white-space: normal !important;
      padding: 0.9rem;
      background: #1e2029;
      border-radius: 0.3rem;
    }

`)

export const Exercise = () => {
  return (
    <Main>
      <section class="exercise">
        <h1>&#x270D; {exercise.name} </h1>
        <hr />
        <P class="description">{exercise.description}</P>
        <Div class="instructions">
          <h3>&#x1F4C4; Instructions </h3>
          <ul>
            {exercise.instructions.map((ins) => (
              <li key={ins}>{ins}</li>
            ))}
          </ul>
        </Div>
        <Div class="notions">
          <h3>
            <span>⚠</span> Warning{' '}
          </h3>
          <P>
            to do this exercise , you should know those following concepts :
          </P>
          <ul>
            {exercise.notions.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </Div>
        <Editor
          value={exercise.defaultContent}
          mode="javascript"
          height={'260px'}
          tests={exercise.tests}
          randomClass={`editor${Math.floor(Math.random() * 10000) + 100}`}
          onChange={(val) => null}
          onBeforeChange={(e) => null}
        />
      </section>
    </Main>
  )
}
