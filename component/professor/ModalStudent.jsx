import { Div, P } from '../elements.jsx'
import { useEffect } from 'preact/hooks'
import { API } from '../../lib/env.js'
import { css } from '../../lib/dom.js'

css(`
.prof-student-modalStudent {
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

.prof-student-modalStudent button.close {
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

.prof-student-modalStudent .body h1 {
  font-size: 2rem;
  font-weight: bolder;
}

.prof-student-modalStudent .body h4 {
    color: darkgrey;
    margin-top: 5px;
    margin-bottom: 20px;
    font-size: 1.4rem;
    text-decoration: underline;
}



`)
export const ModalStudent = ({ show, close, name, data, dataType }) => {
  useEffect(() => {
    if (show) {
      document.querySelector('.prof-student-modalStudent').style.transform =
        'scale(1)'
    }
  }, [show])

  // useEffect(async () => {
  //   let resp = null
  //   if (dataType === 'quizzes') {
  //     resp = await fetch(`${API}/professor/quizzes`)
  //   } else if (dataType === 'kata') {
  //     resp = await fetch(`${API}/professor/quizzes`)
  //   } else {
  //     resp = await fetch(`${API}/professor/projects`)
  //   }
  //   resp = await resp.json()
  //   console.log('data', resp)
  // }, [student.name, dataType])

  return (
    <Div class="prof-student-modalStudent">
      <button
        class="close"
        onClick={() => {
          document.querySelector('.prof-student-modalStudent').style.transform =
            'scale(0)'
          setTimeout(() => close(), 200)
        }}
      >
        &times;
      </button>
      <Div class="body">
        <h1>{name}</h1>
        <h4>{dataType} results</h4>
        <table class="table-nan" style={{ width: '100%' }}>
          <tr>
            <th
              style={{
                width:
                  dataType === 'projects' || dataType === 'kata'
                    ? '33%'
                    : '25%',
              }}
            >
              name
            </th>
            <th
              style={{
                width:
                  dataType === 'projects' || dataType === 'kata'
                    ? '33%'
                    : '25%',
              }}
            >
              {' '}
              {dataType === 'projects'
                ? 'project_link'
                : dataType === 'quizzes'
                ? 'questions_found'
                : 'description'}{' '}
            </th>
            <th
              style={{
                width:
                  dataType === 'projects' || dataType === 'kata'
                    ? '33%'
                    : '25%',
              }}
            >
              {dataType === 'projects'
                ? 'note'
                : dataType === 'quizzes'
                ? 'percent'
                : 'valid'}
            </th>
            {dataType === 'quizzes' && <th style={{ width: '25%' }}>status</th>}
          </tr>
          {data.map((val) => {
            return (
              <tr>
                <>
                  {['a', 'b', 'c'].map((v, index) => {
                    if (index === 0) return <td>{val.name}</td>
                    if (index === 1)
                      return (
                        <td>
                          {dataType === 'projects'
                            ? val.project_link
                            : dataType === 'quizzes'
                            ? val.questions_found
                            : val.description}
                        </td>
                      )
                    if (index === 2)
                      return (
                        <td>
                          {dataType === 'projects'
                            ? val.note
                            : dataType === 'quizzes'
                            ? val.percent
                            : val.valid}
                        </td>
                      )
                  })}
                  {dataType === 'quizzes' && <td>{val.status}</td>}
                </>
              </tr>
            )
          })}
        </table>
      </Div>
    </Div>
  )
}
