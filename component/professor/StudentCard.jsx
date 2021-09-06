import { css } from '../../lib/dom'
import { Div, P } from '../elements'
import { Star } from '../icons.jsx'
import { Img } from '../image'
import { equals } from '../../lib/quiz.js'

css(`
    .prof-student-card {
        width: 100%;
        background: #444;
        padding: 1rem;
        display:flex;
        flex-direction:column;
        align-items:flex-start;
        justify-content: space-between;
        border-radius:0.5rem;
        margin-bottom: 10px;
    }

    .prof-student-card .first_block{
      display:flex;
      flex-direction:row;
      align-items:center;
      justify-content: center;
    }

    .prof-student-card .first_block img{
        width: 160px;
        height: 145px;
        border-radius: 0.8rem;
    }

    .prof-student-card .first_block .info_card{
      padding: 1rem;
    }

  .prof-student-card .first_block .info_card h2{
      font-size: 1.8rem;
    }

    .prof-student-card .first_block .info_card span{
      font-size: 1rem;
    }

    .prof-student-card .first_block .info_card .stars_block{
        display:flex;
        flex-direction:row;
        align-items:center;
        justify-content:space-between;
        width: 85px;
        margin-top: 5px;
    }

    .prof-student-card .first_block .info_card h1{
        margin-top: 10px;
    }

    .prof-student-card .first_block .info_card h4{
      margin-top: 5px;
      font-weight: normal;
       color: red;
    }

    .prof-student-card .second_block{
      width:100%;
      display:flex;
      flex-direction:row;
      align-items:center;
      justify-content:space-between;
      margin-top: 10px;
    }

    .prof-student-card .second_block p {
      cursor:pointer;
    }

    .prof-student-card .second_block p:hover strong,.prof-student-card .second_block p:hover span{
      color: skyblue;
      font-weight:bolder;
    }



    .prof-student-card .second_block p strong{
      font-size: 1rem;
      color:darkgrey;
  }

    .prof-student-card .second_block p span{
        font-size: 1rem;
    }
`)

export const StudentCard = ({
  student: {
    name,
    avatar,
    points,
    blocked,
    speciality,
    quizzes: SQuizzes,
    projects: SProjects,
  },

  showUserInfo,
  quizzes,
  projects,
}) => {
  const show = (type, data) => {
    showUserInfo({
      name: name,
      data: data,
      dataType: type,
    })
  }

  const IfPassQuiz = (
    questions,
    responses,
    percentOfValidation,
    type = 'validation',
  ) => {
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
    const percent = (foundQuestions * 100) / Object.keys(questions).length
    if (type === 'validation') return percent >= percentOfValidation
    else
      return {
        questions_found: foundQuestions + '/' + Object.keys(questions).length,
        percent: percent + '%',
        status: percent >= percentOfValidation ? 'pass' : 'fail',
      }
  }

  return (
    <Div class="prof-student-card">
      <Div class="first_block">
        <Img uri={avatar} />
        <Div class="info_card">
          <h2>{name}</h2>
          <span>{speciality}</span>
          <Div class="stars_block">
            <Star fill color="yellow" size={20} />
            <Star fill color="yellow" size={20} />
            <Star fill color="yellow" size={20} />
            <Star color="grey" size={20} />
            <Star color="grey" size={20} />
          </Div>
          <h1>{points} points</h1>
          {blocked && <h4>blocked</h4>}
        </Div>
      </Div>
      <Div class="second_block">
        <P
          onClick={() =>
            show(
              'quizzes',
              SQuizes
                ? Object.keys(SQuizzes).map((q) => {
                    return {
                      name: quizzes.find((qu) => qu.id === q).name,
                      ...IfPassQuiz(
                        quizzes.find((qu) => qu.id === q).questions,
                        SQuizzes[q].responses,
                        quizzes.find((qu) => qu.id === q).percentOfValidation,
                        'data',
                      ),
                    }
                  })
                : [],
            )
          }
        >
          <strong>quizzes passed : </strong>
          <span>
            {SQuizzes
              ? SQuizzes &&
                Object.keys(SQuizzes).filter((q) =>
                  IfPassQuiz(
                    quizzes.find((qu) => qu.id === q).questions,
                    SQuizzes[q].responses,
                    quizzes.find((qu) => qu.id === q).percentOfValidation,
                  ),
                ).length
              : 0}
            /{quizzes.length}
          </span>
        </P>
        <P onClick={() => show('kata', [])}>
          <strong>kata passed : </strong>
          <span>4/8</span>
        </P>
        <P
          onClick={() =>
            show(
              'projects',
              SProjects
                ? SProjects.map((p) => {
                    return {
                      name: projects.find((r) => r.id === p.project_id).name,
                      project_link: p.project_link,
                      note: p.note ? p.note : 'en attente de notation',
                    }
                  })
                : [],
            )
          }
        >
          <strong>projects passed : </strong>
          <span>
            {SProjects
              ? SProjects.filter((p) => p.note && p.note > 12).length
              : 0}
            /{projects.length}
          </span>
        </P>
      </Div>
    </Div>
  )
}
