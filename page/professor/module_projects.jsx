import { Div, P } from '../../component/elements'
import { css } from '../../lib/dom'
import { API } from '../../lib/env'
import { useState } from 'preact/hooks'
import { ProjectCard } from '../../component/professor/ProjectCard.jsx'
import { Modal } from '../../component/professor/modal.jsx'
import { ModalProjectStudent } from '../../component/professor/ModalProjectStudent.jsx'
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

export const ModuleProjects = ({ moduleId, projects, setProjects }) => {
  const [showModal, setShowModal] = useState(false)
  const [showStudentModal, setShowStudentModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [project, setProject] = useState(null)

  const [students, setStudents] = useState([])

  const setProjectToUpdate = (project, state) => {
    setProject({
      ...project,
      ifStart: state,
    })
    state === 'delete' ? setShowDeleteModal(true) : setShowModal(true)
  }

  const showStudentsResults = (project, students) => {
    setShowStudentModal(true)
    setProject(project)
    setStudents(students)
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
        {projects.length > 0 ? (
          projects.map((project) => (
            <ProjectCard
              key={project.name}
              data={project}
              setProjectToUpdate={(data, state) =>
                setProjectToUpdate(data, state)
              }
              showStudentsResults={(proj, stud) =>
                showStudentsResults(proj, stud)
              }
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
        <Modal
          infoType="projects"
          show={showModal}
          idModule={moduleId}
          datasLength={projects.length}
          data={project}
          close={() => {
            setShowModal(false)
            setProject(null)
          }}
          setData={async (data, type) => {
            const resp = await (
              await fetch(
                `${API}/professor/projects${
                  type === 'add' ? '' : `?key=${data.id}`
                }`,
                {
                  method: 'POST',
                  headers: { 'content-type': 'application/json' },
                  body: JSON.stringify(data),
                },
              )
            ).json()
            if (resp.message === 'ok') {
              if (type === 'add') setProjects((val) => [...val, data])
              else {
                projects[projects.findIndex((m) => m.id === data.id)] = data
                setProjects([...projects])
              }
            }
          }}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          type="projects"
          show={showDeleteModal}
          message={`Do you want really delete  this project ${project.name} ??`}
          moduleId={moduleId}
          id={project.id}
          data={projects}
          update={setProjects}
          close={() => {
            setShowDeleteModal(false)
            setProject(null)
          }}
        />
      )}

      {showStudentModal && (
        <ModalProjectStudent
          show={showStudentModal}
          project={project}
          students={students}
          close={() => {
            setShowStudentModal(false)
            setProject(null)
          }}
        />
      )}
    </Div>
  )
}
