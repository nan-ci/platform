import { css } from '../lib/dom.js'
import { Div, P, Span } from '../component/elements.jsx'
import exercise from '../data/fakeExercise.json'

css(`
    .exercise h1 {
      font-weight: bolder;
    }

    .exercise>hr {
      width: 100%;
      height: 2px;
      background: grey;
    }

    .exercise h3 {
      font-weight: bolder;
      text-decoration: underline;
    }

    .exercise ul li {
      display: block;
    }

    .exercise .instructions .description {
      padding: 0.3rem;
    }

    .exercise .instructions ul li:before {
      content: '';
      display: inline-block;
      width: 12px;
      height: 12px;
      margin-right: 10px;
      border-radius: 0.5rem;
      background: white;
    }

    .exercise .notions h3 span {
      color: yellow;
    }

    .exercise .notions p {
      padding: 0.3rem;

    .exercise .notions ul li {
      cursor:pointer;
      transition: all .25s ease-in-out;
    }

    .exercise .notions ul li:hover {
      color: skyblue;
      font-weight:bolder;
    }

    .exercise .notions ul li:before {
      content: '';
      display: inline-block;
      width: 12px;
      height: 12px;
      border-radius: 0 10rem 10rem 0;
      background: white;
    }
`)
export const Exercise = () => {
  return (
    <Div class="exercise">
      <h1>🖊 {exercise.name}</h1>
      <hr />
      
      {'\n'}
      <Div class="instructions">
        <h3>Instructions</h3>
        {exercise.description && (
          <P class="description">{exercise.description}</P>
        )}
        {exercise.instructions && (
          <ul>
            {exercise.instructions.map((key) => (
              <li key={key}>{key}</li>
            ))}
          </ul>
        )}
      </Div>
      {'\n'}
      <Div class="notions">
        <h3>
          <span>⚠</span> Warning
        </h3>
        <P>To do this Exercise you should know the following concepts : </P>
        <ul>
          {exercise.notions.map((key) => (
            <li key={key}>{key}</li>
          ))}
        </ul>
      </Div>
      {'\n'}
    </Div>
  )
}
