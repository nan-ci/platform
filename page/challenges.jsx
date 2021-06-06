import { ChallengeCard } from '../component/challenge-card.jsx'
import { Layout } from '../component/layout.jsx'
import { courses } from '../data/courses.js'
import { user } from '../lib/auth.js'

export const Challenges = () => (
  <Layout>
    {courses
      .filter(({ name }) => name === user.speciality)
      .map(({ challenges }) =>
        challenges.map((k) => <ChallengeCard data={k} key={k.id} />),
      )}
  </Layout>
)
