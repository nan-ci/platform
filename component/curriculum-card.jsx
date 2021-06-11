import { css } from '../lib/dom'
import { getUserLevel } from '../lib/user'
import { Div } from './elements'

css(`
.curriculum-card {
  border: 3px solid var(--white-lighter);
  padding: 10px;
  cursor: pointer;
  background: var(--grey-lighter);
  margin: 15px 0px;
}
.curriculum-card.unlock:hover {
  background: var(--background-lighter);
}
.curriculum-card.lock {
  background:#444343;
  border:1px solid grey;
}
.curriculum-card.lock span {
  color:grey
}
`)

export const CurriculumCard = ({ id, title, hours, userLevel }) => {
  const { level } = getUserLevel(userLevel)
  return (
    <a
      style={{ textDecoration: 'none' }}
      href={level >= id && `/cours?moduleName=${title}`}
    >
      <Div class={`curriculum-card ${level >= id ? 'unlock' : 'lock'}`}>
        <span style={{ fontSize: '1.3rem' }}>
          {title} ({hours} hours)
        </span>
        {level < id && (
          <span
            style={{ float: 'right', marginTop: '5px', fontWeight: 'bolder' }}
          >
            Locked
          </span>
        )}
      </Div>
    </a>
  )
}
