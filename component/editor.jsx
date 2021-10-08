import { useEffect, useRef, useState } from 'preact/hooks'
import { css } from '../lib/dom.js'
import { Div, P, Span } from './elements.jsx'

css(`
._editor {
  height: auto;
  margin-top: 10px;
}
._editor .buttons {
  width: 100%;
  height: auto;
  padding:0.5rem;
  display:flex;
  flex-direction: row;
  align-items:center;
  justify-content: flex-end;
  margin-top: 20px;
}

._editor>h1 {
     border:none !important;
}

._editor  .buttons button {
    padding: 0.6rem;
    margin: 5px;
    cursor:pointer;
    outline: none;
    border-radius: 0.5rem;
}

._editor  .buttons button.submit {
   background:var(--comment-darker);
}

._editor  .buttons button.test {
  background: var(--red-darker);
}
`)

export const Editor = ({ readOnly, randomId, height, mode, value }) => {
  useEffect(() => {
    console.log('readonly', randomId, readOnly)
    if (randomId)
      css(`
        ._editor.${randomId}{
          background: #0f111a;
          width: ${readOnly ? 'auto' : '100%'} !important;
        }

        ._editor.${randomId} .CodeMirror {
          padding: ${readOnly ? '1rem' : '0.3rem'} !important;
          width: ${readOnly ? 'auto' : '100%'} !important;
          height: ${height && !readOnly ? height : 'auto'} !important;
        }


     `)
  }, [height, readOnly, randomId])

  useEffect(() => {
    console.log('val', randomId)
    if (randomId) {
      CodeMirror.fromTextArea(
        document.querySelector(
          `  ._editor.${randomId} input[type="textarea"][name="code"]`,
        ),
        {
          mode,
          theme: 'material-ocean',
          lineNumbers: !readOnly ? true : false,
          indentUnit: 2,
          smartIndent: true,
          indentWithTabs: false,
          readOnly: !readOnly ? false : true,
          autoCloseBrackets: true,
          autocompilation: true,
          scrollbarStyle: 'null',
        },
      )
    }
  }, [readOnly, randomId])

  return (
    <>
      {!readOnly && <h1>Editor</h1>}
      <Div class={`_editor ${randomId}`}>
        <input type="textarea" name="code" value={value} />
        {!readOnly && (
          <div class="buttons">
            <button class="test"> run test </button>
            <button class="submit"> submit </button>
          </div>
        )}
      </Div>
    </>
  )
}
