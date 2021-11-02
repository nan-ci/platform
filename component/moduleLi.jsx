import { css } from '../lib/dom'
import { navigate } from '../lib/router'
import { P, Span } from './elements'
import { NavLink } from './header.jsx'

css(`
  .module-li {
    display:block;
    cursor:pointer;
    margin:1ch;
    padding:0.2ch;
    display:flex;
    width: 100%;
    flex-direction:row;
    align-items:center;
    justify-conternt: space-around;
    cursor:not-allowed;
  }

  .module-li p {
    margin-right:1ch;
    width:30%;
    color: grey;
  }

  .module-li span {
    margin-right:1ch;
    color:grey;
  }

  .module-li.pass {
    cursor:pointer;
  }

  .module-li.pass p{
    color: white;
  }

  .module-li.pass span {
    color:white;
  }


`)

export const ModuleLi = ({
  name,
  language,
  exercises,
  quizzes,
  isPassed,
  isActive,
  results,
}) => {
  return (
    <NavLink
      class={`module-li ${isPassed || isActive ? 'pass' : ''}`}
      href={(isPassed || isActive) && '/module/' + name}
      style={{
        outline: !isPassed && !isActive && 'none',
        textDecoration: 'none',
      }}
      removeTiret
    >
      <P>📕 - {name}</P>
      <Span>
        <Span bg="selection">
          [{results ? results.exercises : 0}/{exercises} exos done]
        </Span>
      </Span>
      <Span>
        <Span bg="selection">
          [{results ? results.quizzes : 0}/{quizzes} quizzes done]
        </Span>
      </Span>
    </NavLink>
  )
}
