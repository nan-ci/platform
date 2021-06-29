import { css } from '../lib/dom'
import { getUserLevel } from '../lib/user'
import { Div, P } from './elements'
import { NavLink } from './header'
import { useState } from 'preact/hooks'
import { VideoPlay } from './icons'

css(`

.cur-content {
  margin-bottom:5px;
  transition:all 0.5s ease-in-out;
}

.cur-content.show {
  border-radius:1rem;
}

.cur-content.show header .header-info{
  color:black;
}

.cur-content header {
   padding: 0.5rem;
   border-bottom: 1px solid #5f5f5f;
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

.cur-div-contain.show {
    height:auto;
    padding:1rem;
}




.cur-div-contain h1 {
    color:black;
    font-size:1.5rem;
    font-weight:bolder;
    font-family:Arial-black;
    margin-left:10px;
}

.cur-div-contain p {
  color:black;
  font-size:1rem;
  margin-left:10px;
  width:350px;
  margin-top:10px;
}

.cur-div-contain .lessons {
  width: 100%;
  height:auto;
  margin-top:20px;
}

.cur-div-contain .lessons .cours {
  width:100%;
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content:space-between;
  border-top:1px solid #5f5f5f;
  padding: 0.3rem;
  outline:none;
  cursor:pointer;
}
.cur-div-contain .lessons .cours div {
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content:flex-start
}
.cur-div-contain .lessons .cours  i{
   font-size:2rem;
   color:black;
}

.cur-div-contain .lessons .cours  .title{
  font-size:1.3rem;
  color:black;
  margin-left:7px;
  cursor:pointer;
}

.cur-div-contain .lessons .cours .time {
  color:black;
}


`)

export const CurriculumCard = ({
  id,
  title,
  description,
  codeColor,
  hours,
  cours,
  userLevel,
  setCours,
}) => {
  const dat = userLevel && getUserLevel(userLevel)
  const [showCard, setShowCard] = useState(false)
  return (
    <>
      <Div
        class={`cur-content ${showCard && 'show'}`}
        style={{ background: showCard ? codeColor : 'transparent' }}
      >
        <header
          onClick={() => userLevel && setShowCard(!showCard)}
          class={showCard && 'addpadding'}
        >
          <strong>
            <span style={{ color: '#2c5282' }}>Module {id}</span>
            {!showCard && (
              <>
                &nbsp;<span>{title}</span>
              </>
            )}
          </strong>
          <P class="header-info">
            {' '}
            - {cours.length} lessons - {hours} min
          </P>
        </header>
        <Div class={`cur-div-contain ${showCard && 'show'}`}>
          <h1>{title}</h1>
          <P>{description}</P>
          <Div class="lessons">
            {cours.map(({ id, title, videoLink, ressources, description }) => (
              <NavLink key={id} class="cours">
                <Div
                  onClick={() =>
                    userLevel && setCours(videoLink, ressources, description)
                  }
                >
                  <VideoPlay size={40} color="black" />
                  <span class="title"> {title} </span>
                </Div>
                <span class="time">02:34</span>
              </NavLink>
            ))}
          </Div>
        </Div>
      </Div>
    </>
  )
}
