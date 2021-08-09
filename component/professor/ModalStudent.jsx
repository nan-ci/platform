import { Div, P } from '../elements.jsx'
import { css } from '../../lib/dom.js'

css(`
.prof-student-modalStudent {
  width: 900px;
  background: black;
  position:absolute;
  top:20%;
  left:20%;
  right:20%;
  transform:translate(-50%,-50%);
  border:2px solid blue;
  padding-bottom: 2rem;
  border-radius:0.5rem;
  transform:scale(1);
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



`)
export const ModalStudent = () => {
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
    </Div>
  )
}
