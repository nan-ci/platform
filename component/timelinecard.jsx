import { css } from '../lib/dom.js'
import * as Icons from './icons.jsx'

css(`
.timeline-card {
  border: 3px dashed;
  width: 15em;
  height: 6em;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
}
.subcontent {

}
`)

export const TimelineCard = ({
  title,
  children,
  borderColor,
  bgColor,
  ...props
}) => {
  return (
    <div class="timeline-card" style={borderColor ? { borderColor } : ''}>
      <section>
        <span>{title}</span>
      </section>
      {children}
    </div>
  )
}
