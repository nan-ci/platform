import { useEffect, useState } from 'preact/hooks'
import { css } from '../lib/dom'
import { Div } from './elements.jsx'
import { ParserApi } from '../lib/parser_api'
import { fromTextArea } from 'codemirror'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/keymap/sublime.js'

export const Editor = ({
  isReadOnly,
  randomClass,
  value,
  mode,
  height,
  tests,
  onChange,
  onBeforeChange,
}) => {
  const [editor, setEditor] = useState(null)
  const [onLoad, setOnLoad] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    setEditor(
      fromTextArea(document.querySelector('.editor input[type="textarea"]'), {
        mode,
        theme: 'material-darker',
        KeyMap: 'sublime',
        smartIndent: true,
        tabSize: 2,
        readOnly: isReadOnly ? true : false,
        lineNumbers: isReadOnly ? false : true,
      }),
    )

    css(`
          .editor {
            width:100%;
            height:auto;
            padding:0.3rem;
          }

          .editor h3 {
            font-weight:bolder;
            margin-bottom:10px;
          }

          .editor>hr {
            width:60%;
            height:2px;
             background: grey;
             margin-bottom: 10px;
          }

          .editor .buttons {
            display:flex;
            flex-direction: row;
            align-items:center;
            justify-content: space-between;
            margin-top: 5px;
          }
          .editor .buttons .editor_buttons {
            display:flex;
            width: 190px;
            flex-direction:row;
            justify-content:space-between;
            align-items:center;
          }

          .editor .buttons button {
            padding: 0.5rem;
            border-radius:0.3rem;
            cursor:pointer;
          }

          .editor button.test {
            background: var(--background-lighter);
          }

          .editor button.test:hover{
            background: var(--background-light);
          }

          .editor button.submit {
            background: var(--red-darker);
          }

          .editor button.submit:hover {
            background: var(--red-light);
          }


          .editor button.next {
            background:grey;
            cursor:not-allowed;
          }

          .${randomClass} .CodeMirror {
             height: ${isReadOnly && !height ? 'auto' : height} !important;
             padding:0.5rem;
             overflow-x:hidden;
          }
    `)
  }, [])

  useEffect(() => {
    if (editor) {
      editor.save()

      editor.on('beforeChange', (e) => {
        onBeforeChange && onBeforeChange(e)
      })

      editor.on('change', (e) => {
        onChange && onChange(e.doc.getValue(''))
      })
    }
  }, [editor])

  const runCode = async (type) => {
    setOnLoad(true)
    const Tests = type === 'test' ? tests.filter((t) => t.type === type) : tests
    let error = ''
    await Promise.all(
      Tests.map(async (t) => {
        if (!error) {
          const resp = await ParserApi({
            lang: mode,
            version: '1.7.5',
            args: t.args,
            content: editor.doc.getValue(),
          })
          if (
            resp.run.stderr ||
            (!resp.run.stderr &&
              resp.run.output &&
              resp.run.output.split('\n').join('').trim() !== t.expected)
          ) {
            console.log('resp', resp)
            error = resp.run.stderr
              ? resp.run.stderr
              : ` your function return the value ${resp.run.output
                  .split('\n')
                  .join('')
                  .trim()} expected ${t.expected}`
          }
        }
      }),
    )
    if (error) {
      console.log('erreur', error)
      setError(error)
    }
    setOnLoad(false)
  }

  return (
    <Div class={`editor ${randomClass}`}>
      {!isReadOnly && (
        <>
          <h3>&#x1F9D1;&#x200D;&#x1F4BB; Editor </h3>
          <hr />
        </>
      )}
      <input type="textarea" value={value} />
      {!isReadOnly && (
        <Div class="buttons">
          <Div class="editor_buttons">
            <button class="test" onClick={() => runCode('test')}>
              run test
            </button>
            <button class="submit"> submit </button>
            {onLoad && <h2> loading ... </h2>}
          </Div>
          <button class="next">next</button>
        </Div>
      )}
    </Div>
  )
}
