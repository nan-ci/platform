import { Fragment } from 'preact'
import { useState } from 'preact/hooks'
import { Div } from '../../component/elements.jsx'
import { css } from '../../lib/dom.js'
import { CoursSvg } from './cours.jsx'
import { getUserLevel } from '../../lib/user.js'
import { Location } from '../icons.jsx'

css(`
.roadmap {
  padding:0.5rem;
  height:230px;
  background-image: url('/assets/images/map2.jpeg');
  background-size:cover;
  position:relative;
  border-radius: 0.5rem;
}
.ombre {
  height:100%;
  width:100%;
  top:0;
  left:0;
  background:rgba(61,61,61,0.85);
  position:absolute;
  z-index:0;
  border-radius: 0.5rem;
}
.roadmap-map {
  position:absolute;
  z-index:1;
  width:100%;
  height:100%;
  top:0;
  left:0;
  display:flex;
  padding:2rem;
  flex-direction:row;
  align-items:center;
  justify-content:flex-start;
  overflow:auto;
  border-radius: 0.5rem;

}
.roadmap-title{
  width: 300px;
  font-size: 1.5rem;
  text-decoration:underline;
  position:absolute;
  top:10%;
  left:50%;
  right:50%;
  color:white;
  z-index:1;
  transform:translate(-50%,-50%)
}

.roadmap-box {
  width: 100%;
  height: 100px;
  background:transparent;
  position:absolute;
  bottom:0%;
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content:center;
   left:0;
  z-index:1;
}

.roadmap-box h1 {
  color:white;
  margin-top:10px;
  font-weight:bolder;
  font-size:20px;
}
`)

export const Roadmap = ({ modules, cours, userLevel }) => {
  const { level, step, x } = getUserLevel(userLevel)
  const [sc, setSc] = useState(null)

  const currentStep = x
    ? modules.find((m) => m.id === level).project
    : cours.find((cr) => cr.idModule === level && cr.id === step)
  return (
    <Div class="roadmap">
      <Div class="ombre" />
      <Div class="roadmap-map">
        {modules.map((module) => {
          return (
            <Fragment key={module.title}>
              {cours
                .filter((c) => c.idModule === module.id)
                .map((cour) => (
                  <CoursSvg
                    key={cour.title}
                    lock={
                      !(
                        level > module.id ||
                        x ||
                        (level === module.id && step >= cour.id)
                      )
                    }
                    link={`/cours?moduleName=${module.title}&coursName=${cour.title}`}
                    moduleId={module.id}
                    coursId={cour.id}
                    userLevel={userLevel}
                  />
                ))}
              <CoursSvg
                moduleId={module.id}
                lock={!(level > module.id || (level === module.id && x))}
                project={true}
                userLevel={userLevel}
              />
            </Fragment>
          )
        })}
      </Div>
      <Div class="roadmap-box">
        <Location color="none" size={30} style={{ marginRight: '10px' }} />
        <h1> => {currentStep.title}</h1>
      </Div>
      {/* <Div class="roadmap-box">
        <h2>informations</h2>
      </Div> */}
    </Div>
  )
}
