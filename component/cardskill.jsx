import { Div } from './elements.jsx'
import { NavLink, parseColor } from './header.jsx'
import { API } from '../lib/env'
import { css } from '../lib/dom.js'
css(`
.card {
  display: flex;
  flex-flow: column wrap;
  padding: 20px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  border: 15px solid #fff;
  margin-top: 20px;
}
.div-link-card{
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  margin: 10px 0px 0px;
}
li {
  margin: 5px;
}
`)

export const CardSkill = ({ title, roles }) => (
  <Div class="card">
    {title.toUpperCase()}
    <Div class="div-link-card">
      {Object.entries(roles).map(([key, { name, color }]) => (
        <NavLink
          key={key}
          href={`${API}/link/discord?speciality=${key}`}
          icon="Discord"
          style={{ color: parseColor(color) }}
        >
          {name}
        </NavLink>
      ))}
    </Div>
  </Div>
)
