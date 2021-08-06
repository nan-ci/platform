import { css } from '../../lib/dom'
import { Div, P } from '../../component/elements.jsx'
import { Layout } from '../../component/layout.jsx'
import { StudentCard } from '../../component/professor/StudentCard.jsx'
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
  const students = [
    {
      name: 'Koffi',
      lastname: 'Kouamé Rameaux',
      points: 246,
      avatar:
        'https://cdn.pixabay.com/photo/2015/08/05/04/25/people-875617_1280.jpg',
    },
    {
      name: 'Koffi',
      lastname: 'Kouamé Rameaux',
      points: 246,
      avatar:
        'https://cdn.pixabay.com/photo/2015/08/05/04/25/people-875617_1280.jpg',
    },
    {
      name: 'Koffi',
      lastname: 'Kouamé Rameaux',
      points: 246,
      avatar:
        'https://cdn.pixabay.com/photo/2015/08/05/04/25/people-875617_1280.jpg',
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
            return <StudentCard {...student} speciality="javascript" />
          })}
        </section>
      </Div>
    </Layout>
  )
}
