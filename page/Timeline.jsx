import { Img } from '../component/image.jsx'
import { ResultCard } from '../component/resultCard.jsx'
import { quizz } from '../data/quizz'
import { Layout } from '../component/layout.jsx'
import { css } from '../lib/dom.js'
import { TimelineCard } from '../component/timelinecard'
import { GridContainer } from '../component/elements.jsx'
import { timeline } from '../data/timeline.js'

css(`
.user-ranking {
  display: flex;
  justify-content: center; }

.ur_box {
  text-align: center; }
  .ur_box.--first figure {
    transform: scale(2) translateY(-18px);
    margin: 6rem auto 4rem; }
    @media only screen and (max-width: 48em) {
      .ur_box.--first figure {
        transform: scale(2.5) translateY(-18px); } }
    @media only screen and (max-width: 36em) {
      .ur_box.--first figure {
        transform: scale(1.7) translateY(-18px);
        margin: 4rem auto 2rem; } }
  .ur_box span {
    display: block;
    padding: 0 2rem; }
    @media only screen and (max-width: 36em) {
      .ur_box span {
        padding: 0; } }
  .ur_box figure {
    height: 10rem;
    width: 10rem;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid #545dd3;
    margin: 2rem auto; }
    @media only screen and (max-width: 48em) {
      .ur_box figure {
        height: 10rem;
        width: 10rem; } }
    @media only screen and (max-width: 36em) {
      .ur_box figure {
        height: 8rem;
        width: 8rem; } }
    .ur_box figure img {
      height: 100%;
      width: 100%;
      object-fit: cover; }
  .ur_box .pseudonym {
    font-size: 1.4rem;
    font-weight: 300;
    color: #b0b0bd; }
    @media only screen and (max-width: 36em) {
      .ur_box .pseudonym {
        font-size: 1.2rem; } }
  .ur_box .ranking {
    font-size: 1.5rem;
    font-weight: 400;
    color: #fff; }
  .ur_box .r-icon {
    height: 5rem; }
    @media only screen and (max-width: 36em) {
      .ur_box .r-icon {
        height: 3rem; } }
  .ur_box .point {
    font-size: 1.7rem;
    font-weight: 400;
    color: #545dd3; }
    @media only screen and (max-width: 36em) {
      .ur_box .point {
        font-size: 1.5rem; } }

        .page-subheading {
          font-size: 2rem;
          color: #fff;
          font-weight: initial;
          font-family: "Poppins", sans-serif; }

        .p-desc {
          font-size: 1.5rem;
          color: #b0b0bd;
          font-weight: 300;
          font-family: "Poppins", sans-serif; }


          .timeline-history {
            border-left: 3px solid #343644;
            height: 900px;
            overflow-y: auto;
            padding-left: 4rem;
            position: relative; }
            .timeline-history li {
              margin-bottom: 3rem; }
`)

export const Timeline = () => (
  <Layout>
    <div class=" u-pad-default u-mb-3">
      <div class="user-ranking">
        <div class="ur_box">
          <figure>
            <Img source="user.png" description="photo" />
          </figure>
          <span class="ranking">2</span>
          <span class="pseudonym">@user_21320943</span>
          <span class="point">98432</span>
        </div>
        <div class="ur_box --first">
          <figure>
            <Img source="user.png" description="user" size={100} />
          </figure>
          <span class="ranking">1</span>
          <Img source="icons/crown.svg" description="crown" size={80} />
          <span class="pseudonym">@user_21320943</span>
          <span class="point">98432</span>
        </div>
        <div class="ur_box">
          <figure>
            <Img source="user.png" alt="photo" />
          </figure>
          <span class="ranking">3</span>
          <span class="pseudonym">@user_21320943</span>
          <span class="point">98432</span>
        </div>
      </div>
    </div>

    <div class="u-pad-default u-mb-3">
      <h2 class="page-subheading">Speciality : Javascript</h2>
      <p class="p-desc">
        <span>Number of registrants :</span> 2109
      </p>
      <br/>
      <h2 class="page-subheading">Resume</h2>
    </div>

    <GridContainer class="u-mb-3">
      {timeline.flatMap((item) => (
        <TimelineCard data={item} key={item.id} />
      ))}
    </GridContainer>

    <div class="u-pad-default">
      <ul class="timeline-history">
        {quizz.flatMap((data) => (
          <li key={data.id}>
            <ResultCard data={data} />
          </li>
        ))}
      </ul>
      <Img source="plant.png" description="plant" size={30} />
    </div>
  </Layout>
)
