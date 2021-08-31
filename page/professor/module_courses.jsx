import { Div, P } from '../../component/elements'
import { css } from '../../lib/dom'
import { API } from '../../lib/env'
import { useState, useEffect } from 'preact/hooks'
import { CourseCard } from '../../component/professor/CourseCard.jsx'
import { Modal } from '../../component/professor/modal.jsx'
import { DeleteModal } from '../../component/professor/DeleteModal.jsx'

css(`

    .prof-modulecourse-header{
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


    .prof-modulecourse-addCourseButton {
      padding: 0.6rem;
      border-radius:0.5rem;
      cursor: pointer;
      background: var(--comment-darker);
      border:1px solid #444;
      outline: none;
    }


`)

export const ModuleCourses = ({ moduleId, courses, setCourses }) => {
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [currentCourse, setCurrentCourse] = useState(null)

  const setCourseToUpdate = (course, state) => {
    setCurrentCourse(course)
    state === 'update' ? setShowModal(true) : setShowDeleteModal(true)
  }

  return (
    <Div>
      <section class="prof-modulecourse-header">
        <button
          class="prof-modulecourse-addCourseButton"
          onClick={() => setShowModal(true)}
        >
          {' '}
          + course
        </button>
      </section>
      <section style={{ marginTop: '20px' }}>
        {courses.length > 0 ? (
          courses.map((course) => (
            <CourseCard
              key={course.name}
              data={course}
              setCourseToUpdate={(course, state = 'update') =>
                setCourseToUpdate(course, state)
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
        <Modal
          infoType="courses"
          show={showModal}
          idModule={moduleId}
          datasLength={courses.length}
          data={currentCourse}
          close={() => {
            setShowModal(false)
            setCurrentCourse(null)
          }}
          setData={async (data, type) => {
            const resp = await fetch(
              `${API}/courses${type === 'add' ? '' : `?key=${data.id}`}`,
              {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(data),
              },
            )
            if (resp.statusText === 'OK') {
              document.querySelector('.prof-modal').style.transform = 'scale(0)'
              setTimeout(() => {
                setShowModal(false)
                setCurrentCourse(null)
              }, 200)
              if (type === 'add') setCourses((val) => [...val, data])
              else {
                courses[courses.findIndex((m) => m.id === data.id)] = data
                setCourses([...courses])
              }
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
          data={courses}
          update={setCourses}
          close={() => {
            setShowDeleteModal(false)
            setCurrentCourse(null)
          }}
        />
      )}
    </Div>
  )
}
