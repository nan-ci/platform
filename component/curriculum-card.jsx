import { css } from '../lib/dom'
import { Div } from './elements'
import { NavLink } from './header'

css(`
.curriculum-card {
  border: 3px solid var(--white-lighter);
  padding: 10px;
  cursor: pointer;
  background: var(--grey-lighter);
  margin: 15px 0px;
}
.curriculum-card:hover {
  background: var(--background-lighter);
}
`)

export const CurriculumCard = ({ id, title, hours }) => (
  <a style={{ textDecoration: 'none' }} href={`/cours?moduleName=${title}`}>
    <Div class="curriculum-card">
      <span style={{ fontSize: '1.3rem' }}>
        {title} ({hours} hours)
      </span>
    </Div>
  </a>
)
