import { css } from '../../lib/dom'
import { useState } from 'preact/hooks'
import { Div, P } from '../../component/elements.jsx'
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
  const [data, setData] = useState({
    dataType: null,
    data: null,
    student: null,
  })

  const showUserInfo = (data) => {
    setData({ ...data })
    setShowModal(true)
  }

  const students = [
    {
      name: 'Walter',
      lastname: 'Bishop',
      points: 246,
      avatar:
        'https://cdn.pixabay.com/photo/2015/08/05/04/25/people-875617_1280.jpg',
    },
    {
      name: 'Olivia',
      lastname: 'Donham',
      points: 246,
      avatar:
        'https://cdn.pixabay.com/photo/2015/08/05/04/25/people-875617_1280.jpg',
    },
    {
      name: 'Jhon',
      lastname: 'Scott',
      points: 246,
      avatar:
        'https://cdn.pixabay.com/photo/2015/08/05/04/25/people-875617_1280.jpg',
      blocked: true,
    },
  ]

  return (
    <Layout>
      <Div class="prof-students-container">
        <header>
          <h1>Students</h1>
          <span>({students.length})</span>
        </header>
        <section class="prof-students-section">
          {students.map((student) => {
            return (
              <StudentCard
                {...student}
                speciality="javascript"
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
