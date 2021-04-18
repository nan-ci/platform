import { useState } from 'preact/hooks'
import { equal, divider, Color } from './elements.jsx'
import { css } from '../lib/dom.js'

css(`
input { outline: none }
.str, button {
  background: var(--background-dark);
  border-radius: 0.3ch;
  outline-color: var(--background-dark);
  outline-style: solid;
  outline-width: 0.25ch;
}
.str {
  outline-offset: -0.1ch;
}

input, .str {
  color: var(--yellow);
}

label > .str:focus-within, button:focus {
  background: var(--background-darker);
  outline-color: var(--comment);
}

.str:before, .str:after { content: '"' }

button:hover {
  text-shadow: 1px 1px 2px #000;
  outline: 1px dashed;
  outline-offset: 0.5ch;
}`)

export const Text = ({ name, comment, errors, ...props }) => {
  const [size, setSize] = useState(Math.max(props.value?.length || 0, 1))

  const updateSize = ({ target }) => setSize(Math.max(target.value.length, 1))
  const style = props.style || (props.style = {})
  style.width = `${size}ch`

  const description = errors[name]
    ? <Color.comment>{'  #'}<Color.red> Invalid</Color.red>: {errors[name]}</Color.comment>
    : comment && <Color.comment>{`  # ${comment}`}</Color.comment>


  return (
    <div>
      {description}
      {'\n'}
      <label>
        {`  ${name}`}
        {equal}
        <span class="str">
          <input type="text" name={name} oninput={updateSize} {...props} />
        </span>
      </label>
    </div>
  )
}

export const Form = ({ title, children, submit, ...props }) => (
  <form {...props}>
    {'\n'}
    <Color.purple>{title}:</Color.purple>
    {'\n'}
    {children}
    {submit && (
      <>
        <Color.comment>{'\n  > '}</Color.comment>
        <button type="submit">[{submit}]</button>
        <Color.comment>{' <'}</Color.comment>
      </>
    )}
  </form>
)
