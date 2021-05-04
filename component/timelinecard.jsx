import { css } from '../lib/dom.js'
import { Img } from './image.jsx'

css(`
.nan-timeline-card {
  border: 2px dashed var(--background-lighter);
  border-radius: 6px;
  padding: 2rem;
  margin-bottom: 2rem;
  display: flex;
  width: 23em;
}
.nan-timeline-card-body {
  display: flex;
  flex-flow: column wrap;
  font-size: 2rem;
  padding: 0px 10px;
}
`)

export const TimelineCard = ({ data }) => {
  return (
    <div class="nan-timeline-card">
      <Img source={data.icon} alt="icons" size={50} />
      <div class="nan-timeline-card-body">
        <span>{data.number}</span>
        <small>{data.title}</small>
      </div>
    </div>
  )
}
