import React, { useEffect, useState } from "react";
import Layout from "../components/layout";

export default function Contato() {
  const [step, setstep] = useState(0);

  const [dataForm, setDataForm] = useState({
    inputproduct: "",
    quantity: "",
    type: "",
    date: "",
  });
  const onChangeInput = (e) =>
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });

  const sendContact = async (e) => {
    e.preventDefault();
    console.log(dataForm.inputproduct);
  };

  return (
    <Layout className="text-emerald" title="Registro de Produtos">
      <form onSubmit={sendContact}>
        <div className="flex">
          <div className="flex-auto w-1/4 ">
            <ul class="steps steps-vertical lg:steps-horizontal">
              <li onClick={() => setstep(0)} class="step step-primary">
                Primeiro step
              </li>
              <li onClick={() => setstep(1)} class="step step-primary">
                Segundo step
              </li>
              <li onClick={() => setstep(2)} class="step">
                Terceiro step
              </li>
            </ul>
          </div>
          <div className="flex-auto w-3/4 ">
           { step===0 && <div>
              <input
                type="text"
                name="inputproduct"
                placeholder="Digite o nome produto"
                onChange={onChangeInput}
                value={dataForm.inputproduct}
              />
              <br />
              <input
                type="number"
                name="quantity"
                placeholder="Quantidade de produtos em estoque"
                onChange={onChangeInput}
                value={dataForm.quantity}
              />
            </div>}

            { step===1 && <div>

            <br />
            <input
              type="text"
              name="type"
              placeholder="Digite  tipo"
              onChange={onChangeInput}
              value={dataForm.type}
            />
            </div>}
            { step===2 && <div>
            <br />
            <input
              type="date"
              name="date"
              placeholder="Qual a safra?"
              onChange={onChangeInput}
              value={dataForm.date}
            />
            </div>}
            <br />
            <br />
            <br />
            <button type="submit">Enviar</button>
          </div>
        </div>
      </form>
    </Layout>
  );
}
