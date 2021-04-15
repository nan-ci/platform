export const registration_form = () => (
  <form method={"post"} action={"/api/user/register_form"}>
     <input type="text" name="own_contact" placeholder="please enter your phone number" />
    <input type="text" name="emergency_contact" placeholder="please enter a phone number to join in case of emergency" />
    <button type={"submit"}> submit </button>
  </form>
)
