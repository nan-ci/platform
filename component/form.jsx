import { useState } from 'preact/hooks'
import { Div } from './elements.jsx'
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

label > .str:focus-within, button:focus {
  background: var(--background-darker);
  outline-color: var(--comment);
}

.str:before, .str:after { content: '"' }

label:hover > .name {
  font-weight: bold;
}

button:hover {
  text-shadow: 1px 1px 2px #000;
  outline: 1px dashed;
  outline-offset: 0.5ch;
}

.row{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.fieldset {
      border: 1px solid var(--comment-dark);
      padding: 1rem;
      marginTop: 20px;
      position:relative;
  }
  .fieldset legend {
    background: var(--comment-darker);
    padding: 0.4rem;
    border-radius: 0.5rem;
  }
`)

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

export const Input = ({
  name,
  value,
  comment,
  errors,
  type,
  divStyle,
  inputType,
  children,
  ...props
}) => {
  const [val, setVal] = useState(value || '')
  const onInput = ({ target }) => setVal(target.value)
  const onFocus = ({ target }) =>
    setTimeout(
      () =>
        target.selectionStart === target.selectionEnd ||
        target.setSelectionRange(val.length, val.length),
    )

  const description = errors[name] ? (
    <Title>
      <Color.Red> # Invalid</Color.Red>: {errors[name]}
    </Title>
  ) : (
    comment && <Title>{comment}</Title>
  )

  return (
    <div style={divStyle}>
      {description}
      {'\n'}
      {inputType === 'input' && (
        <input
          type={type}
          name={name}
          onInput={onInput}
          onFocus={onFocus}
          value={val}
          {...props}
        />
      )}
      {inputType === 'textarea' && (
        <textarea
          type={type}
          name={name}
          onInput={onInput}
          value={val}
          {...props}
        ></textarea>
      )}
      {inputType === 'select' && (
        <select name={name} onChange={onInput} value={val} {...props}>
          {children}
        </select>
      )}
    </div>
  )
}

export const Fieldset = ({ legend, children, ...props }) => {
  return (
    <fieldset class="fieldset" {...props}>
      <legend>{legend}</legend>
      {children}
    </fieldset>
  )
}

export const Row = ({ children }) => {
  return <Div class="row">{children}</Div>
}

export const Form = ({
  title,
  children,
  submit,
  onSubmit,
  buttonClassName,
  ...props
}) => {
  return (
    <form {...props} onSubmit={onSubmit}>
      {children}
      {'\n'}
      {submit && (
        <button type="submit" class={buttonClassName}>
          {submit}
        </button>
      )}
    </form>
  )
}
