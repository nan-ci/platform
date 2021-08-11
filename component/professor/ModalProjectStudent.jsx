import { Div, P } from '../elements.jsx'
import { useEffect, useState } from 'preact/hooks'
import { API } from '../../lib/env.js'
import { css } from '../../lib/dom.js'
import { Table } from '../table.jsx'

css(`
.prof-projects-modalProjectStudent {
  width: 700px;
  background: black;
  position:absolute;
  top:20%;
  left:25%;
  right:25%;
  transform:translate(-50%,-50%);
  border:2px solid blue;
  padding-bottom: 2rem;
  padding: 0.5rem;
  border-radius:0.5rem;
  text-align:center;
  transform:scale(0);
  transition: all .2s ease-in-out;
}

.prof-projects-modalProjectStudent button.close {
  width: 40px;
  padding: 0.5rem;
  font-size: 20px;
  background: red;
  border:none;
  border-radius:2rem;
  position: absolute;
  right: -20px;
  top: -20px;
  outline: none;
 cursor:pointer;
}

.prof-projects-modalProjectStudent h1 {
   font-size: 1.5rem;
   text-decoration: underline;
}

.prof-projects-modalProjectStudent span {
     color: grey;
     font-weight:bolder;
     display:block;
     margin-top: 10px;
}

.prof-projects-modalProjectStudent .descript {
  margin-top: 16px;
  color: grey;
}

.prof-projects-modalProjectStudent table td button {
  padding: 0.5rem;
  background: var(--comment-darker);
  outline: none;
  cursor:pointer;
  border-radius: 0.5rem;
}

.prof-projects-modalProjectStudent table td input {
  padding: 0.5rem;
  width: 100%;
}

/* Chrome, Safari, Edge, Opera */
.prof-projects-modalProjectStudent table td  input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
.prof-projects-modalProjectStudent table td input[type=number] {
  -moz-appearance: textfield;
}


.prof-projects-modalProjectStudent table td input[type=number]::placeholder {
    color: grey;
    font-weight:bolder;
}

`)

export const ModalProjectStudent = ({ show, close, project, students }) => {
  const [data, setData] = useState([
    {
      student: 'koffi rameaux',
      project_link: 'https://www.googlecom',
      note: null,
      canShowInput: false,
    },
    {
      student: 'kouamé anges',
      project_link: 'https://www.googlecom',
      note: null,
      canShowInput: false,
    },
    {
      student: 'kouassi marc',
      project_link: 'https://www.googlecom',
      note: null,
      canShowInput: false,
    },
  ])

  const columns = Object.entries({
    student: {
      size: '20%',
      bgcolor: '#444',
      color: 'transparent',
    },
    project_link: {
      size: '20%',
      bgcolor: '#444',
      color: 'transparent',
    },
    note: {
      size: '20%',
      bgcolor: '#444',
      color: 'transparent',
    },
  })

  useEffect(() => {
    if (show) {
      document.querySelector(
        '.prof-projects-modalProjectStudent',
      ).style.transform = 'scale(1)'
    }
  }, [show])

  const showInput = (index) => {
    data[index].canShowInput = true
    setData([...data])
  }

  const updateNote = (e, index) => {
    e.preventDefault()
    if (parseInt(e.target.value) > 20) e.target.value = ''
    if (e.keyCode === 13) {
      data[index].note = parseInt(e.target.value)
      setData([...data])
    }
  }

  return (
    <Div class="prof-projects-modalProjectStudent">
      <button
        class="close"
        onClick={() => {
          document.querySelector(
            '.prof-projects-modalProjectStudent',
          ).style.transform = 'scale(0)'
          setTimeout(() => close(), 200)
        }}
      >
        &times;
      </button>
      <h1>Results Project ({project.name})</h1>
      <P class="descript">{project.description}</P>
      <br />
      <table class="table-nan">
        <tr>
          {columns.map((data) => {
            return (
              <th
                key={data[0]}
                width={data[1].size}
                style={{ background: data[1].bgcolor }}
              >
                {data[0]}
              </th>
            )
          })}
        </tr>
        {data.map((val, index) => {
          return (
            <tr key={val.student}>
              {columns.map((row) => {
                if (row[0] === 'project_link')
                  return (
                    <td>
                      <a href={val[row[0]]} target="_blank">
                        {val[row[0]]}
                      </a>
                    </td>
                  )
                else if (
                  row[0] !== 'note' ||
                  (row[0] === 'note' && val[row[0]])
                )
                  return <td>{val[row[0]]}</td>
                else
                  return (
                    <td>
                      {!val.canShowInput ? (
                        <button onClick={() => showInput(index)}>
                          {' '}
                          add note{' '}
                        </button>
                      ) : (
                        <input
                          type="number"
                          autofocus
                          placeholder="Enter a number"
                          class={`input${index}`}
                          max="20"
                          onKeyUp={(e) => updateNote(e, index)}
                        />
                      )}
                    </td>
                  )
              })}
            </tr>
          )
        })}
      </table>
    </Div>
  )
}
