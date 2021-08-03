import { Div, P } from '../elements.jsx'
import { css } from '../../lib/dom.js'
import { Course } from '../icons'

css(`
   .prof-cours-courseCard {
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
   .prof-cours-courseCard:hover{
     border: 2px solid #444;
   }


   .prof-cours-courseCard svg {
     width:20%;
   }

   .prof-cours-courseCard .left_block{
     position: relative;
     width: 80%;
     padding: 0 0.6rem;
   }

   .prof-cours-courseCard .left_block h1{
      font-size: 2rem;
      font-weight:bolder;
  }

  .prof-cours-courseCard .left_block p{
    margin-top: 6px;
    white-space:normal
  }

  .prof-cours-courseCard .left_block .buttons_group{
    float: right;
    margin-top: 20px;
    bottom: 5px;
    font-weight:bolder;
  }

  .prof-cours-courseCard .left_block .buttons_group button{
    padding: 0.5rem;
    margin: 5px;
    cursor:pointer;
    border-radius:0.4rem;
    outline:none;
  }

`)

export const CourseCard = ({
  data: { id, name, description, link, ressources },
  setCourseToUpdate,
}) => {
  return (
    <Div class="prof-cours-courseCard">
      <Course size={90} color="white" />
      <Div class="left_block">
        <h1>{name}</h1>
        <P>
          <span style={{ color: 'grey' }}>Description : </span>
          {description.length > 110
            ? description.slice(0, 110) + '...'
            : description}
        </P>
        <P>
          <span style={{ color: 'grey' }}>link: </span>
          {link}
        </P>
        <P>
          <span style={{ color: 'grey' }}>ressources:</span>
          {ressources.length}
        </P>
        <Div class="buttons_group">
          <button
            style={{ background: 'dodgerblue' }}
            onClick={() => setCourseToUpdate(id)}
          >
            {' '}
            Modify{' '}
          </button>
          <button
            style={{ background: 'var(--red-darker)' }}
            onClick={() => setCourseToUpdate(id, 'delete')}
          >
            {' '}
            Delete{' '}
          </button>
        </Div>
      </Div>
    </Div>
  )
}
