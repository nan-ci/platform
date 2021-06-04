import { CurriculumCard } from '../component/curriculum-card.jsx'
import { P } from '../component/elements.jsx'
import { Layout } from '../component/Layout.jsx'
import { courses } from '../data/courses.js'
import { user } from '../lib/auth.js'
import { css } from '../lib/dom.js'

css(`
.username-curriculum{
  font-size: 1.5rem;
  text-align : center;
  font-weight: bold;
}
`)

export const Curriculum = () => {
  const { name, speciality } = user
  console.log(user)
  return (
    <Layout>
      <P class="username-curriculum">Welcome back 👋, {name}</P>
      {courses
        .filter(({ name }) => name === speciality)
        .map(({ modules }) =>
          modules.map((props) => (
            <CurriculumCard {...props} key={props.id} />
          )),
        )}
    </Layout>
  )
}
