import { Fragment } from 'preact'
import { useState } from 'preact/hooks'
import { Div } from '../../component/elements.jsx'
import { css } from '../../lib/dom.js'
import { CoursSvg } from './cours.jsx'
import { getUserLevel } from '../../lib/user.js'

css(`
.roadmap {
  padding:0.5rem;
  height:200px;
  background-image: url('/assets/images/map2.jpeg');
  background-size:cover;
  position:relative;
  left:0px;
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
`)

export const Roadmap = ({ modules, cours, userLevel }) => {
  const { level, step, x } = getUserLevel(userLevel)

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
                    link={null}
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
    </Div>
  )
}
