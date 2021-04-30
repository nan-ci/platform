import { useState } from 'preact/hooks'
import { equal, Color, Title } from './elements.jsx'
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
input {
  display:inline-block;
  padding:9px;
  line-height:140%;
}
label > .str:focus-within, button:focus {
  background: var(--background-darker);
  outline-color: var(--comment);
}

.str:before, .str:after { content: '"' }

label:hover > .name {
  font-weight: bold;
}

.div-input {
  margin-top: 20px;
}

button {
  background: var(--purple);
  border: 1px solid var(--purple);
  padding: 10px;
  width: auto;
}

button:hover {
  text-shadow: 1px 1px 2px #000;
  outline: 1px dashed;
  cursor: pointer;
  outline-offset: 0.5ch;
}`)

const Comment = ({ children }) => (
  <Color.Comment>
    {'  #'}
    {children}
  </Color.Comment>
)

export const Text = ({ name, value, comment, errors, children, ...props }) => {
  const [val, setVal] = useState(value || '')
  const size = Math.max(val.length || 0, 1)
  const style = props.style || (props.style = {})
  const onInput = ({ target }) => setVal(target.value)
  const onFocus = ({ target }) =>
    setTimeout(
      () =>
        target.selectionStart === target.selectionEnd ||
        target.setSelectionRange(val.length, val.length),
    )

  style.width = `${size}ch`

  const description = errors[name] ? (
    <Comment>
      <Color.Red> Invalid</Color.Red>: {errors[name]}
    </Comment>
  ) : (
    comment && <Comment>{comment}</Comment>
  )

  return (
    <div>
      {description}
      {'\n'}
      <label>
        {'  '}
        <span class="name">{name}</span>
        {equal}
        <span class="str">
          {children}
          <input
            type="text"
            name={name}
            onInput={onInput}
            onFocus={onFocus}
            value={val}
            {...props}
          />
        </span>
      </label>
    </div>
  )
}

export const Form = ({ title, children, submit, ...props }) => (
  <form {...props}>
    {'\n'}
    <Title>{title}</Title>
    {children}
    {submit && (
      <>
        <Color.Comment>{'\n  > '}</Color.Comment>
        <button type="submit">{submit}</button>
        <Color.Comment>{' <'}</Color.Comment>
      </>
    )}
  </form>
)

export const Input = ({
  width,
  type,
  value,
  placeholder,
  onChange,
  required,
}) => {
  return (
    <div class="div-input">
      <input
        class="str"
        type={type}
        value={value}
        size={width}
        placeholder={placeholder}
        onInput={(e) => onChange(e)}
        required={required}
      />
    </div>
  )
}

export const Button = ({ value, type, link, block }) => {
  const onClick = () => {
    document.location.href = link
  }
  return (
    <button
      type={type}
      onClick={onClick}
      style={block ? { width: '100%' } : ''}
    >
      {value}
    </button>
  )
}
