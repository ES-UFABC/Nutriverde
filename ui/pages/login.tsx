import router from "next/router";
import Layout from "../components/layout";
import * as Auth from "../services/auth"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Component(props: any) {

  const warn = (message: string) => toast.warn(message);
  const success = (message: string) => toast.success(message);

  async function submit(e: any) {
    try {
      e.preventDefault();

      const email = e.target.email.value;
      const password = e.target.password.value;


      const corpo = JSON.stringify({ email: `${email}`, password: `${password}` })
      //console.log(corpo)
      const requestOptions = {

        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: corpo

      };
      const path = "login";
      const res = await fetch(`http://localhost:3000/${path}`, requestOptions);
      const resJson = await res.json();

      if (resJson.message == "Login Successfull") {
        Auth.login(resJson.token)
        success("Login Successfull")
        router.push({
          pathname: '/' // autenticado
        });
      } else {
        warn("Credencials Not Match")
        console.log("Invalid LOGIN") //change to toast
      }
      //console.log("resJson", resJson)
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Layout title="Login" center>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="flex justify-center">
        <div className="w-full max-w-xs  ">
          <form action="/login" className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4 " onSubmit={submit}>
            <div className="mb-4 ">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Your@email.com" name="email" />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******" name="password" />
            </div>
            <div className="flex items-center justify-between">
              <button className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}