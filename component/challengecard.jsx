import { css } from '../lib/dom.js'
import { Link } from './elements.jsx'
import { Img } from './image.jsx'

css(`
  .card-challenge {
    border: none;
    width: 100%;
    margin:20px 0px;
    background: var(--background-light);
  }
  .card-challenge img {
    width: 100%;
  }
  @media (max-width: 768px) {
    .card-challenge img {
      object-fit: cover;
    }
  }
  .card-challenge-body {
    background: var(--foreground-lighter);
    padding: 10px;
    height: 100%;
  }
  .title {
    font-size: 1.9rem;
    text-align: center;
    color: black;
  }
`)

export const ChallengeCard = ({ challenge }) => (
  <div class="card-challenge">
    <Img description={challenge.title} size={150} source={challenge.img} />
    <Link href={`/challenge/${challenge.id}`}>
      <section class="card-challenge-body">
        <p class="title">{challenge.name}</p>
      </section>
    </Link>
  </div>
)
