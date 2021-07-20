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
}`)

const Comment = ({ children }) => (
  <Color.Comment>
    {'  #'}
    {children}
  </Color.Comment>
)

export const Select = ({
  name,
  value,
  comment,
  errors,
  children,
  ...props
}) => {
  const [val, setVal] = useState(value || '')
  const size = Math.max(val.length || 0, 1)
  console.log('size', size)
  const onInput = ({ target }) => setVal(target.value)
  const style = props.style || (props.style = {})
  style.width = `300px`
  style.border = '2px solid white'
  style.padding = '0.3rem'
  style.background = 'none'
  style.borderRadius = '0.3rem'

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
      {'\n\n'}
      <select name={name} onChange={onInput} value={val} {...props}>
        {children}
      </select>
    </div>
  )
}
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
  children,
  ...props
}) => {
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

  style.width = `300px`
  style.border = '2px solid var(--white)'
  style.padding = '0.3rem'
  style.background = 'none'
  style.borderRadius = '0.3rem'
  style.outline = 'none'
  type === 'textarea' ? (style.height = '100px') : null

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
      {'\n\n'}
      <label></label>
      {type !== 'textarea' ? (
        <input
          type={type}
          name={name}
          onInput={onInput}
          onFocus={onFocus}
          value={val}
          {...props}
        />
      ) : (
        <textarea
          type={type}
          name={name}
          onInput={onInput}
          value={val}
          {...props}
        ></textarea>
      )}
    </div>
  )
}

export const Form = ({ title, children, submit, onSubmit, ...props }) => {
  return (
    <form {...props} onSubmit={onSubmit}>
      {'\n'}
      <Title>{title}</Title>
      {'\n'}
      {children}
      {'\n'}
      {submit && (
        <button
          type="submit"
          style={{
            background: '#6070a4',
            color: 'white',
            padding: '0.6rem',
            width: '250px',
            margin: '0 auto',
            textAlign: 'center',
            fontWeight: 'bolder',
            borderRadius: '5px',
          }}
        >
          {submit}
        </button>
      )}
    </form>
  )
}
