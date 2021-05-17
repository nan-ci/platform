import { Title } from '../component/elements.jsx'
import { Layout } from '../component/layout.jsx'
import { css } from '../lib/dom.js'

css(`
.snake-tm {
  min-width: 300px;
  margin: auto;
  padding: 0 4rem; }

.snake-tm .block {
  font-size: 1em;
  line-height: 1.75em;
  border-top: 3px solid;
  border-image: linear-gradient(to right, #545dd3 0%, #343644 100%);
  border-image-slice: 1;
  border-width: 3px;
  margin: 0;
  padding: 40px;
  counter-increment: section;
  position: relative;
  color: #b0b0bd; }
  .snake-tm .block:before {
    content: counter(section);
    position: absolute;
    border-radius: 50%;
    height: 4rem;
    width: 4rem;
    background-color: #343644;
    text-align: center;
    color: #fff;
    font-size: 1.7rem;
    display: flex;
    align-items: center;
    justify-content: center; }

.snake-tm .block:nth-child(odd) {
  border-right: 3px solid;
  padding-left: 0; }
  .snake-tm .block:nth-child(odd):before {
    left: 100%;
    margin-left: -17px; }

.snake-tm .block:nth-child(even) {
  border-left: 3px solid;
  padding-right: 0; }
  .snake-tm .block:nth-child(even):before {
    right: 100%;
    margin-right: -20px; }

.snake-tm .block:first-child {
  border-top: 0;
  border-top-right-radius: 0;
  border-top-left-radius: 0; }

.snake-tm .block:last-child {
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0; }
`)

export const Home = () => (
  <Layout>
    <Title>Roadmap</Title>
    <div class="snake-tm">
      <div class="block">
        <h2>title here</h2>
        <p>
          Doggo ipsum long bois lotsa pats blep. What a nice floof ruff super
          chub very good spot, the neighborhood pupper lotsa pats. Borkdrive
          shibe shoober what a nice floof, borking doggo.
        </p>
      </div>
      <div class="block">
        Shoober shooberino adorable doggo many pats, heckin good boys many pats
        pupper wrinkler, corgo maximum borkdrive. A frighten puggo wow very
        biscit.
      </div>
      <div class="block">
        Big ol h*ck adorable doggo vvv smol borking doggo with a long snoot for
        pats big ol, he made many woofs doing me a frighten puggo wow very
        biscit, ruff fat boi ruff long doggo.{' '}
      </div>
      <div class="block">
        Long bois mlem I am bekom fat wrinkler puggo maximum borkdrive big ol
        pupper I am bekom fat, fluffer vvv adorable doggo lotsa pats snoot. I am
        bekom fat ur givin me a spook length boy wow very biscit very good spot.
      </div>
      <div class="block">
        Doggo ipsum long bois lotsa pats blep. What a nice floof ruff super chub
        very good spot, the neighborhood pupper lotsa pats. Borkdrive shibe
        shoober what a nice floof, borking doggo.
      </div>
    </div>
  </Layout>
)
