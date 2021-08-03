import { Div, P } from '../elements.jsx'
import { css } from '../../lib/dom.js'
import { useEffect } from 'preact/hooks'
css(`
   .prof-cours-deleteModuleModal {
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

   .prof-cours-deleteModuleModal button.close {
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

  .prof-cours-deleteModuleModal h1 {
     font-size: 1.5rem;
     font-weight:bolder;
  }

  .prof-cours-deleteModuleModal button.delete {
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

export const DeleteModuleModal = ({ show, name, close, updateModules }) => {
  useEffect(() => {
    if (show) {
      document.querySelector('.prof-cours-deleteModuleModal').style.transform =
        'scale(1)'
    }
  }, [show])

  const Delete = () => {
    updateModules((modles) => {
      modles.splice(
        modles.findIndex((m) => m.name === name),
        1,
      )
      sessionStorage.setItem('modules', JSON.stringify(modles))
      return { ...modles }
    })
    document.querySelector('.prof-cours-deleteModuleModal').style.transform =
      'scale(0)'
    setTimeout(() => close(), 200)
  }

  return (
    <Div class="prof-cours-deleteModuleModal">
      <button
        class="close"
        onClick={() => {
          document.querySelector(
            '.prof-cours-deleteModuleModal',
          ).style.transform = 'scale(0)'
          setTimeout(() => close(), 200)
        }}
      >
        &times;
      </button>
      <h1>Do you want really delete the module {name} ??</h1>
      <button onClick={() => Delete()} class="delete">
        {' '}
        yes{' '}
      </button>
    </Div>
  )
}
