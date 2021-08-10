import { css } from '../lib/dom'
import { Div } from './elements'

css(`
.loader{
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border: 10px solid;
  border-top: 10px solid;
  animation: spinner 1s ease infinite;
}
@keyframes spinner {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
`)

export const Spinner = ({ color }) => {
  return <Div class="loader" style={{ borderTopColor: color }}></Div>
}
