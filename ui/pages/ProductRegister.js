import React, { useEffect, useState } from "react";
import Layout from "../components/layout";

export default function Contato() {
  const [step, setstep] = useState(0);

  const [dataForm, setDataForm] = useState({
    nameprod: "",
    typeprod: "",
    quantprod: "",
    prodcrop: "",
    prodprice: "",
    proddescription: ""
  });
  const onChangeInput = (e) =>
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });

  const sendContact = async (e) => {
    e.preventDefault();
    console.log(dataForm.inputproduct);
  };

  return (
    <Layout title="Registro de Produtos">
      <form onSubmit={sendContact}>
        <div className=" ">
          {/* <div className=" ">
            <ul className="steps steps-horizontal lg:steps-horizontal ">
              <li onClick={() => setstep(0)} class="step step-primary cursor-pointer">
                Informações do produto
              </li>
              <li onClick={() => setstep(1)} class="step step-primary cursor-pointer">
                Informações adicionais para a venda
              </li>
              <li onClick={() => setstep(2)} class="step cursor-pointer">
                Descrição do produto
              </li>
            </ul>
          </div> */}
          <div className=" ">
            {step === 0 && (
              <div className=" ">
                <br />
                <br />
                <div className="">
                  <h2>Nome do produto:</h2>
                  <input
                    type="text"
                    name="nameprod"
                    className="w-1/2  "
                    placeholder="Qual o nome do seu produto?"
                    onChange={onChangeInput}
                    value={dataForm.nameprod}
                  />
                </div>
                <br />
                <br />
                <div>
                  <h2>Tipo do produto:</h2>
                  <input
                    type="number"
                    name="typeprod"
                    className="w-1/2  "
                    placeholder="Selecione o tipo"
                    onChange={onChangeInput}
                    value={dataForm.typeprod}
                  />
                </div>
                <br />
                <br />
                <div>
                  <h2>Quantidade:</h2>
                  <input
                    type="number"
                    name="quantprod"
                    className="w-1/2  "
                    placeholder="Qual a quantidade em estoque?"
                    onChange={onChangeInput}
                    value={dataForm.quantprod}
                  />
                </div>
                <br />
                <br />
              </div>
            )}

            {step === 1 && (
              <div>
                <br />
                <br />
                <div>
                  <h2>Safra:</h2>
                  <input
                    type="date"
                    name="prodcrop"
                    className="w-1/2  "
                    placeholder="Qual a safra?"
                    onChange={onChangeInput}
                    value={dataForm.prodcrop}
                  />
                </div>
                <br />
                <br />
                <div>
                  <h2>Preço:</h2>
                  <input
                    type="number"
                    name="prodprice"
                    className="w-1/2  "
                    placeholder="Qual o valor por KG?"
                    onChange={onChangeInput}
                    value={dataForm.prodprice}
                  />
                </div>
                <br />
                <br />
                <div className="flex ">
                  <button type="" className="">
                    Buscar no local
                  </button>
                  <br />

                  <button type="" className="">
                    Entrega própria
                  </button>
                  <br />
                  <br />
                </div>
              </div>
            )}
            {step === 2 && (
              <div>
                <br />
                <br />
                <h2>Descrição:</h2>
                <input
                  type="text"
                  name="proddescription"
                  className=" w-1/2"
                  placeholder="Insira uma descrição"
                  onChange={onChangeInput}
                  value={dataForm.proddescription}
                />
                <br />
                <br />
              </div>
            )}
            <button type="submit" className="cursor-pointer">
              Enviar
            </button>
            <div className=" ">
              <ul className="steps steps-horizontal lg:steps-horizontal ">
                <li
                  onClick={() => setstep(0)}
                  class="step step-primary cursor-pointer"
                >
                  Informações do produto
                </li>
                <li
                  onClick={() => setstep(1)}
                  class="step step-primary cursor-pointer"
                >
                  Informações adicionais para a venda
                </li>
                <li onClick={() => setstep(2)} class="step cursor-pointer">
                  Descrição do produto
                </li>
              </ul>
            </div>

            <br />
            <br />
            <br />
            {/* <button type="submit" className="cursor-pointer">Enviar</button> */}
          </div>
        </div>
      </form>
    </Layout>
  );
}
