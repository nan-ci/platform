import { Div } from '../elements.jsx'
import { css } from '../../lib/dom.js'
import { useState, useRef } from 'preact/hooks'
import { Form, Input } from '../form.jsx'

css(`

   .prof-cours-form {
      display:flex;
      flex-direction:row;
      align-items:flex-start;
      justify-content: center;
  }

  .prof-cours-form  .block_left, .prof-cours-form  .block_right{
    width: 50%;
    padding: 0.5rem;
  }

.prof-cours-form  .block_right h2{
     color:var(--purple-darker);
  }

  .prof-cours-form  .block_right video{
     width: 300px;
     height: 130px;
     border:1px solid #444;
     margin-top: 70px;
     margin-bottom: -60px;
     position:relative;
     right:50%;
     left:50%;
     transform:translate(-50%,-50%)
  }

.prof-cours-form  .block_right .ressources{
    width: 100%;
    height: 110px;
    padding: 0.5rem;
    overflow:auto;
}

.prof-cours-form  .block_right .ressources::-webkit-scrollbar{
   width: 4px;
}

.prof-cours-form  .block_right button.ressource{
    padding:0.5rem;
    outline:none;
    background: purple;
    float:right;
    border-radius:0.5rem;
    margin-top: 20px;
    cursor:pointer;
}



  .prof-cours-form-submit {
      padding: 0.4rem;
      width: 200px;
      position: absolute;
      bottom:0;
      left: 50%;
      right: 50%;
      transform: translate(-50%,-50%);
      cursor:pointer;
      background : var(--comment-darker)
  }


  .prof-cours-form-ressources-div{
      display:flex;
      flex-direction:row;
      align-items:flex-end;
      justify-content:center;
      margin-bottom: 10px;
}

.prof-cours-form-ressources-div input{
  border:1px solid white !important;
  width:95% !important;
  margin-bottom: 0px !important;
}

  .prof-cours-form-ressources-div button{
    padding:.5rem;
    cursor:pointer;
      font-size:1rem;
      color:white;
      height:40px;
      background: red;
      outline:none;
  }


`)

const RessourceComponent = ({
  ind,
  updateErrors,
  errors,
  updateCount,
  ressources,
}) => {
  const sup = (index) => {
    updateCount((count) => {
      count.splice(index, 1)
      return [...count]
    })
  }
  return (
    <Div class="prof-cours-form-ressources-div">
      <Input
        inputType="input"
        type="text"
        name={'ressource_name' + ind}
        comment="name"
        value={ressources && ressources[ind] ? ressources[ind].name : ''}
        errors={errors}
        updateErrors={updateErrors}
      />
      <Input
        inputType="input"
        type="text"
        name={'ressource_link' + ind}
        comment="link"
        value={ressources && ressources[ind] ? ressources[ind].link : ''}
        errors={errors}
        updateErrors={updateErrors}
      />
      <button
        onClick={(e) => {
          e.stopPropagation()
          sup(ind)
        }}
      >
        x
      </button>
    </Div>
  )
}

export const FormCourse = ({ idModule, course, onSubmit }) => {
  const [errors, setErrors] = useState({
    name: null,
    link: null,
    description: null,
  })

  const [count, setCount] = useState(
    course && course.ressources ? course.ressources.map((v, i) => i) : [0],
  )

  const [link, setLink] = useState(course && course.link ? course.link : null)
  const videoRef = useRef(null)

  const check = (val) => {
    videoRef.current.currentTime = 0
    setLink(val)
    videoRef.current.play()
  }

  const submit = (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target))
    const keys = Object.keys(data).filter((k) => k.includes('ressource'))
    let ressources = []
    for (let x = 0; x < keys.length; x += 2) {
      ressources.push({ name: data[keys[x]], link: data[keys[x + 1]] })
      delete data[keys[x]]
      delete data[keys[x + 1]]
    }
    onSubmit(
      course ? { ...data, ressources } : { idModule, ...data, ressources },
    )
  }

  return (
    <Form
      class="prof-cours-form"
      submit={!course ? 'add course' : 'update course'}
      buttonClassName="prof-cours-form-submit"
      style={{ whiteSpace: 'pre', padding: '01rem', paddingBottom: '4rem' }}
      onSubmit={submit}
    >
      <Div class="block_left">
        <Input
          type="text"
          inputType="input"
          name="name"
          comment="Enter the course Name"
          value={course ? course.name : ''}
          required
          errors={errors}
          updateErrors={setErrors}
        />
        <Input
          type="text"
          inputType="input"
          name="link"
          comment="Enter the course link"
          value={course ? course.link : ''}
          required
          onKeyUp={(e) => check(e.target.value)}
          errors={errors}
          updateErrors={setErrors}
        />
        <Input
          type="textarea"
          rows="5"
          inputType="textarea"
          name="description"
          required
          comment="Enter the course Description"
          value={course ? course.description : ''}
          errors={errors}
          updateErrors={setErrors}
        />
      </Div>
      <Div class="block_right">
        <h2>video preview</h2>
        <video preload controls ref={videoRef} type="video/mp4" src={link} />
        <h2>Ressources ({count.length})</h2>
        <Div class="ressources">
          {count.map((c, ind) => (
            <RessourceComponent
              key={c}
              ind={ind}
              ressources={course && course.ressources}
              errors={errors}
              updateCount={setCount}
            />
          ))}
        </Div>
        <button
          onClick={(e) => {
            e.preventDefault()
            setCount([...count, count.length])
          }}
          class="ressource"
        >
          {' '}
          + ressource
        </button>
      </Div>
    </Form>
  )
}
