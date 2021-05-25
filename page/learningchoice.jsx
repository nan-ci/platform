import { Div, P } from '../component/elements.jsx'
import { NavLink, parseColor } from '../component/header.jsx'
import { roles } from '../data/discord.js'
import { css } from '../lib/dom.js'
import { API } from '../lib/env.js'

css(`
.div-learning {
  display: flex;
  min-height: 100vh;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
}
.navlink-learning{
  margin: 5px 0px;
}
.navlink-learning:hover{
  background: var(--white);
}
.title-learning{
  font-size: 2.4rem;
  margin: 5px 0px;
}
`)

export const LearningChoice = () => (
  <Div class="div-learning">
    <P class="title-learning">What do you want to learn 📚 ?</P>
    {Object.entries(roles).map(([key, { name, color }]) => (
      <span class="navlink-learning" key={key}>
        <NavLink
          href={`${API}/link/discord?speciality=${key}`}
          style={{ color: parseColor(color), fontSize: 35 }}
        >
          {name}
        </NavLink>
      </span>
    ))}
  </Div>
)
