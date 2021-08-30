import { Div, P } from '../elements.jsx'
import { css } from '../../lib/dom.js'
import { API } from '../../lib/env.js'
import { useEffect } from 'preact/hooks'
css(`
   .prof-cours-deleteModal {
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

   .prof-cours-deleteModal button.close {
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

  .prof-cours-deleteModal h1 {
     font-size: 1.5rem;
     font-weight:bolder;
  }

  .prof-cours-deleteModal button.delete {
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

export const DeleteModal = ({
  show,
  moduleId,
  id,
  message,
  type,
  close,
  data,
  update,
}) => {
  useEffect(() => {
    if (show) {
      document.querySelector('.prof-cours-deleteModal').style.transform =
        'scale(1)'
    }
  }, [show])

  const Delete = async () => {
    const resp = await (
      await fetch(`${API}/professor/${type}?key=${id}&del=true`)
    ).json()
    if (resp.message === 'ok') {
      data.splice(
        data.findIndex((d) => d.id === id),
        1,
      )
      update([...data])
      document.querySelector('.prof-cours-deleteModal').style.transform =
        'scale(0)'
      setTimeout(() => close(), 200)
    }
  }

  return (
    <Div class="prof-cours-deleteModal">
      <button
        class="close"
        onClick={() => {
          document.querySelector('.prof-cours-deleteModal').style.transform =
            'scale(0)'
          setTimeout(() => close(), 200)
        }}
      >
        &times;
      </button>
      <h1> {message} </h1>
      <button onClick={() => Delete()} class="delete">
        yes
      </button>
    </Div>
  )
}
