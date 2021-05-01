import { css } from '../lib/dom.js'
import { Link } from './elements.jsx'
import { Img } from './image.jsx'

css(`
  .card-challenge {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    width: 22%;
    border: 1px solid transparent;
    margin:20px 0px;
  }
  .card-challenge:hover {
    box-shadow: 0 8px 9px 0 rgba(124,124,124, 1);
  }
  .card-challendge-body {
    padding: 10px;
  }
`)

export const Card = ({ challenge, ...props }) => {
  return (
    <div class="card-challenge">
      <Link href={``}>
        <Img size={20} description={challenge.title} source={challenge.img} />
        <section class="card-challendge-body">
          <span>{challenge.title}</span>
        </section>
      </Link>
    </div>
  )
}
