import {Title,Image} from '../component/elements.jsx'
import {Layout} from '../component/layout.jsx'
import {InputGroup,Input,Form,Button} from '../component/form.jsx';


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
                <Image image="user.png" alt="user" />
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
