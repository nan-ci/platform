import { Title, GridContainer } from '../component/elements.jsx'
import { ChallengeCard } from '../component/challengecard'
import { Layout } from '../component/layout.jsx'
import { challenges } from '../data/challenges.js'

export const Challenges = () => {
  return (
    <Layout>
      <Title>Challenges</Title>
      <GridContainer>
        {challenges.flatMap((item) => (
          <ChallengeCard key={item.id} challenge={item} />
        ))}
      </GridContainer>
    </Layout>
  )
}
