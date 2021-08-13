import { useState, useEffect, useRef } from 'preact/hooks'
import { Div, P } from '../../component/elements.jsx'
import { Layout } from '../../component/layout.jsx'
import { Card } from '../../component/student/card.jsx'
import { courses } from '../../data/courses.js'
import { user } from '../../lib/auth.js'
import { css } from '../../lib/dom.js'
import { API } from '../../lib/env.js'
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
  const [myProjects, setMyProjects] = useState(
    sessionStorage.getItem('projects') &&
      JSON.parse(sessionStorage.getItem('projects')),
  )
  const [projects, setprojects] = useState(
    courses.find((c) => c.name === user.speciality).projects,
  )
  const input = useRef(null)

  const selectProject = (proj) => {
    setCurrentProject({ ...proj })
    setShowModal(true)
  }

  const submitproject = () => {
    let check = sessionStorage.getItem('projects')
      ? JSON.parse(sessionStorage.getItem('projects'))
      : []
    let index = check.findIndex((p) => p.project_name === currentProject.name)
    console.log('ins', index)
    if (check && index >= 0) {
      check[index].project_link = input.current.value
    } else {
      check.push({
        project_name: currentProject.name,
        project_link: input.current.value,
        submit: true,
      })
    }
    sessionStorage.setItem('projects', JSON.stringify([...check]))

    setShowModal(false)
    setCurrentProject(null)
  }

  useEffect(async () => {
    // setMyQuizzes()
    // const resp = await (await fetch(`${API}/user/quizzes`)).json()
    // if (resp.data) {
    //   setMyQuizzes(resp.data)
    // }
  }, [])

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
                myProjects.find((p) => p.project_name === data.name)
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
                myProjects.find((p) => p.project_name === currentProject.name)
                  ?.project_link
              }
              ref={input}
            />
            <Div class="button-group">
              <button class="go" onClick={() => submitproject()}>
                {myProjects &&
                myProjects.find((p) => p.project_name === currentProject.name)
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
