import { BAD_REQUEST, TYPE_JSON } from './defs.js'
import { POST } from './router.js'
import * as db from './db.js'

POST.user.register_form = async ({session,request}) => {
 const contentType = request.headers.get('content-type') || "";
   if(!contentType.includes('form')){
         return new Response("Bad request",BAD_REQUEST);
   }else{
      const body = await request.json();
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
