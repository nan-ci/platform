import { Div, P, Span, Link } from '../component/elements.jsx'
import { css } from '../lib/dom.js'
import { MTitle, MLi } from '../component/markdown.jsx'
import notion from '../data/fakeNotion.json'
import { useState } from 'preact/hooks'
import { VideoReader } from '../component/videoReader.jsx'

css(`
  .notion ul li {
    display:block;
    margin:1ch;
    cursor:pointer;
  }
`)
export const Notion = () => {
  const [showLecteur, setShowLecteur] = useState(false)
  const [link, setLink] = useState(null)

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
                setShowLecteur(true)
                setLink(val.link)
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
              }}
            >
              - [🔗-<Span fg="cyan">{val.name}</Span>]
            </li>
          ))}
        </ul>
      </Div>
      <VideoReader
        showLecteur={showLecteur}
        closeLecteur={() => setShowLecteur(false)}
        link={link}
      />
    </>
  )
}
