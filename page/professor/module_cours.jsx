import { Div, P } from '../../component/elements'
import { Layout } from '../../component/layout.jsx'
import { logo } from '../../data/ascii'
import { css } from '../../lib/dom'
import { API } from '../../lib/env'
import { user } from '../../lib/auth.js'
import { navigate } from '../../lib/router'
import { useState } from 'preact/hooks'
import { CourseCard } from '../../component/professor/CourseCard.jsx'
import { ModalCourse } from '../../component/professor/ModalCourse.jsx'
import { DeleteModal } from '../../component/professor/DeleteModal.jsx'

css(`
    .prof-modulecourse-h1{
      font-weight: bolder;
      font-size: 1.7rem;
      margin-bottom: 27px;
    }

    .prof-modulecourse-h1>strong{
      font-weight: bolder;
      font-size: 1.7rem;
      color: var(--comment-lighter);
    }
    .prof-modulecourse-header{
       display:flex;
       flex-direction: row;
       align-items:center;
       justify-content: space-between;
    }

    .prof-modulecourse-header>div{
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .prof-modulecourse-header>div span{
       font-size: 1.7rem;
       font-weight:bolder;
    }

    .prof-modulecourse-header h1{
       font-size: 1.7rem;
       text-decoration: underline
    }

    .prof-modulecourse-addCourseButton {
      padding: 0.6rem;
      border-radius:0.5rem;
      cursor: pointer;
      background: var(--comment-darker);
      border:1px solid #444;
      outline: none;
    }


`)

export const ModuleCours = ({ moduleName }) => {
  const { id: moduleId } = JSON.parse(sessionStorage.getItem('modules')).find(
    (m) => m.name === moduleName,
  )
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [courses, setCourses] = useState(
    sessionStorage.getItem('courses')
      ? JSON.parse(sessionStorage.getItem('courses')).filter(
          (c) => c.idModule === moduleId,
        )
      : [],
  )
  const [currentCourse, setCurrentCourse] = useState(null)

  const setCourseToUpdate = (coursid, state) => {
    setCurrentCourse(courses.find((m) => m.id === coursid))
    state === 'update' ? setShowModal(true) : setShowDeleteModal(true)
  }

  return (
    <Layout>
      <h1 class="prof-modulecourse-h1">
        <strong>Module : </strong>
        {moduleName}
      </h1>
      <section class="prof-modulecourse-header">
        <Div>
          <h1>courses</h1>
          <span>({courses.length})</span>
        </Div>
        <button
          class="prof-modulecourse-addCourseButton"
          onClick={() => setShowModal(true)}
        >
          {' '}
          + course
        </button>
      </section>
      <section style={{ marginTop: '50px' }}>
        {courses.length > 0 ? (
          courses.map((course) => (
            <CourseCard
              key={course.name}
              data={course}
              setCourseToUpdate={(id, state = 'update') =>
                setCourseToUpdate(id, state)
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
            No Course, please add one
          </P>
        )}
      </section>

      {showModal && (
        <ModalCourse
          show={showModal}
          idModule={moduleId}
          coursesLength={courses.length}
          course={currentCourse}
          close={() => {
            setShowModal(false)
            setCurrentCourse(null)
          }}
          setCourse={(data, type) => {
            if (type === 'add') {
              sessionStorage.setItem(
                'courses',
                JSON.stringify([...courses, data]),
              )
              setCourses((val) => [...val, data])
            } else {
              courses[courses.findIndex((m) => m.id === data.id)] = data
              sessionStorage.setItem('courses', JSON.stringify(courses))
              setCourses([...courses])
            }
          }}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
         type="courses"
          show={showDeleteModal}
          message={`Do you want really delete  the course ${currentCourse.name} ??`}
          id={currentCourse.id}
          update={setCourses}
          close={() => {
            setShowDeleteModal(false)
            setCurrentCourse(null)
          }}
        />
      )}
    </Layout>
  )
}
