import { Div, P } from '../elements.jsx'
import { useEffect } from 'preact/hooks'
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
    font-size: 1.4rem;
    text-decoration: underline;
}



`)
export const ModalStudent = ({ show, close, student, data, dataType }) => {
  useEffect(() => {
    if (show) {
      document.querySelector('.prof-student-modalStudent').style.transform =
        'scale(1)'
    }
  }, [show])

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
        <h1>
          {student.name} {student.lastname}
        </h1>
        <h4>{dataType} results</h4>
      </Div>
    </Div>
  )
}
