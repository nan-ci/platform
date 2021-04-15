import { BAD_REQUEST, TYPE_JSON } from './defs.js'
import { POST } from './router.js'
import * as db from './db.js'

// function to check the form's data
const verify_informations = (body) => {
   let checks = [];
   for(let item in body){
      switch(item){
        case "own_contact":
           isNaN(body[item]) && checks.push('veuillez entrer un numéro de contact correct svp');
           break;
        case "emergency_contact":
          isNaN(body[item]) && checks.push("veuillez entrer un numéro d'urgence valide svp");
          break;
        default:
          break;
     }
   }
   return checks
};

POST.user.register_form = async ({session,request}) => {
 const contentType = request.headers.get('content-type') || "";
   if(!contentType.includes('form')){
         return new Response("Bad request",BAD_REQUEST);
   }else{
      const body = await request.json();
      const errors = verify_informations(body);
      if(errors.length > 0){
        return new Response({status:false,errors},{
          status:203,
          headers:{..TYPE_JSON}
        })
      }
      // get previous state
      const oldData = await db.get(session);
      // update the state
      await db.put(session,{..oldData,body});
      // send response
      return new Response({status:true,message:"all right"},{
        status:200,
        headers:{location:"/",...TYPE_JSON}
      });
   }
}
