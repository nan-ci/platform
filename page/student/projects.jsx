import { useState, useEffect, useRef } from 'preact/hooks'
import { Div, P } from '../../component/elements.jsx'
import { Layout } from '../../component/layout.jsx'
import { Card } from '../../component/student/card.jsx'
import { css } from '../../lib/dom.js'
import { POST, GET } from '../../lib/api.js'
import moment from 'moment'

css(`
      .projects-modal {
        position:absolute;
        top: 20%;
        left:50%;
        right:50%;
        width:400px;
        padding: 1.4rem;
        background: black;
        border:2px solid var(--comment-darker);
        transition:all 0.5s ease-in-out;
        text-align:center;
      }

      .projects-modal h1 {
        font-size: 1.7rem;
        text-decoration: underline;
        margin-bottom: 15px;
      }

      .projects-modal p {
        font-size: 1rem;
        color: darkgrey;
        margin-bottom: 20px;
      }


      .projects-modal  input {
        border:2px solid white;
        padding: 0.5rem;
        width: 80%;
      }

      .projects-modal input::placeholder {
          font-weight: bolder;
          color: grey;
      }


      .projects-modal .button-group {
           display:flex;
           flex-direction:row;
           align-items:center;
           justify-content:center;
           margin-top: 20px;
      }


      .projects-modal .button-group .go {
        background:var(--comment-darker);
        color:white;
        font-weight:bolder;
        padding:0.4rem;
        cursor:pointer;
        margin: 5px;
        border:none;
      }

      .projects-modal .button-group .cancel {
          background:var(--red-darker);
          color:white;
          font-weight:bolder;
          padding:0.4rem;
          cursor:pointer;
          margin: 5px;
          border:none;
      }
`)

export const Projects = () => {
  const [currentProject, setCurrentProject] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [myProjects, setMyProjects] = useState(null)
  const [projects, setProjects] = useState([])
  const input = useRef(null)

  const selectProject = (proj) => {
    setCurrentProject({ ...proj })
    setShowModal(true)
  }

  useEffect(async () => {
    const resp = await GET('user/projects')
    if (resp.data) {
      setMyProjects(resp.data)
    }
    const proj = await GET('projects')
    if (proj.data) setProjects(proj.data)
  }, [])

  const submitproject = async () => {
    const resp = await POST(
      `user/${
        myProjects && myProjects.find((p) => p.project_id === currentProject.id)
          ? `projects?key=${currentProject.id}`
          : 'projects'
      }`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          myProjects &&
            myProjects.find((p) => p.project_id === currentProject.id)
            ? {
                project_link: input.current.value,
              }
            : {
                project_id: currentProject.id,
                project_link: input.current.value,
                submit: true,
              },
        ),
      },
    )
    if (resp.success) {
      setShowModal(false)
      setCurrentProject(null)
      myProjects && myProjects.find((p) => p.project_id === currentProject.id)
        ? (myProjects.find(
            (p) => p.project_id === currentProject.id,
          ).project_link = input.current.value)
        : myProjects.push({
            project_id: currentProject.id,
            project_link: input.current.value,
            submit: true,
          })
      setMyProjects([...myProjects])
    }
  }

  return (
    <Layout>
      <Div>
        {projects &&
          projects.map((data) => (
            <Card
              type="projects"
              {...data}
              selectData={(dat) => selectProject(dat)}
              ifDone={
                myProjects &&
                myProjects.find((p) => p.project_id === data.id)?.submit
              }
              datas={myProjects}
            />
          ))}
        {!projects && <h1>Loading ....</h1>}
      </Div>
      <Div
        class="projects-modal"
        style={{
          transform: `translate(-50%,-50%) ${
            showModal ? 'scale(1)' : 'scale(0)'
          }`,
        }}
      >
        {currentProject && (
          <Div class="body">
            <h1>{currentProject.name}</h1>
            <P>{currentProject.description}</P>
            <input
              type="text"
              placeholder="entrer the project link here"
              defaultValue={
                myProjects &&
                myProjects.find((p) => p.project_id === currentProject.id)
                  ?.project_link
              }
              ref={input}
            />
            <Div class="button-group">
              <button class="go" onClick={() => submitproject()}>
                {myProjects &&
                myProjects.find((p) => p.project_id === currentProject.id)
                  ? 'update'
                  : 'submit'}{' '}
                the project
              </button>
              <button class="cancel" onClick={() => setShowModal(false)}>
                {' '}
                Cancel{' '}
              </button>
            </Div>
          </Div>
        )}
      </Div>
    </Layout>
  )
}
