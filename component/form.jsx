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
  <form class="form" {...props}>
    {children}
  </form>
)

export const InputGroup = ({children,labelText,labelForAttr}) => {
  return <div class="input-group">
      <label for={labelForAttr}>{labelText}</label>
      {children}
  </div>
};

export const Input = ({
  type,
  value,
  placeholder,
  onChange,
  required,
  ...rest
}) => {
  return (
      <input

       {...rest}
       class="str"
        type={type}
        value={value}
        placeholder={placeholder}
        onInput={(e) => onChange(e)}
        required={required}
      />
  )
}

export const Button = ({ value, type, link, icon,...rest }) => {
  const onClick = (e) => {
    e.preventDefault();
    document.location.href = link
  }
  return (
    <button type={type} onClick={onClick} {...rest}>
      {value}
    </button>
  )
}
