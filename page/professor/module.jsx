import { Div, P } from '../../component/elements'
import { Layout } from '../../component/layout.jsx'
import { useState } from 'preact/hooks'
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

export const Module = ({ moduleName }) => {
  const [show, setShow] = useState('courses')
  const currentModule = JSON.parse(sessionStorage.getItem('modules')).find(
    (m) => m.name === decodeURI(moduleName),
  )
  const courses = sessionStorage.getItem('courses')
    ? JSON.parse(sessionStorage.getItem('courses'))
    : []

  const projects = sessionStorage.getItem('projects')
    ? JSON.parse(sessionStorage.getItem('projects'))
    : []

  return (
    <Layout>
      <h1 class="prof-module-h1">
        <strong>Module : </strong>
        {decodeURI(moduleName)}
      </h1>
      <Div class="prof-module-choice-buttons">
        <button
          class={show === 'courses' && 'active'}
          onClick={() => setShow('courses')}
        >
          courses (
          {courses.filter((c) => c.idModule === currentModule.id).length})
        </button>
        <button
          class={show === 'projects' && 'active'}
          onClick={() => setShow('projects')}
        >
          projects (
          {projects.filter((c) => c.idModule === currentModule.id).length})
        </button>
      </Div>
      {show === 'courses' ? (
        <ModuleCourses moduleName={moduleName} />
      ) : (
        <ModuleProjects moduleName={moduleName} />
      )}
    </Layout>
  )
}
