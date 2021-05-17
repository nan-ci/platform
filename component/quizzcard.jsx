import { useState } from 'preact/hooks'
import { css } from '../lib/dom.js'
css(`
.quizz-card {
  background-color: var(--background-lighter);
  padding: 5rem 2rem 2rem;
  border-radius: 5px;
  position: relative;
  min-width: 47%;
  margin: 15px;
}
  .quizz-badge {
    position: absolute;
    width: 4rem;
    height: 4rem;
    border-radius: 5px;
    background-color: var(--comment-light);
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    top: -2rem;
    left: 2rem;
  }

.quizz-title {
  color: var(--red-light);
  font-size: 2em;
}
.quizz-span {
  font-size: 1.6em;
}
.quizz-response {
  display: flex;
  flex-flow: column wrap;
  margin-top: 1rem;
}
.quizz-label {
  padding: 0.6rem;
}
`)

export const QuizzCard = ({ quizz, index }) => {
  const [response, setResponse] = useState({ response: '' })
  const handleChange = (e) => {
    setResponse({ ...response, [e.target.name]: e.target.value })
  }
  const handleSubmit = (event) => {
    event.preventDefault()
  }
  return (
    <div class="quizz-card">
      <div class="quizz-badge">{index + 1}</div>
      <p class="quizz-title">{quizz.title}</p>

      <form onSubmit={handleSubmit} class="quizz-response">
        {quizz.options.map((item) => (
          <label class="quizz-label">
            <span class="quizz-span">{item.label}</span>
            <input
              type="radio"
              checked={response.response === item.label}
              name="response"
              value={item.label}
              onChange={handleChange}
            />
          </label>
        ))}
      </form>
    </div>
  )
}
