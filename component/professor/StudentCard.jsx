import { css } from '../../lib/dom'
import { Div, P } from '../elements'
import { Star } from '../icons.jsx'
import { Img } from '../image'

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
  name,
  lastname,
  speciality,
  points,
  avatar,
  blocked,
  showUserInfo,
}) => {
  const show = (type) => {
    showUserInfo({
      student: { name, lastname },
      data: null,
      dataType: type,
    })
  }

  return (
    <Div class="prof-student-card">
      <Div class="first_block">
        <Img uri={avatar} />
        <Div class="info_card">
          <h2>
            {name} {lastname}
          </h2>
          <span>{speciality}</span>
          <Div class="stars_block">
            <Star fill color="yellow" size={20} />
            <Star fill color="yellow" size={20} />
            <Star fill color="yellow" size={20} />
            <Star color="grey" size={20} />
            <Star color="grey" size={20} />
          </Div>
          <h1>{points} points</h1>
      {blocked &&  <h4>blocked</h4>}
        </Div>
      </Div>
      <Div class="second_block">
        <P onClick={() => show('quizzes')}>
          <strong>quizzes passed : </strong>
          <span>4/8</span>
        </P>
        <P onClick={() => show('kata')}>
          <strong>kata passed : </strong>
          <span>4/8</span>
        </P>
        <P onClick={() => show('projects')}>
          <strong>projects passed : </strong>
          <span>4/8</span>
        </P>
      </Div>
    </Div>
  )
}
