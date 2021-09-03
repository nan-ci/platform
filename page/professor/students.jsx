import { css } from '../../lib/dom'
import { useState, useEffect } from 'preact/hooks'
import { GET } from '../../lib/api.js'
import { Div } from '../../component/elements.jsx'
import { Layout } from '../../component/layout.jsx'
import { StudentCard } from '../../component/professor/StudentCard.jsx'
import { ModalStudent } from '../../component/professor/ModalStudent.jsx'

css(`
    .prof-students-container header {
        display:flex;
        flex-direction:row;
        align-items:center;
        justify-content:flex-start;
        font-weight:bolder;

    }


    .prof-students-container header h1,.prof-students-container span{
       font-size: 1.7rem;
    }
    .prof-students-section{
      margin-top: 20px;
    }

`)

export const students = () => {
  const [showModal, setShowModal] = useState(false)
  const [students, setStudents] = useState(null)
  const [quizzes, setQuizzes] = useState(null)
  const [projects, setProjects] = useState(null)

  useEffect(async () => {
    const resp = await GET('students')
    if (resp.data) setStudents(resp.data)
    const quizzes = await GET('quizzes')
    if (quizzes.data) setQuizzes(quizzes.data)
    const projects = await GET('projects')
    if (projects.data) setProjects(projects.data)
  }, [])

  const [data, setData] = useState({
    dataType: null,
    data: null,
    name: null,
  })

  const showUserInfo = (data) => {
    setData({ ...data })
    setShowModal(true)
  }

  return (
    <Layout>
      <Div class="prof-students-container">
        <header>
          <h1>Students</h1>
          <span>({students && students.length})</span>
        </header>
        <section class="prof-students-section">
          {students &&
            quizzes &&
            projects &&
            students.map((student) => {
              return (
                <StudentCard
                  student={student}
                  quizzes={quizzes}
                  projects={projects}
                  showUserInfo={(data) => showUserInfo(data)}
                />
              )
            })}
        </section>
      </Div>
      {showModal && (
        <ModalStudent
          show={showModal}
          {...data}
          close={() => {
            setShowModal(false)
            setData({ data: null, dataType: null, student: null })
          }}
        />
      )}
    </Layout>
  )
}
