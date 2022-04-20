import router from "next/router";
import Layout from "../components/layout";
import * as Auth from "../services/auth"

export default function Component() {
  async function submit(e: any) {
    try {
      e.preventDefault();

      const email = e.target.email.value;
      const password = e.target.password.value;


      const corpo = JSON.stringify({ email: `${email}`, password: `${password}` })
      console.log(corpo)
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: corpo

      };
      const path = "login";
      const res = await fetch(`http://localhost:3000/${path}`, requestOptions);
      const resJson = await res.json();
      
      Auth.login(resJson.token)
      router.push({
        pathname: '/' // autenticado
      });

      console.log(resJson)
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Layout title="Login" center>
      <div className="flex justify-center">
        <div className="w-full max-w-xs ">
          <form action="/login" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 " onSubmit={submit}>
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
              <input className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="***************" name="password" />
            </div>
            <div className="flex items-center justify-between">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}