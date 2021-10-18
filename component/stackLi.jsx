import { css } from '../lib/dom.js'
import { Span } from './elements'

css(`
  .module .stackli {
      padding: 0.5rem;
      border-radius: 0.5rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      border: 2px solid white;
      margin: 10px auto;
  }
  .module .stackli span.square {
      width:  20px;
      height: 20px;
      background: white;
      border-radius: 0.3rem;
      margin-right: 15px;
  }

  .module .stackli span.circle {
    width:20px;
    height:20px;
    border-radius: 5rem;
    background: white;
    margin-right: 15px;
  }

 .module .stackli span.name  {
   font-size: 1.2rem;
   font-weight: bolder;
 }
`)

export const StackLi = ({ data: { type, name } }) => {
  return (
    <li class="stackli">
      <Span class={`${type === 'exercise' ? 'square' : 'circle'}`} />
      <Span class="name">{name}</Span>
    </li>
  )
}
