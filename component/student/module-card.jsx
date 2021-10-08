import { css } from '../../lib/dom'
import { getUserLevel } from '../../lib/user'
import { Div, P } from '../elements.jsx'
import { NavLink } from '../header.jsx'
import { useState } from 'preact/hooks'
import { VideoPlay } from '../icons.jsx'
import { navigate } from '../../lib/router'

css(`
.cur-content {
  margin-bottom:5px;
  transition:all 0.5s ease-in-out;
  margin: 5px 10px 10px 0px;
}
.cur-content.show header .header-info{
  color: var(--white);
}
.cur-content header {
  padding: 0.5rem;
  border-bottom: 1px solid var(--white);
  margin-bottom: 10px;
  cursor:pointer;
  display:flex;
  transition:all 0.5s ease-in-out;
}
.cur-content header.addpadding{
  padding: 1rem;
}
.cur-div-contain {
  width: 100%;
 height:0px;
  transition: all 0.5s ease-in-out;
  overflow:hidden;
}

.cur-div-contain h1 {
  color:var(--red-darker);
  font-size:1.5rem;
  font-weight:bolder;
  margin-left:10px;
}
.cur-div-contain p {
  color:var(--white);
  font-size:1rem;
  margin-left:10px;
  margin-top:5px;
}
`)

export const ModuleCard = ({
  id,
  name,
  exercises,
  solved,
  remain,
  userLevel,
  setCours,
}) => {
  const dat = userLevel && getUserLevel(userLevel)
  return (
    <>
      <Div
        class={`cur-content`}
        style={{ background: 'transparent' }}
        onClick={() => navigate('/student/module')}
      >
        <header>
          <strong>
            <span style={{ color: 'var(--white)' }}>{name} : </span>
          </strong>
          <P class="header-info">
            {' '}
            {exercises} exercises - {solved} solved - {remain} remain
          </P>
        </header>
      </Div>
    </>
  )
}
