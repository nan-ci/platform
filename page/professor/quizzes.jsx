import { Div, P } from '../../component/elements'
import { Layout } from '../../component/layout.jsx'
import { css } from '../../lib/dom'
import { API } from '../../lib/env'
import { useState } from 'preact/hooks'
import { QuizCard } from '../../component/professor/QuizCard.jsx'
import { ModalQuiz } from '../../component/professor/ModalQuiz.jsx'
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
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [quizzes, setQuizzes] = useState(
    sessionStorage.getItem('quizzes')
      ? JSON.parse(sessionStorage.getItem('quizzes'))
      : [],
  )
  const [quiz, setQuiz] = useState(null)

  const setQuizToUpdate = (quizId, state) => {
    setQuiz({
      ...quizzes.find((m) => m.id === quizId),
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
              setQuizToUpdate={(id, state) => setQuizToUpdate(id, state)}
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
        <ModalQuiz
          show={showModal}
          quizzesLength={quizzes.length}
          quiz={quiz}
          close={() => {
            setShowModal(false)
            setQuiz(null)
          }}
          setQuiz={(data, type) => {
            if (type === 'add') {
              sessionStorage.setItem(
                'quizzes',
                JSON.stringify([...quizzes, data]),
              )
              setQuizzes((val) => [...val, data])
            } else {
              quizzes[quizzes.findIndex((m) => m.id === data.id)] = data
              sessionStorage.setItem('quizzes', JSON.stringify(quizzes))
              setQuizzes([...quizzes])
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
          update={setQuizzes}
          close={() => {
            setShowDeleteModal(false)
            setQuiz(null)
          }}
        />
      )}
    </Layout>
  )
}
