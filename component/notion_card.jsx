import { Div, P, Span } from './elements'
import { css } from '../lib/dom'

css(`
    .notion_card {
        border:2px dashed var(--comment-darker);
        width: 200px;
        padding: 0.6rem;
        cursor:pointer;
        margin: 5px;
    }

    .notion_card>h3 {
      font-weight:bolder;
    }
    .notion_card p {
      white-space:normal !important;
      color:darkgrey;
      font-weight:normal;
    }
`)

export const NotionCard = ({ name, videos, links, description }) => {
  return (
    <>
      {' '}
      <Div class="notion_card">
        <h3>{name}</h3>
        <P fg="grey">{description.slice(0, 14)} ...</P>
        <Div>
          <Span fg="white">
            <strong>videos</strong>:{videos.length}
          </Span>{' '}
          &nbsp;
          <Span fg="white">
            <strong>links</strong>:{links.length}
          </Span>
        </Div>
      </Div>{' '}
    </>
  )
}
