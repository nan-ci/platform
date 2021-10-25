import { css } from '../lib/dom.js'
import { Div, P } from '../component/elements.jsx'
import { MTitle, MItalicWord, MLi, Warning } from '../component/markdown.jsx'
import exercise from '../data/fakeExercise.json'

css(`
    .exercise h1 {
      font-weight: bolder;
    }

    .exercise h3 {
      font-weight: bolder;
    }

    .exercise .instructions .description {
      padding: 0.3rem;
    }

    .exercise .notions p {
      padding: 0.3rem;
    }
`)
export const Exercise = () => {
  return (
    <Div class="exercise">
      <MTitle.h2>{exercise.name}</MTitle.h2>
      {'\n'}
      <Div class="instructions">
        <MTitle.h3>Instructions</MTitle.h3>
        {'\n'}
        {exercise.description && (
          <P class="description">{exercise.description}</P>
        )}
        {'\n'}
        {exercise.instructions && (
          <ul>
            {exercise.instructions.map((key) => (
              <MLi key={key}>{key}</MLi>
            ))}
          </ul>
        )}
      </Div>
      {'\n'}
      <Div class="notions">
        <MTitle.h3>Warning</MTitle.h3>
        {'\n'}
        <Warning>
          <MItalicWord color="red">
            To do this Exercise you should know the following concepts :
          </MItalicWord>
          {'\n'}
          <ul>
            {exercise.notions.map(({ name, link }) => (
              <MLi key={name} link={link}>
                {name}
              </MLi>
            ))}
          </ul>
        </Warning>
      </Div>
      {'\n'}
    </Div>
  )
}
