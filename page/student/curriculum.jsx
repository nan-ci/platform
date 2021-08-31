import { CurriculumCard } from '../../component/student/curriculum-card.jsx'
import { useState, useEffect } from 'preact/hooks'
import { API } from '../../lib/env.js'
import { Layout } from '../../component/layout.jsx'
import { user } from '../../lib/auth.js'
import { css } from '../../lib/dom.js'
import { Lecteur } from '../../component/student/lecteur.jsx'

css(`
.username-curriculum{
  font-size: 1.5rem;
  text-align : center;
  font-weight: bold;
}
`)

export const Curriculum = () => {
  const [showLecteur, setShowLecteur] = useState(false)
  const [currentCours, setCurrentCours] = useState({
    link: null,
    ressources: null,
    description: null,
  })
  const [modules, setModules] = useState([])
  const [courses, setCourses] = useState([])

  useEffect(async () => {
    const m = await (await fetch(`${API}/modules`)).json()
    if (m.data) setModules(m.data)
    const c = await (await fetch(`${API}/courses`)).json()
    if (c.data) setCourses(c.data)
  }, [])

  const config = (link, res, desc) => {
    setShowLecteur(true)
    setCurrentCours({ link, ressources: res, description: desc })
  }

  return (
    <Layout>
      {modules.map((props) => (
        <CurriculumCard
          {...props}
          key={props.id}
          userLevel={user.level}
          cours={courses.filter((c) => c.idModule === props.id)}
          setCours={(l, r, d) => config(l, r, d)}
        />
      ))}
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
