import { useEffect, useRef, useState } from 'preact/hooks'
import { css } from '../../lib/dom.js'
import { Div, P, Span } from '../../component/elements.jsx'
import { Layout } from '../../component/layout.jsx'
import { Input } from '../../component/form.jsx'
import CodeMirror from 'codemirror'
import '../../lib/codemirror.css'
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
  const editorRef = useRef(null)
  const textAreaRef = useRef(null)

  useEffect(() => {
    const Code = CodeMirror.fromTextArea(
      document.querySelector('textarea[name="code"]'),
      {
        mode: 'javascript',
        theme: 'neo',
        keyMap: 'sublime',
        tabSize: 2,
        lineNumbers: true,
        indentWithTabs: false,
        scrollbarStyle: 'null',
        // extraKeys: { 'Ctrl-S': run, 'Cmd-S': run, 'Ctrl-Enter': run }
      },
    )
    console.log('ref', Code)
  }, [])

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
        <Input
          ref={textAreaRef}
          inputType="textarea"
          name="code"
          value="function code() {}"
          errors={err}
          updateErrors={setErr}
        />
        <Div class="editor" ref={editorRef} />
      </Div>
    </Layout>
  )
}
