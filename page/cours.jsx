import { Div, P } from '../component/elements'
import { Layout } from '../component/layout.jsx'
import { NavLink } from '../component/header'
import { css } from '../lib/dom'
import { courses } from '../data/courses.js'
import { user } from '../lib/auth.js'
import { CoursCard } from '../component/cours-card.jsx'

css(`
 .cours-heading{
   text-align:center;
   margin-top:20px;
   border:1px solid white;
   padding:0.4rem;
 }

  .cours-container {
    display: flex;
    flex-direction:row;
    justify-content: center;
    align-items: center;
    flex-wrap:wrap;
  }


  .main-content {
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;
    width:100%;
  }

  .main-content .left {
    width:65%;
    height: 500px;
  }

  .main-content .left .video-reader {
     width:100%;
     height:300px;
  }

  .main-content .left .video-reader iframe{
    width:100%;
    height:100%;
    border-radius:0.5rem;
  }

  .main-content .right {
    width:30%;
    margin-left:20px;
    height:500px;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:space-between;
  }

  .main-content .right .block {
      width:100%;
      height:125px;
      border:1px solid white;
  }

  .main-content .right .block header {
     padding:0.3rem;
     background:var(--purple-darker);
     color:white;
     font-weight:bolder;
     text-align:center;
  }



`)

export const Cours = ({ params: { moduleName, coursName } }) => {
  const { speciality } = user
  const { modules, cours } = courses.find((c) => c.name === speciality)
  const currentModule = modules.find((m) => m.title === moduleName)
  const moduleCours = cours.filter((c) => c.idModule === currentModule.id)
  const currentCours =
    coursName && moduleCours.find((c) => c.title === coursName)
  return (
    <Layout>
      <h1 class="cours-heading">
        {!currentCours ? (
          <> {currentModule.title} </>
        ) : (
          <>
            <NavLink
              href={`/cours?moduleName=${currentModule.title}`}
              style={{ textDecoration: 'none', color: 'var(--green-darker)' }}
            >
              {currentModule.title}
            </NavLink>
            {' => '}
            {currentCours.title}
          </>
        )}
      </h1>
      <br />

      {/*  show cours of module */}
      {currentModule && !currentCours && (
        <Div class="cours-container">
          {moduleCours.map((cour, index) => (
            <CoursCard
              data={cour}
              module={{ id: currentModule.id, name: currentModule.title }}
              userLevel={user.level}
            />
          ))}
        </Div>
      )}

      {/*  show one cours */}
      {currentModule && currentCours && (
        <Div>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>
            {' '}
            cours : {currentCours.title}
          </h1>
          <Div class="main-content">
            <Div class="left">
              <Div class="video-reader">
                <iframe src={currentCours.videoLink}></iframe>
              </Div>
              <Div class="cours-info">
                <br />
                <P>{currentCours.description}</P>
              </Div>
            </Div>
            <Div class="right">
              <Div class="block">
                <header> ressources </header>
                <br />
                {currentCours.ressources.map((res) => {
                  return (
                    <>
                      <NavLink
                        key={res.name}
                        href={res.link}
                        style={{ color: 'black' }}
                        target="_blank"
                      >
                        {res.name}
                      </NavLink>
                      <br />
                    </>
                  )
                })}
              </Div>
              <Div class="block">
                <header> quizz </header>
              </Div>
              <Div class="block">
                <header> livecoding </header>
              </Div>
            </Div>
          </Div>
        </Div>
      )}
    </Layout>
  )
}
