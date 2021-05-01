import { TimelineCard } from '../component/timelinecard.jsx'
import { css } from '../lib/dom.js'
import { Layout } from '../component/layout.jsx'


css(`
.container {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
}
`)

export const TimeLine = () => {
  return (
    <Layout>
      <div class="container">
        <TimelineCard
          title="COMPLETED"
          borderColor="var(--green-light)"
        />
        <TimelineCard
          title="FAILED"
          borderColor="var(--red-light)"
        />
        <TimelineCard title="RANK" />
      </div>
    </Layout>
  )
}
