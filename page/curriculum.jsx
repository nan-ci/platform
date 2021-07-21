import { CurriculumCard } from '../component/curriculum-card.jsx'
import { useState } from 'preact/hooks'
import { Layout } from '../component/layout.jsx'
import { courses } from '../data/courses.js'
import { user } from '../lib/auth.js'
import { css } from '../lib/dom.js'
import { Lecteur } from '../component/lecteur.jsx'

css(`
.username-curriculum{
  font-size: 1.5rem;
  text-align : center;
  font-weight: bold;
}
`)

export const Curriculum = () => {
  const { name, speciality } = user
  const [showLecteur, setShowLecteur] = useState(false)
  const [currentCours, setCurrentCours] = useState({
    link: null,
    ressources: null,
    description: null,
  })

  const config = (link, res, desc) => {
    setShowLecteur(true)
    setCurrentCours({ link, ressources: res, description: desc })
  }

  return (
    <Layout>
      {courses
        .filter(({ name }) => name === speciality)
        .map(({ modules, cours }) =>
          modules.map((props) => (
            <CurriculumCard
              {...props}
              key={props.id}
              userLevel={user.level}
              cours={cours.filter((c) => c.idModule === props.id)}
              setCours={(l, r, d) => config(l, r, d)}
            />
          )),
        )}
      <Lecteur
        showLecteur={showLecteur}
        closeLecteur={() => setShowLecteur(false)}
        link={currentCours.link}
        ressources={currentCours.ressources}
        description={currentCours.description}
      />
    </Layout>
  )
}
