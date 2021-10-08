import { useEffect, useRef, useState } from 'preact/hooks'
import { css } from '../../lib/dom.js'
import { Div, P, Span } from '../../component/elements.jsx'
import { Layout } from '../../component/layout.jsx'
import { Editor } from '../../component/editor.jsx'

css(`
      ._exercise h1 {
        color:white;
        font-size: 1.8rem;
      }

      ._exercise h4 {
        font-size: 1.6rem;
        font-weight:bolder;
        margin-top: 20px;
      }
      ._exercise>p {
        display:block;
        margin-top: 18px;
      }

      ._exercise .instructions ul {
        list-style: square !important;
        list-style-type:circle;
        margin-left: 20px;
      }
      ._exercise .instructions ul li {
        display:inherit;
        font-weight:bolder;
        font-size: 1.2rem;
        margin: 20px auto;
        display:block;
        flex-direction:column;
        align-items:flex-start;
        justify-content: flex-start;
      }

      ._exercise .instructions ul li:before {
        content: "";
        display:inline-block;
        width:15px;
        height:15px;
        background-color: white;
        border-radius: 25rem;
      }

`)

export const Exercise = () => {
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
        <h4>Instructions</h4>
        <Div class="instructions">
          <ul>
            <li>
              <span> lorem ipsum</span>
            </li>
            <li>
              <span> lorem ipsum</span>
              <Editor
                randomId={`editor${Math.floor(Math.random() * 99999 + 7)}`}
                readOnly
                value={"const Arrays = ['cool', 'drive']"}
                mode="javascript"
              />
            </li>
            <li>
              <span> lorem ipsum</span>
            </li>
            <li>
              <span> lorem ipsum</span>
              <Editor
                randomId={`editor${Math.floor(Math.random() * 99999 + 7)}`}
                readOnly
                value={"const Arrays = ['cool', 'drive']"}
                mode="javascript"
              />
            </li>
          </ul>
        </Div>
        <Div class="editor_content">
          <Editor
            randomId={`editor${Math.floor(Math.random() * 99999 + 7)}`}
            value="function(){console.log('testing')}"
            mode="javascript"
          />
        </Div>
      </Div>
    </Layout>
  )
}
