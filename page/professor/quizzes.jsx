import { Div, P } from '../../component/elements'
import { Layout } from '../../component/layout.jsx'
import { css } from '../../lib/dom'
import { API } from '../../lib/env'
import { useState, useEffect } from 'preact/hooks'
import { QuizCard } from '../../component/professor/QuizCard.jsx'
import { Modal } from '../../component/professor/modal.jsx'
import { ModalQuizStudent } from '../../component/professor/ModalQuizStudent.jsx'
import { DeleteModal } from '../../component/professor/DeleteModal.jsx'

css(`
    .prof-quizzes-header{
       display:flex;
       flex-direction: row;
       align-items:center;
       justify-content: space-between;
    }

    .prof-quizzes-header>div{
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .prof-quizzes-header>div span{
       font-size: 1.7rem;
       font-weight:bolder;
    }

    .prof-quizzes-header h1{
       font-size: 1.7rem;
       text-decoration: underline
    }

   .prof-quizzes-addQuizButton {
     padding: 0.6rem;
     border-radius:0.5rem;
     cursor: pointer;
     background: var(--comment-darker);
     border:1px solid #444;
     outline: none;
   }
`)

export const Quizzes = () => {
  const [showModal, setShowModal] = useState(false)
  const [showModalStudent, setShowModalStudent] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [quizzes, setQuizzes] = useState([])
  const [quiz, setQuiz] = useState(null)
  const [students, setStudents] = useState([])

  useEffect(async () => {
    const resp = await (await fetch(`${API}/quizzes`)).json()
    if (resp.data) setQuizzes(resp.data)
  }, [])

  const showStudentsResults = (students, quiz) => {
    setShowModalStudent(true)
    setStudents(students)
    setQuiz(quiz)
  }

  const setQuizToUpdate = (quiz, state) => {
    setQuiz({
      ...quiz,
      ifQuizStart: state !== 'delete' && state,
    })
    state === 'delete' ? setShowDeleteModal(true) : setShowModal(true)
  }

  return (
    <Layout>
      <section class="prof-quizzes-header">
        <Div>
          <h1>Quizzes</h1>
          <span>({quizzes.length})</span>
        </Div>
        <button
          class="prof-quizzes-addQuizButton"
          onClick={() => setShowModal(true)}
        >
          {' '}
          + quiz
        </button>
      </section>
      <section style={{ marginTop: '50px' }}>
        {quizzes.length > 0 ? (
          quizzes.map((quiz) => (
            <QuizCard
              key={quiz.name}
              data={quiz}
              setQuizToUpdate={(quiz, state) => setQuizToUpdate(quiz, state)}
              showStudentsResults={(data, quiz) =>
                showStudentsResults(data, quiz)
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
            No Quizzes, please add one
          </P>
        )}
      </section>

      {showModal && (
        <Modal
          infoType="quizzes"
          show={showModal}
          datasLength={quizzes.length}
          data={quiz}
          close={() => {
            setShowModal(false)
            setQuiz(null)
          }}
          setData={async (data, type) => {
            const resp = await fetch(
              `${API}/quizzes${type === 'add' ? '' : `?key=${data.id}`}`,
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
                setQuiz(null)
              }, 200)
              if (type === 'add') setQuizzes((val) => [...val, data])
              else {
                quizzes[quizzes.findIndex((m) => m.id === data.id)] = data
                setQuizzes([...quizzes])
              }
            }
          }}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          type="quizzes"
          show={showDeleteModal}
          message={`Do you want really delete  this quiz ${quiz.name} ??`}
          id={quiz.id}
          value={quizzes}
          update={setQuizzes}
          close={() => {
            setShowDeleteModal(false)
            setQuiz(null)
          }}
        />
      )}
      {showModalStudent && (
        <ModalQuizStudent
          show={showModalStudent}
          quiz={quiz}
          students={students}
          close={() => {
            setShowModalStudent(false)
            setStudents(null)
            setQuiz(null)
          }}
        />
      )}
    </Layout>
  )
}
