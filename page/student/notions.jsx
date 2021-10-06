import { useState } from 'preact/hooks'
import { css } from '../../lib/dom.js'
import { Div, P, Span } from '../../component/elements.jsx'
import { Input } from '../../component/form.jsx'
import { Layout } from '../../component/layout.jsx'

css(`
      .notions{
        width: 100%;
        height: auto;
      }
      .notions h1 {
        text-align:center;
        font-size: 2rem;
        text-decoration:underline;
      }

      .notions .input-content {
        display:flex;
        flex-direction:row;
        align-items: center;
        justify-content: flex-end;
      }


      .notions .search_input {
        padding: 0.4rem;
        background: grey;
        color: white;
        border-radius: 0.4rem;
        margin: 10px 25px;
      }

      .notions .search_input::placeholder{
        color: white;
      }
      .notions .notions_content {
        display:flex;
        flex-direction:row;
        align-items:center;
        justify-content: flex-start;
        flex-wrap:wrap;
        width: 100%;
      }
      .notions .notion_card {
        background:black;
        padding: 0.6rem;
        width: 210px;
        cursor:pointer;
        border-radius: 0.8rem;
        margin: 5px;
      }

      .notions .notion_card h3 {
          font-size: 2rem;
      }

      .notions .notion_card>span {
        color: grey;
        font-size: 0.9rem;
        display:block;
        margin-top: 8px;
      }

       .notions .notion_card>p,.notions .notion_card p span {
         color: darkgrey;
         font-weight:bolder;
       }

       .notions .notion_card>p{
          margin-top: 5px;
       }
`)

export const Notions = () => {
  const [err, setErr] = useState({})
  return (
    <Layout>
      <Div class="notions">
        <h1> The Notions</h1>
        <br />
        <Div class="input-content">
          <Input
            class="search_input"
            inputType="input"
            type="search"
            name="search"
            placeholder="Search an notion"
            value=""
            errors={err}
            updateErrors={setErr}
          />
        </Div>
        <Div class="notions_content">
          {new Array(4).fill('d').map((d) => (
            <Div class="notion_card" key={d}>
              <h3>Loop</h3>
              <Span>here you will learn to check some thing</Span>
              <P>
                <span>hours</span> : 4h
              </P>
            </Div>
          ))}
        </Div>
      </Div>
    </Layout>
  )
}
