import { css } from '../lib/dom'
import { Div } from '../component/elements.jsx'
import { Main } from '../component/elements.jsx'
import { NotionCard } from '../component/notion_card.jsx'
import ressources from '../data/fakeRessources.json'
import { MTitle } from '../component/markdown.jsx'

css(`
   .container {
     display: flex;
     align-items: center;
     justify-content: space-between;
     flex-wrap:wrap;
   }
`)

export const Notions = () => {
  const notions = Object.entries(ressources)
  return (
    <Div cass="notions">
      <MTitle.h2>Notions</MTitle.h2>
      {'\n'}
      <Div class="container">
        {notions.map(([name, data]) => {
          return <NotionCard name={name} {...data} />
        })}
      </Div>
    </Div>
  )
}
