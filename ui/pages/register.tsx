import Layout from "../components/layout";
import router from "next/router";
import "../styles/Register.module.css";
import * as Auth from "../services/auth"

export default function Register() {
  async function submit(e: any) {
    try {
      e.preventDefault();

      const name = e.target.name.value;
      const email = e.target.email.value;
      const cpf = e.target.cpf.value;
      const phone = [e.target.telefone.value];
      const endereço = [e.target.endereço.value];
      const floating_password = e.target.floating_password.value;
      const floating_repeat_password = e.target.floating_repeat_password.value;

      const corpo = JSON.stringify({
        name: `${name}`,

        email: `${email}`,
        cpf: `${cpf}`,
        address: `${endereço}`,
        password: `${floating_password}`,
        phones: `${phone}`,
      });

      console.log(corpo);
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: corpo,
      };
      const path = "register";
      const res = await fetch(`http://localhost:3000/${path}`, requestOptions);
      const resJson = await res.json();

      Auth.login(resJson.token)
      router.push({
        pathname: '/' // autenticado
      });


      console.log(resJson);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Layout title="Cadastrar Produtor">
      <form action="/register" onSubmit={submit} id="producer-register-form">
        <div className="container mx-auto flex flex-col justify-content-center w-3/4">
          <div className="relative z-0 mb-6 w-full group mt-6">
            <input
              type="text"
              name="name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-800 focus:outline-none focus:ring-0 focus:border-emerald-800 peer "
              placeholder=" "
              required
            />
            <label
              htmlFor="name"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-800 peer-focus:dark:text-emerald-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Nome
            </label>
          </div>

          <div className="relative z-0 mb-6 w-full group">
            <input
              type="email"
              name="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-800 focus:outline-none focus:ring-0 focus:border-emerald-800 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="email"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-800 peer-focus:dark:text-emerald-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email (ex.: email@site.com)
            </label>
          </div>

          <div className="relative z-0 mb-6 w-full group">
            <input
              type="text"
              name="cpf"
              pattern="(\d{3}\.?\d{3}\.?\d{3}-?\d{2})|(\d{2}\.?\d{3}\.?\d{3}/?\d{4}-?\d{2})"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-800 focus:outline-none focus:ring-0 focus:border-emerald-800 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="cpf"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-800 peer-focus:dark:text-emerald-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              CPF (ex.: 123.456.789-00)
            </label>
          </div>

          <div className="relative z-0 mb-6 w-full group">
            <input
              type="text"
              name="telefone"
              pattern="[0-9]{2}[9]{0,1}[0-9]{8}"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-800 focus:outline-none focus:ring-0 focus:border-emerald-800 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="telefone"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-800 peer-focus:dark:text-emerald-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Telefone (ex.: (11) 91234-4567)
            </label>
          </div>

          <div className="relative z-0 mb-6 w-full group">
            <input
              type="text"
              name="endereço"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-800 focus:outline-none focus:ring-0 focus:border-emerald-800 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="endereço"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-800 peer-focus:dark:text-emerald-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Endereço (ex.: Rua dos pessegueiros, 500)
            </label>
          </div>
          <div className="flex">
            <div className="relative z-0 mb-6 w-full group mr-3">
              <input
                type="password"
                name="floating_password"
                id="floating_password"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-800 focus:outline-none focus:ring-0 focus:border-emerald-800 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_password"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-800 peer-focus:dark:text-emerald-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Senha
              </label>
            </div>
            <div className="relative z-0 mb-6 w-full group">
              <input
                type="password"
                name="repeat_password"
                id="floating_repeat_password"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-800 focus:outline-none focus:ring-0 focus:border-emerald-800 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_repeat_password"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-800 peer-focus:dark:text-emerald-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Confirme a Senha
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="text-white mb-3 bg-emerald-700 hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-emerald-900 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Submit
          </button>
        </div>
      </form>
    </Layout>
  );
}
