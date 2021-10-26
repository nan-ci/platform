import { css } from '../lib/dom.js'
import { Div, Span } from '../component/elements.jsx'

css(`
  .module .stackli {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      cursor: not-allowed;
  }

  .module .stackli span {
    color: grey;
  }

  .module .stackli.pass {
    color: white;
    cursor: pointer;
  }

  .module .stackli.next {
    border-color: white;
    cursor: pointer;
  }

  .module .stackli.pass span {
    color: white;
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

  .module .stackli div.second_block {
    margin-left: 1ch;
  }

  .module .stackli div.second_block .seconds {
    margin-left: 1ch;
  }
`)

export const StackLi = ({ name, type, result, isActive }) => {
  const iconType = {
    quiz: '📚',
    exercise: '🖊',
  }

  return (
    <>
      <li class={`stackli ${isActive ? 'next' : result ? 'pass' : ''}`}>
        <Div class="first_block">
          <Span class="emoji">{iconType[type]}</Span>-&nbsp;
          <Span class="name">{name}</Span>
        </Div>
        {result && (
          <Div class="second_block">
            (<Span class="attempts">{result.attempts}-attempts</Span>
            {result.seconds && (
              <Span class="seconds">{result.seconds}-seconds</Span>
            )}
            )
          </Div>
        )}
      </li>
    </>
  )
}
