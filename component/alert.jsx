import { useState } from 'preact/hooks'
import { css } from '../lib/dom.js'
import { Div, P } from './elements.jsx'
import { NotDone } from './icons.jsx'

css(`
.alert-container{
  position: relative;
  padding: .75rem 1.25rem;
  margin: 1rem 0px;
  border: 1px solid transparent;
  border-radius: .25rem;
}
.dismiss-btn{
  position: absolute;
  top: 0;
  right: 0;
  padding: .75rem 1.25rem;
  color: inherit;
  outline: none;
  cursor: pointer;
}
`)

export const Alert = ({ alert, message, color }) => {
  const onClose = () => (document.getElementById('co').style.display = 'none')
  return alert ? (
    <Div
      id="co"
      style={{ backgroundColor: `${color}` }}
      class="alert-container"
    >
      <button onClick={onClose} class="dismiss-btn">
        <i class="fa fa-close"></i>
      </button>
      <P>{message}</P>
    </Div>
  ) : null
}
