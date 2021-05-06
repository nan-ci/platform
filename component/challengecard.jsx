import { css } from '../lib/dom.js'
import { Link } from './elements.jsx'
import { Img } from './image.jsx'

css(`
  .card-challenge {
    border: none;
    width: 100%;
    margin:20px 0px;
    background: var(--background-light);
    position: relative
  }
  .card-challenge img {
    width: 100%;
  }
  .card-challenge-body {
    background: var(--foreground-lighter);
    padding: 10px;
  }
  .title {
    font-size: 1.9rem;
    text-align: center;
    color: black;
  }
  .badge{
    background: var(--red);
    padding: 3px;
    position: absolute;
    right:0px;
    top:0px;
  }
`)

export const ChallengeCard = ({ challenge }) => (
  <div class="card-challenge">
    <span class="badge">{challenge.time} hours remaining</span>
    <Img description={challenge.title} size={150} source={challenge.img} />
    <Link href={`/challenge/${challenge.id}`}>
      <section class="card-challenge-body">
        <p class="title">{challenge.name}</p>
      </section>
    </Link>
  </div>
)
