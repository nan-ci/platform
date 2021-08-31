import { Div, P } from '../../component/elements'
import { Layout } from '../../component/layout.jsx'
import { useState, useEffect } from 'preact/hooks'
import { logo } from '../../data/ascii'
import { css } from '../../lib/dom'
import { API } from '../../lib/env'
import { ModuleCourses } from './module_courses.jsx'
import { ModuleProjects } from './module_projects.jsx'
import { user } from '../../lib/auth.js'

css(`

    .prof-module-h1{
      font-weight: bolder;
      font-size: 1.7rem;
      margin-bottom: 20px;
    }

    .prof-module-h1>strong{
      font-weight: bolder;
      font-size: 2rem;
      color: var(--comment-darker);
    }

    .prof-module-choice-buttons{
       text-align:center;
       width:100%;
    }

    .prof-module-choice-buttons button{
        padding:  0.5rem;
        outline:none;
        color: white;
        background: none;
        font-weight:bolder;
        cursor:pointer;
        border-radius:0.4rem;
        margin: 5px;
   }

   .prof-module-choice-buttons button.active{
      background: #004eff59;
  }




`)

export const Module = ({ moduleId }) => {
  const [show, setShow] = useState('courses')
  const [courses, setCourses] = useState([])
  const [projects, setProjects] = useState([])
  const [currentModule, setCurrentModule] = useState({})

  useEffect(async () => {
    const courses = await (await fetch(`${API}/courses`)).json()
    if (courses.data) setCourses(courses.data)
    const projects = await (await fetch(`${API}/projects`)).json()
    if (projects.data) setProjects(projects.data)
    const module = await (await fetch(`${API}/modules?key=${moduleId}`)).json()
    if (module.data) setCurrentModule(module.data)
  }, [])

  return (
    <Layout>
      <h1 class="prof-module-h1">
        <strong>Module : </strong>
        {currentModule.name}
      </h1>
      <Div class="prof-module-choice-buttons">
        <button
          class={show === 'courses' && 'active'}
          onClick={() => setShow('courses')}
        >
          courses ({courses.filter((c) => c.idModule === moduleId).length})
        </button>
        <button
          class={show === 'projects' && 'active'}
          onClick={() => setShow('projects')}
        >
          projects ({projects.filter((c) => c.idModule === moduleId).length})
        </button>
      </Div>
      {show === 'courses' ? (
        <ModuleCourses
          moduleId={moduleId}
          courses={courses}
          setCourses={setCourses}
        />
      ) : (
        <ModuleProjects
          moduleId={moduleId}
          projects={projects}
          setProjects={setProjects}
        />
      )}
    </Layout>
  )
}
