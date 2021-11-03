import { Div, P, Span, Link } from '../component/elements.jsx'
import { css } from '../lib/dom.js'
import { MTitle, MLi } from '../component/markdown.jsx'
import notion from '../data/fakeNotion.json'
import { useState } from 'preact/hooks'
import { Reader } from '../component/reader.jsx'

css(`
  .notion ul li {
    display:block;
    margin:1ch;
    cursor:pointer;
  }
   
`)
export const Notion = () => {
  const [show, setShow] = useState(false);
  const [readerData, setReaderData] = useState(null)
  const [isVideo,setIsVideo] = useState(null);

  return (
    <>
      <Div class="notion">
        <MTitle.h2>{notion.name}</MTitle.h2>
        {'\n'}
        <MTitle.h3> Description </MTitle.h3>
        {'\n'}
        <P>
          {' '}
          <Span fg="orange"> > </Span> {notion.description}
        </P>
        {'\n'}
        <MTitle.h3> Videos </MTitle.h3>
        <ul class="videos">
          {notion.videos.map((val) => (
            <li
              key={val.name}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setShow(true)
                setReaderData(val)
                setIsVideo(true);
              }}
            >
              - [📹-<Span fg="cyan-darker">{val.name}</Span>]
            </li>
          ))}
        </ul>
        {'\n'}
        <MTitle.h3> Links </MTitle.h3>
        <ul class="links">
          {notion.links.map((val) => (
            <li
              key={val.name}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                 setShow(true)
                setReaderData(val)
                setIsVideo(false);
              }}
            >
              - [🔗-<Span fg="cyan">{val.name}</Span>]
            </li>
          ))}
        </ul>
      </Div>
      <Reader
        show={show}
        close={() => setShow(false)}
        {...readerData}
        list={notion.videos}
        isVideo={isVideo}
      />
    </>
  )
}
