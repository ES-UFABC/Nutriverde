import router from "next/router";
import Layout from "../components/layout";
import * as Auth from "../services/auth"

export default function Component() {
    
    if(typeof window !== 'undefined'){
        //console.log("browser: ")
        Auth.logout()
        router.push({
          pathname: '/' // autenticado
        }); 
      }else{
        //console.log("server")
        
      }
      console.log("Logout effectued")
  return (
    <Layout title="Logout" center>

    </Layout>
  );
}