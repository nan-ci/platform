import { Title } from '../component/elements.jsx'
import { Img } from '../component/image.jsx'
import { Layout } from '../component/layout.jsx'
import { InputGroup, Input, Form, Button } from '../component/form.jsx'
import { css } from '../lib/dom.js'
import { profile } from '../data/profile.js'

css(`
.user-card {
  padding: 2rem;
  background-color: #121219;
  border-radius: 6px;
  margin-top: 4rem;
  max-width: 50rem; }

    overflow: hidden; }

    .user_card .photo{
      border-radius: 25px;
    }

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
`)

export const Profile = () => (
  <Layout>
    <Title>Profile</Title>
    <div class="u-pad-default">
      <div class="user-card">
          <Img source="user.png" description="user" size={100}/>
        <div class="uc_content">
          {Object.keys(profile).map((key, index) => (
            <div class="ucc-field" key={index}>
              <small>{key}</small>
              <span>{profile[key]}</span>
            </div>
          ))}
        </div>
      </div>

      <section>
        <div class="pr-heading">
          <h2>Social Network </h2>
          <hr />
        </div>
        <Form>
          <InputGroup labelText="Linkendin" labelFor="ln">
            <Input
              type="text"
              value=""
              class="--limited --bg-d"
              id="ln"
              required="true"
              placeholder="linkendin.com/in/profilename"
            />
          </InputGroup>
          <InputGroup labelText="Twitter" labelFor="tw">
            <Input
              type="text"
              value=""
              class="--limited --bg-d"
              id="tw"
              required="true"
              placeholder="@username"
            />
          </InputGroup>

          <InputGroup labelText="Github" labelFor="sw">
            <Input
              type="text"
              value=""
              class="--limited --bg-d"
              id="sw"
              required="true"
              placeholder="Github"
              disabled
            />
          </InputGroup>
          <Button
            class="btn-purple"
            type="submit"
            value="Save"
            link="/"
          />
        </Form>
      </section>
    </div>
  </Layout>
)
