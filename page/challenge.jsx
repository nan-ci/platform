import { useState, useEffect } from 'preact/hooks'
import { Layout } from '../component/layout.jsx'
import { Card } from '../component/card.jsx'
import { quizz } from '../data/quizz.js'
import { css } from '../lib/dom.js'

css(`
.container-card{
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
}
`)

export const Challenge = (props) => {
  const [data, setData] = useState([])

  useEffect(() => setData(quizz), [])

  return (
    <Layout>
      <span>List of challenges</span>
      <div class="container-card">
        {data.map((item) => (
          <Card key={item.title} challenge={item} {...props}/>
        ))}
      </div>
    </Layout>
  )
}
