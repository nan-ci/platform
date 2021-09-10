import { Div, P } from '../../component/elements'
import { Layout } from '../../component/layout.jsx'
import { css } from '../../lib/dom.js'
import { GET, POST } from '../../lib/api.js'
import { useState, useEffect } from 'preact/hooks'
import { QuizCard } from '../../component/professor/QuizCard.jsx'
import { equals } from '../../lib/quiz.js'
import { Modal } from '../../component/professor/modal.jsx'
import { ModalQuizStudent } from '../../component/professor/ModalQuizStudent.jsx'
import { DeleteModal } from '../../component/professor/DeleteModal.jsx'
import moment from 'moment'

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
    const resp = await GET('quizzes')
    if (resp.data) setQuizzes(resp.data)
    const st = await GET('students?filter=quizzes')
    if (st.data) setStudents(st.data)
  }, [])

  const calculResult = (questions, responses, percentOfValidation) => {
    let foundQuestions = 0
    for (let k in questions) {
      if (Object.values(questions[k]).filter((t) => t).length > 1) {
        const resps = Object.entries(questions[k])
          .flatMap((val) => (val[1] ? val[0] : null))
          .filter((f) => f)
        if (equals(resps, responses[k])) foundQuestions += 1
      } else if (questions[k][responses[k]]) {
        foundQuestions += 1
      }
    }
    let percent = (foundQuestions * 100) / Object.keys(questions).length
    return {
      questions_found: foundQuestions + '/' + Object.keys(questions).length,
      percent: percent + '%',
      status: percent >= percentOfValidation ? 'pass' : 'fail',
    }
  }

  const showStudentsResults = (quiz) => {
    setShowModalStudent(true)
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
              showStudentsResults={(quiz) => {
                showStudentsResults(quiz)
              }}
              studentsLength={
                students.filter(
                  (s) =>
                    s.quizzes &&
                    s.quizzes[quiz.id] &&
                    (s.quizzes[quiz.id].submit ||
                      moment.isAfter(s.quizzes[quiz.id].end_date)),
                ).length
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
            const resp = await POST(
              `quizzes${type === 'add' ? '' : `?key=${data.id}`}`,
              {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(data),
              },
            )
            if (resp.success) {
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
          students={students
            .filter(
              (s) =>
                s.quizzes[quiz.id] &&
                (s.quizzes[quiz.id].submit ||
                  moment.isAfter(s.quizzes[quiz.id].end_date)),
            )
            .map((s) => {
              return {
                student: s.name,
                ...calculResult(
                  quiz.questions,
                  s.quizzes[quiz.id].responses,
                  quiz.percentOfValidation,
                ),
              }
            })}
          close={() => {
            setShowModalStudent(false)
            setQuiz(null)
          }}
        />
      )}
    </Layout>
  )
}
