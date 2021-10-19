import { css } from '../lib/dom.js'
import { Div, Span } from '../component/elements.jsx'

css(`
  .module .stackli {
      padding: 0.5rem;
      border-radius: 0.5rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      border: 2px solid grey;
      margin: 10px auto;
      cursor: not-allowed;
  }

  .module .stackli span {
    color: grey;
    font-weight: bolder;
  }

  .module .stackli.pass {
    border-color: white;
    background: white;
    cursor: pointer;
  }

  .module .stackli.next {
    border-color: white;
    cursor: pointer;
  }

  .module .stackli.pass span {
    color: var(--comment-darker);
  }

  .module .stackli.next span {
    color: white;
  }

  .module .stackli div  {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start
  }

  .module .stackli span.emoji {
    margin-right: 15px;
  }

 .module .stackli span.name  {
   font-weight: bolder;
 }

 .module .stackli span.attempts {
   margin-right: 10px;
 }
`)

export const StackLi = ({ name, type, result, isActive }) => {
  
  const iconType = {
    quiz: '📚',
    exercise: '🖊',
  }

  return (
    <li class={`stackli ${isActive ? 'next' : result ? 'pass' : ''}`}>
      <Div class="first_block">
        <Span class="emoji">{iconType[type]}</Span>
        <Span class="name">{name}</Span>
      </Div>
      {result && (
        <Div class="second_block">
          <Span class="attempts">{result.attempts}-attempts</Span>
          {result.seconds && (
            <Span class="seconds">{result.seconds}-seconds</Span>
          )}
        </Div>
      )}
    </li>
  )
}
