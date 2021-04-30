import { Layout,Title,Image} from '../component/elements.jsx'

export const Profile = ({path}) => <Layout path={path}>
                <Title>Mon compte</Title>
                <div class="u-pad-default">
                    <div class="user-card">
                        <div class="photo">
                           <Image image="user.png" alt="user" />
                        </div>
                        <div class="uc_content">
                            <div class="ucc-field">
                                <small>Nom d'utilisateur</small>
                                <span>JohnDoe_0923</span>
                            </div>
                            <div class="ucc-field">
                                <small>Nom</small>
                                <span>Doe</span>
                            </div>
                            <div class="ucc-field">
                                <small>Prénoms</small>
                                <span>John Halaric Simon</span>
                            </div>
                            <div class="ucc-field">
                                <small>Date de naissance</small>
                                <span>10/09/1910</span>
                            </div>
                            <div class="ucc-field">
                                <small>e-mail</small>
                                <span>johndoe@gmail.com</span>
                            </div>
                            <div class="ucc-field">
                                <small>numéro de téléphone</small>
                                <span>(+225) 0198899887</span>
                            </div>
                        </div>
                        <a href="#">
                            <button class="btn-purple">Modifier</button>
                        </a>
                    </div>

                    <section>
                        <div class="pr-heading">
                            <h2>Mot de passe </h2>
                            <hr />
                        </div>

                        <form class="form">
                            <div class="input-group">
                                <label for="un">Mot de passe actuel</label>
                                <input type="password" class="--limited --bg-d" id="un" />
                            </div>
                            <div class="input-group">
                                <label for="deux">Nouveau mot de passe</label>
                                <input type="password" class="--limited --bg-d" id="deux" />
                            </div>
                            <button class="btn-purple">Changer le mot de passe</button>
                        </form>
                    </section>

                    <section>
                        <div class="pr-heading">
                            <h2>Reseaux </h2>
                            <hr />
                        </div>

                        <form class="form">
                            <div class="input-group">
                                <label for="sk">Skype</label>
                                <input type="text" class="--limited --bg-d" id="sk" placeholder="nom d'utilisateur" />
                            </div>
                            <div class="input-group">
                                <label for="ln">Linkedin</label>
                                <input type="text" class="--limited --bg-d" id="ln" placeholder="linkedin.com/in/profilename" />
                            </div>
                            <div class="input-group">
                                <label for="tw">Twitter</label>
                                <input type="text" class="--limited --bg-d" id="tw" placeholder="@username" />
                            </div>
                            <div class="input-group">
                                <label for="sw">Youtube</label>
                                <input type="text" class="--limited --bg-d" id="sw" placeholder="ma chaîne" />
                            </div>
                            <div class="input-group">
                                <label for="sw">Site web</label>
                                <input type="text" class="--limited --bg-d" id="sw" placeholder="monsite.com" />
                            </div>
                            <button class="btn-purple">Enregistrer</button>
                        </form>
                    </section>
                </div>
</Layout>
