export const registration_form = () => (
  <form method={"post"} action={"/api/user/register_form"}>
     <input type="text" name={"own_contact"} placeholder={"veuillez entrez votre numéro de téléphone svp"} />
    <input type={"text"} name={"emergency_contact"} placeholder={"veuillez entrz le numéro de téléphone d'un parent à contacter en cas d'urgence svp"} />
    <button type={"submit"}> Soumettre </button>
  </form>
)
