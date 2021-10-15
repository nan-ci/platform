import { useEffect, useState, useRef } from 'preact/hooks'
import { css } from '../lib/dom'
import { Div } from './elements.jsx'
import { ParserApi } from '../lib/parser_api'
import { fromTextArea } from 'codemirror'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/keymap/sublime.js'

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
  justify-content:flex-start;
  align-items:center;
}

.editor .editor_buttons span {
  margin: 10px;
  display:block;
  font-size:1.1rem;

}

.editor .buttons button {
  padding: 0.5rem;
  border-radius:0.3rem;
  cursor:pointer;
  margin: 10px;
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

`)

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
  const [message, setMessage] = useState({ type: '', message: '' })
  const [pass, setPass] = useState(false)

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

            .${randomClass} .content {
                height: ${isReadOnly && !height ? 'auto' : height} !important;
                width:100%;
                background: blue;
                position:relative;
            }

            .${randomClass} .CodeMirror {
              height: ${isReadOnly && !height ? 'auto' : height} !important;
              padding:0.5rem;
              overflow-x:hidden;
            }

          .${randomClass} .message {
            width:100%;
            padding:0.6rem;
            position:absolute;
            right: -100%;
            bottom:0;
            opacity:0;
            transition:all 0.25s ease-in-out;
            z-index:9;
          }

          .${randomClass} .message.error {
            background:red;
            right:0;
            opacity:1;
          }

          .${randomClass} .message.pass {
            background:green;
            right:0;
            opacity:1;
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

  const parseResult = (str) => {
    console.log('' + str)
    return ('' + str).replace(/\[[0-9]+m/gi, '').trim()
  }

  const runCode = async (type) => {
    setOnLoad(true)
    editor.options.readOnly = true
    const Tests = type === 'test' ? tests.filter((t) => t.type === type) : tests
    let error = false
    await Promise.all(
      Tests.map(async (t) => {
        if (!error) {
          const resp = await ParserApi({
            lang: mode,
            version: '1.7.5',
            args: t.args,
            content: editor.doc.getValue(),
          })
          console.log('resp', resp)
          if (resp.message || (resp.run && resp.run.stderr)) {
            error = true
            editor.options.readOnly = false
            setMessage({
              type: 'error',
              message: !resp.run ? resp.message : resp.run.stderr,
            })
            setOnLoad(false)
            setTimeout(() => {
              setMessage({ ...message, type: '' })
            }, 4000)
          } else if (
            resp.run.output &&
            parseResult(resp.run.output) !== t.expected
          ) {
            error = true
            editor.options.readOnly = false
            setMessage({
              type: 'error',
              message: `your function return the value ${parseResult(
                resp.run.output,
              )} expected ${t.expected}`,
            })
            console.log(
              t.expected,
              parseResult(resp.run.output).trim(),
              t.expected != parseResult(resp.run.output).trim(),
            )
            setOnLoad(false)
            setTimeout(() => {
              setMessage({ ...message, type: '' })
            }, 4000)
          } else if (
            type === 'test' &&
            resp.run.output &&
            parseResult(resp.run.output) === t.expected
          ) {
            error = true
            editor.options.readOnly = false
            setOnLoad(false)
            setMessage({
              type: 'pass',
              message: `resultat : ${parseResult(resp.run.output)}`,
            })
            setTimeout(() => {
              setMessage({ ...message, type: '' })
            }, 4000)
          }
        }
      }),
    )
    if (!error && type !== 'test') {
      setMessage({ type: 'pass', message: 'pass' })
      setPass(true)
      setTimeout(() => {
        setMessage({ ...message, type: '' })
      }, 4000)
    }
  }

  return (
    <Div class={`editor ${randomClass}`}>
      {!isReadOnly && (
        <>
          <h3>&#x1F9D1;&#x200D;&#x1F4BB; Editor </h3>
          <hr />
        </>
      )}
      <div class="content">
        <input type="textarea" value={value} />
        {!isReadOnly && (
          <Div class={`message ${message.type}`}>{message.message}</Div>
        )}
      </div>
      {!isReadOnly && (
        <Div class="buttons">
          <Div class="editor_buttons">
            <button class="test" onClick={() => !onLoad && runCode('test')}>
              run test
            </button>
            <button class="submit" onClick={() => !onLoad && runCode('run')}>
              submit
            </button>
            {onLoad && <span> loading ... </span>}
          </Div>
          <button class="next">next</button>
        </Div>
      )}
    </Div>
  )
}
