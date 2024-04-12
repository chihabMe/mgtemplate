import { db } from "@/utils/db"
import { comparePassword } from "@/utils/passwords";
import NextAuth from "next-auth"
import CredentailProvider from "next-auth/providers/credentials"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [

    CredentailProvider({
        name:"credentails",
        credentials:{
            email:{label:"Email",placeholder:"jhon@email.com",type:"email"},
            password:{label:"Password",placeholder:"password",type:"password"},
        },
        authorize:async function(credentials,req){
          if(!credentials?.email || ! credentials.password)return null;
          const user  = await db.user.findFirst({
            where:{email:credentials.email}
          })
          if(!user)return null
          const valid = await comparePassword(credentials.password,user.password)
          if (!valid)return null
          return user ;
        }
    }),
    // ...add more providers here
  ],
}

const handler =  NextAuth(authOptions)
export {handler as GET,handler as POST}