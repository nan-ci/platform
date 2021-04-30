import {Image} from '../component/elements.jsx'
import {ResultCard} from '../component/resultCard.jsx';
import {results} from '../data/results.js';
import {Layout} from '../component/layout.jsx'

export const Results = () => <Layout>
               <div class=" u-pad-default u-mb-3">
                    <div class="user-ranking">
                        <div class="ur_box">
                            <figure>
                                <Image image="user.png" alt="photo" />
                            </figure>
                            <span class="ranking">2</span>
                            <span class="pseudonym">@user_21320943</span>
                            <span class="point">98432</span>
                        </div>
                        <div class="ur_box --first">
                            <figure>
                                <Image image="user.png" alt="photo" />
                            </figure>
                            <span class="ranking">1</span>
                            <Image image="icons/crown.svg" class="r-icon" alt="icons" />
                            <span class="pseudonym">@user_21320943</span>
                            <span class="point">98432</span>
                        </div>
                        <div class="ur_box">
                            <figure>
                                <Image image="user.png" alt="photo" />
                            </figure>
                            <span class="ranking">3</span>
                            <span class="pseudonym">@user_21320943</span>
                            <span class="point">98432</span>
                        </div>
                    </div>
                </div>

                <div class="u-pad-default u-mb-3">
                    <h2 class="page-subheading">Spécialité</h2>
                    <p class="p-desc">Javascript</p>
                    <p class="p-desc"><span>Nombre d'inscrits :</span> 2109 personnes</p>
                </div>

                <div class="u-pad-default u-mb-3">
                    <h2 class="page-subheading">Historique</h2>
                </div>

                <div class="grid-container u-pad-default u-mb-3">
                    <div class="dashed-card">
                        <Image image="icons/top-rated.svg" alt="icons" />
                        <div>
                            <span>123</span>
                            <small>Mon rang</small>
                        </div>
                    </div>
                    <div class="dashed-card">
                        <Image image="icons/success.svg" alt="icons" />
                        <div>
                            <span>13</span>
                            <small>succès</small>
                        </div>
                    </div>
                    <div class="dashed-card">
                        <Image image="icons/failure.svg" alt="icons" />
                        <div>
                            <span>13</span>
                            <small>echecs</small>
                        </div>
                    </div>
                </div>

                <div class="u-pad-default">
                    <ul class="timeline-history">
                      {results.map((data,index) =><li key={index}><ResultCard  data={data}/></li>)}
                    </ul>
                    <Image image="plant.png" class="plant" alt="grass"/>
                </div>
</Layout>
