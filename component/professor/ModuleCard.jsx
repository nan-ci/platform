import { Div, P } from '../elements.jsx'
import { css } from '../../lib/dom.js'
import { Module } from '../icons'
import { navigate } from '../../lib/router.js'

css(`
   .prof-cours-moduleCard {
     position:relative;
      width: 100%;
      height: auto;
      padding: 0.5rem;
      padding-bottom: 1rem;
      border: 1px solid #444;
      border-radius: 0.7rem;
      background:#7675530d;
      margin: 20px 0px;
      cursor:pointer;
      transition: all .2s ease-in-out;
   }

   prof-cours-moduleCard .container{
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:flex-start;
    border-radius: 0.5rem;
   }


   .prof-cours-moduleCard svg {
     width:20%;
   }

   .prof-cours-moduleCard .left_block{
     position: relative;
     width: 80%;
     padding: 0 0.6rem;
   }

   .prof-cours-moduleCard .left_block h1{
      font-size: 2rem;
      font-weight:bolder;
  }

  .prof-cours-moduleCard .left_block p{
    margin-top: 6px;
    white-space:normal
  }


  .prof-cours-moduleCard .left_block p span{
     color: white;
  }

  .prof-cours-moduleCard  .buttons_group{
    position: absolute;
    bottom: 5px;
    right: 5px;
    font-weight:bolder;
  }

  .prof-cours-moduleCard  .buttons_group button{
    padding: 0.5rem;
    margin: 5px;
    cursor:pointer;
    font-weight:normal;
    border-radius:0.4rem;
    outline:none;
  }

`)

export const ModuleCard = ({ data, courses, projects, setModuleToUpdate }) => {
  const { id, name, description, hours, codeColor } = data
  return (
    <Div
      class="prof-cours-moduleCard"
      style={{ background: codeColor }}
      onClick={() => navigate('/professor/module-cours/' + id)}
    >
      <Div class="container">
        <Module size={90} color="white" />
        <Div class="left_block">
          <h1>{name}</h1>
          <P>
            <span>Description : </span>
            {description.length > 110
              ? description.slice(0, 110) + '...'
              : description}
          </P>
          <P>
            <span>Hours to learn : </span>
            {hours}
          </P>
          <P>
            <span> courses : </span> {courses}
          </P>
          <P>
            <span> projects : </span> {projects}
          </P>
        </Div>
      </Div>
      <Div class="buttons_group">
        <button
          style={{ background: 'dodgerblue' }}
          onClick={(e) => {
            e.stopPropagation()
            setModuleToUpdate(data)
          }}
        >
          {' '}
          Modify{' '}
        </button>
        <button
          style={{ background: 'var(--red-darker)' }}
          onClick={(e) => {
            e.stopPropagation()
            setModuleToUpdate(data, 'delete')
          }}
        >
          {' '}
          Delete{' '}
        </button>
      </Div>
    </Div>
  )
}
