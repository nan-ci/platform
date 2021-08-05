import { Div, P } from '../elements.jsx'
import { css } from '../../lib/dom.js'
import { Module } from '../icons'
import { navigate } from '../../lib/router.js'

css(`
   .prof-cours-moduleCard {
      width: 100%;
      height: auto;
      padding: 0.5rem;
      border: 1px solid #444;
      background:#7675530d;
      margin: 20px 0px;
      display:flex;
      flex-direction:row;
      align-items:center;
      justify-content:flex-start;
      border-radius: 0.5rem;
      cursor:pointer;
      transition: all .2s ease-in-out;
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

  .prof-cours-moduleCard .left_block .buttons_group{
    float: right;
    margin-top: 20px;
    bottom: 5px;
    font-weight:bolder;
  }

  .prof-cours-moduleCard .left_block .buttons_group button{
    padding: 0.5rem;
    margin: 5px;
    cursor:pointer;
    font-weight:normal;
    border-radius:0.4rem;
    outline:none;
  }

`)

export const ModuleCard = ({
  data: { id, name, description, hours, projects },
  setModuleToUpdate,
}) => {
  const courses = sessionStorage.getItem('courses')
    ? JSON.parse(sessionStorage.getItem('courses'))
    : []
  return (
    <Div
      class="prof-cours-moduleCard"
      onClick={() => navigate('/professor/module-cours/' + name)}
    >
      <Module size={90} color="white" />
      <Div class="left_block">
        <h1>{name}</h1>
        <P>
          <span style={{ color: 'grey' }}>Description : </span>
          {description.length > 110
            ? description.slice(0, 110) + '...'
            : description}
        </P>
        <P>
          <span style={{ color: 'grey' }}>Hours to learn : </span>
          {hours}
        </P>
        <P>
          <span style={{ color: 'grey' }}> courses : </span>{' '}
          {courses.filter((c) => c.idModule === id).length}
        </P>
        <P>
          <span style={{ color: 'grey' }}> projects : </span> {projects.length}
        </P>
        <Div class="buttons_group">
          <button
            style={{ background: 'dodgerblue' }}
            onClick={(e) => {
              e.stopPropagation()
              setModuleToUpdate(id)
            }}
          >
            {' '}
            Modify{' '}
          </button>
          <button
            style={{ background: 'var(--red-darker)' }}
            onClick={(e) => {
              e.stopPropagation()
              setModuleToUpdate(id, 'delete')
            }}
          >
            {' '}
            Delete{' '}
          </button>
        </Div>
      </Div>
    </Div>
  )
}
