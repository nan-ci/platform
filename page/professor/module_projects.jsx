import { Div, P } from '../../component/elements'
import { css } from '../../lib/dom'
import { API } from '../../lib/env'
import { useState } from 'preact/hooks'
import { ProjectCard } from '../../component/professor/ProjectCard.jsx'
import { ModalProject } from '../../component/professor/ModalProject.jsx'
import { DeleteModal } from '../../component/professor/DeleteModal.jsx'

css(`

    .prof-moduleProjects-header{
       display:flex;
       flex-direction: row;
       align-items:center;
       justify-content: flex-end;
    }

    .prof-module-choice-buttons{
       text-align:center;
       width:100%;
    }

    .prof-module-choice-buttons button{
        padding:  0.5rem;
        outline:none;
        cursor:pointer;
        border-radius:0.4rem;
        margin: 5px;
   }
    .prof-moduleProjects-addProjectButton {
      padding: 0.6rem;
      border-radius:0.5rem;
      cursor: pointer;
      background: var(--comment-darker);
      border:1px solid #444;
      outline: none;
    }


`)

export const ModuleProjects = ({ moduleName }) => {
  const { id: moduleId, projects } = JSON.parse(
    sessionStorage.getItem('modules'),
  ).find((m) => m.name === moduleName)
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [Projects, setProjects] = useState(projects ? projects : [])
  const [currentProject, setCurrentProject] = useState(null)

  const setProjectToUpdate = (projectId, state) => {
    setCurrentProject({
      ...projects.find((m) => m.id === projectId),
      ifStart: state,
    })
    state === 'delete' ? setShowDeleteModal(true) : setShowModal(true)
  }

  return (
    <Div>
      <section class="prof-moduleProjects-header">
        <button
          class="prof-moduleProjects-addProjectButton"
          onClick={() => setShowModal(true)}
        >
          {' '}
          + project
        </button>
      </section>
      <section style={{ marginTop: '20px' }}>
        {Projects.length > 0 ? (
          Projects.map((project) => (
            <ProjectCard
              key={project.name}
              data={project}
              setProjectToUpdate={(id, state) => setProjectToUpdate(id, state)}
            />
          ))
        ) : (
          <P
            style={{
              textAlign: 'center',
              fontWeight: 'bolder',
              fontSize: '1.3rem',
            }}
          >
            No projects, please add one
          </P>
        )}
      </section>

      {showModal && (
        <ModalProject
          show={showModal}
          projectsLength={projects.length}
          project={currentProject}
          close={() => {
            setShowModal(false)
            setCurrentProject(null)
          }}
          setProject={(data, type) => {
            const modules = JSON.parse(sessionStorage.getItem('modules'))
            if (type === 'add') {
              modules[
                modules.findIndex((m) => m.id === moduleId)
              ].projects.push(data)
              sessionStorage.setItem('modules', JSON.stringify(modules))
              setProjects((val) => [...val, data])
            } else {
              projects[projects.findIndex((m) => m.id === data.id)] = data
              modules[
                modules.findIndex((m) => m.id === moduleId)
              ].projects = projects
              sessionStorage.setItem('modules', JSON.stringify(modules))
              setProjects([...projects])
            }
          }}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          type="projects"
          show={showDeleteModal}
          message={`Do you want really delete  this project ${currentProject.name} ??`}
          moduleId={moduleId}
          id={currentProject.id}
          update={setProjects}
          close={() => {
            setShowDeleteModal(false)
            setCurrentProject(null)
          }}
        />
      )}
    </Div>
  )
}
