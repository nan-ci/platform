import { useState } from 'preact/hooks'
import { css } from '../../lib/dom.js'
import { Div, P, Span } from '../../component/elements.jsx'
import { Input } from '../../component/form.jsx'
import { Layout } from '../../component/layout.jsx'

css(`
      ._exercise h1 {
        color:white;
        font-size: 1.8rem;
        border-bottom:1px solid grey;
      }

      ._exercise>p {
        display:block;
        margin-top: 18px;
      }
`)

export const Exercise = () => {
  const [err, setErr] = useState({})

  return (
    <Layout>
      <Div class="_exercise">
        <h1> A better World </h1>
        <P>
          {' '}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus id
          est sem. Pellentesque a iaculis mi. Praesent a sem pharetra tellus
          sodales consectetur. Proin id felis at arcu commodo accumsan et vel
        </P>
        <Div class="instructions"></Div>
        <br />
        <br />
        <p>```js console.log("amen"); ```</p>
      </Div>
    </Layout>
  )
}
