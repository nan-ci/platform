import { Div, P } from '../elements.jsx'
import { css } from '../../lib/dom.js'
import { useEffect } from 'preact/hooks';

css(`
   .prof-cours-deleteCourseModal {
     width: 400px;
     background: black;
     position:absolute;
     top:20%;
     left:40%;
     right:40%;
     transform:translate(-50%,-50%);
     border:2px solid red;
     border-radius:0.5rem;
     text-align:center;
     transform:scale(0);
     padding: 0.8rem;
     transition: all .2s ease-in-out;
   }

   .prof-cours-deleteCourseModal button.close {
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

  .prof-cours-deleteCourseModal h1 {
     font-size: 1.5rem;
     font-weight:bolder;
  }

  .prof-cours-deleteCourseModal button.delete {
    margin-top: 20px;
    padding: 0.5rem;
    font-size: 20px;
    background: red;
    border:none;
    border-radius:0.4rem;
    outline: none;
   cursor:pointer;
  }


`)

export const DeleteCourseModal = ({ show, name, close, updateCourses }) => {
  useEffect(() => {
    if (show) {
      document.querySelector('.prof-cours-deleteCourseModal').style.transform =
        'scale(1)'
    }
  }, [show])

  const Delete = () => {
    updateCourses((modles) => {
      modles.splice(
        modles.findIndex((m) => m.name === name),
        1,
      )
      sessionStorage.setItem('courses', JSON.stringify(modles))
      return { ...modles }
    })
    document.querySelector('.prof-cours-deleteCourseModal').style.transform =
      'scale(0)'
    setTimeout(() => close(), 200)
  }

  return (
    <Div class="prof-cours-deleteCourseModal">
      <button
        class="close"
        onClick={() => {
          document.querySelector(
            '.prof-cours-deleteCourseModal',
          ).style.transform = 'scale(0)'
          setTimeout(() => close(), 200)
        }}
      >
        &times;
      </button>
      <h1>Do you want really delete the course {name} ??</h1>
      <button onClick={() => Delete()} class="delete">
        {' '}
        yes{' '}
      </button>
    </Div>
  )
}
