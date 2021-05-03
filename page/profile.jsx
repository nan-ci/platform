import {Title} from '../component/elements.jsx'
import {Img} from '../component/image.jsx';
import {Layout} from '../component/layout.jsx'
import {InputGroup,Input,Form,Button} from '../component/form.jsx';
import { css } from '../lib/dom.js';


css(`
.user-card {
  padding: 2rem;
  background-color: #121219;
  border-radius: 6px;
  margin-top: 4rem;
  max-width: 50rem; }
  .user-card .photo {
    height: 10rem;
    width: 10rem;
    border-radius: 6px;
    overflow: hidden; }
    .user-card .photo img {
      height: 100%;
      width: 100%;
      object-fit: cover; }
  .user-card .uc_content {
    background-color: #171721;
    padding: 1.5rem;
    border-radius: 6px;
    margin-top: 3rem;
    margin-bottom: 2rem; }
  .user-card .ucc-field {
    position: relative;
    font-size: 1.4rem;
    margin-bottom: 2rem; }
    .user-card .ucc-field small {
      display: block;
      text-transform: uppercase;
      font-weight: 600;
      color: #b0b0bd9d; }
    .user-card .ucc-field span {
      color: #fff; }

.pr-heading {
  margin-top: 6rem;
  margin-bottom: 4rem;
  position: relative; }
  .pr-heading h2 {
    font-weight: 500;
    font-size: 2.1rem;
    display: inline-block;
    background-color: #171721;
    padding-right: 2rem;
    position: absolute;
    top: -17px; }
  .pr-heading hr {
    border: 1px solid #23242e; }
`);


const data = {
  "username":"JohnDoe",
  "name":"Doe",
  "lastname":"John Halaric Simon",
  "birth date":"10/09/1910",
  "email":"johndoe@gmail.com",
  "number":"(+225) 019889988"
}

export const Profile = () => <Layout>
    <Title>Mon compte</Title>
    <div class="u-pad-default">
        <div class="user-card">
            <div class="photo">
                <Img source="user.png" alt="user" />
            </div>
            <div class="uc_content">
              {Object.keys(data).map((key,ind) => <div class="ucc-field">
                    <small>{key}</small>
                    <span>{data[key]}</span>
                </div> )}
            </div>
            <Button class="btn-purple" value="modifier" link="/" />
        </div>

        <section>
            <div class="pr-heading">
                <h2>Mot de passe </h2>
                <hr />
            </div>
            <Form >
                <InputGroup labelText="mot de passe actuel" labelFor="un">
                      <Input type="password" value="" class="--limited --bg-d" id="un" required="true"/>
                </InputGroup>
                <InputGroup labelText="nouveau mot de passe" labelFor="deux">
                      <Input type="password" value=""  class="--limited --bg-d" id="deux" required="true"/>
                </InputGroup>
                <Button class="btn-purple" type="submit" value="Changer le mot de passe " link="/" />
            </Form>
        </section>


        <section>
            <div class="pr-heading">
                <h2>Reseaux </h2>
                <hr />
            </div>
            <Form>
                <InputGroup labelText="Skype" labelFor="sk">
                      <Input type="text" value="" class="--limited --bg-d" id="sk" required="true" placeholder=" nom d'utillisateur " />
                </InputGroup>
                <InputGroup labelText="Linkendin" labelFor="ln">
                      <Input type="text" value="" class="--limited --bg-d" id="ln" required="true" placeholder="linkendin.com/in/profilename"/>
                </InputGroup>
                <InputGroup labelText="Twitter" labelFor="tw">
                      <Input type="text" value="" class="--limited --bg-d" id="tw" required="true" placeholder="@username"/>
                </InputGroup>
                <InputGroup labelText="Youtube" labelFor="yt">
                      <Input type="text" value="" class="--limited --bg-d" id="yt" required="true" placeholder="ma chaine" />
                </InputGroup>
                <InputGroup labelText="Site web" labelFor="sw">
                      <Input type="text" value="" class="--limited --bg-d" id="sw" required="true" placeholder="monsite.com" />
                </InputGroup>
                <Button class="btn-purple" type="submit" value="enregister" link="/" />
            </Form>
        </section>

    </div>
</Layout>
