import Layout from "../components/layout";
import router from "next/router";
import "../styles/Register.module.css";
import * as Auth from "../services/auth"

export default function producerRegister() {
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

            router.push({
                pathname: '/login'
            });

            router.push({
                pathname: "/",
            });

            console.log(resJson);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Layout title="Cadastrar Produtor">
            <form action="/register" onSubmit={submit} id="producer-register-form">
                <div className="container mx-auto p-4 flex flex-col justify-content-center w-1/2">
                    <div className="relative z-0 mb-6 w-full group">
                        <input
                            type="text"
                            name="fantasyName"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-800 focus:outline-none focus:ring-0 focus:border-emerald-800 peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="fantasyName"
                            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-800 peer-focus:dark:text-emerald-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
                            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-800 peer-focus:dark:text-emerald-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Email (ex.: email@site.com)
                        </label>
                    </div>

                    <div className="relative z-0 mb-6 w-full group">
                        <input
                            type="text"
                            name="cnpj"
                            pattern="(\d{3}\.?\d{3}\.?\d{3}-?\d{2})|(\d{2}\.?\d{3}\.?\d{3}/?\d{4}-?\d{2})"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-800 focus:outline-none focus:ring-0 focus:border-emerald-800 peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="cnpj"
                            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-800 peer-focus:dark:text-emerald-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            CNPJ (ex.: 12.456.789/0000-01)
                        </label>
                    </div>


                    <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="PRua">
                                Rua
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                name="PRua"
                                type="text"
                                placeholder="Rua dos Pessegueiros" />
                        </div>
                        <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="PBairro">
                                Bairro
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                name="PBairro"
                                type="text"
                                placeholder="Conjunto das Oliveiras" />
                        </div>
                        <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="PCidade">
                                Cidade
                            </label>
                            <div className="relative">
                                <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="PCidade">
                                    <option value="AC">Acre</option>
                                    <option value="AL">Alagoas</option>
                                    <option value="AP">Amapá</option>
                                    <option value="AM">Amazonas</option>
                                    <option value="BA">Bahia</option>
                                    <option value="CE">Ceará</option>
                                    <option value="DF">Distrito Federal</option>
                                    <option value="ES">Espírito Santo</option>
                                    <option value="GO">Goiás</option>
                                    <option value="MA">Maranhão</option>
                                    <option value="MT">Mato Grosso</option>
                                    <option value="MS">Mato Grosso do Sul</option>
                                    <option value="MG">Minas Gerais</option>
                                    <option value="PA">Pará</option>
                                    <option value="PB">Paraíba</option>
                                    <option value="PR">Paraná</option>
                                    <option value="PE">Pernambuco</option>
                                    <option value="PI">Piauí</option>
                                    <option value="RJ">Rio de Janeiro</option>
                                    <option value="RN">Rio Grande do Norte</option>
                                    <option value="RS">Rio Grande do Sul</option>
                                    <option value="RO">Rondônia</option>
                                    <option value="RR">Roraima</option>
                                    <option value="SC">Santa Catarina</option>
                                    <option value="SP">São Paulo</option>
                                    <option value="SE">Sergipe</option>
                                    <option value="TO">Tocantins</option>
                                    <option value="EX">Estrangeiro</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="PCep">
                                Cep
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="PCep" type="text" placeholder="90210" />
                        </div>


                        <div className="flex flex-wrap -mx-3 mb-2">
                            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="BRua">
                                    Rua
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="BRua"
                                    type="text"
                                    placeholder="Rua dos Pessegueiros" />
                            </div>
                            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="BBairro">
                                    Bairro
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="BBairro"
                                    type="text"
                                    placeholder="Conjunto das Oliveiras" />
                            </div>
                            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="BCidade">
                                    Cidade
                                </label>
                                <div className="relative">
                                    <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="BCidade">
                                        <option value="AC">Acre</option>
                                        <option value="AL">Alagoas</option>
                                        <option value="AP">Amapá</option>
                                        <option value="AM">Amazonas</option>
                                        <option value="BA">Bahia</option>
                                        <option value="CE">Ceará</option>
                                        <option value="DF">Distrito Federal</option>
                                        <option value="ES">Espírito Santo</option>
                                        <option value="GO">Goiás</option>
                                        <option value="MA">Maranhão</option>
                                        <option value="MT">Mato Grosso</option>
                                        <option value="MS">Mato Grosso do Sul</option>
                                        <option value="MG">Minas Gerais</option>
                                        <option value="PA">Pará</option>
                                        <option value="PB">Paraíba</option>
                                        <option value="PR">Paraná</option>
                                        <option value="PE">Pernambuco</option>
                                        <option value="PI">Piauí</option>
                                        <option value="RJ">Rio de Janeiro</option>
                                        <option value="RN">Rio Grande do Norte</option>
                                        <option value="RS">Rio Grande do Sul</option>
                                        <option value="RO">Rondônia</option>
                                        <option value="RR">Roraima</option>
                                        <option value="SC">Santa Catarina</option>
                                        <option value="SP">São Paulo</option>
                                        <option value="SE">Sergipe</option>
                                        <option value="TO">Tocantins</option>
                                        <option value="EX">Estrangeiro</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="BCep">
                                    Cep
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="BCep" type="text" placeholder="90210" />
                            </div>

                            <button
                                type="submit"
                                className="text-white bg-emerald-700 hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-emerald-900 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </Layout>
    );
}
