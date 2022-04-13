import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Layout from "../components/layout";

export default function Contato() {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const [step, setStep] = useState(0);
  // const [files, setFiles] = useState([]);

  // const { getRootProps, getInputProps } = useDropzone({
  //   accept: "image/*",
  //   onDropAccepted: async (files) => {
  //     // Uploads files to server.
  //     const uploadedFiles = files.map(async (f) => {
  //       const data = new FormData();
  //       data.append("file", f);

  //       const res = await fetch({
  //         url: `${serverUrl}/files`,
  //         method: "POST",
  //         body: data,
  //       });

  //       console.log(res);
  //       if (res.status < 200 && res.status >= 400) {
  //         console.error("error uploading file", res);
  //         return Object.assign(f, { preview: "" });
  //       }

  //       const json = await res.json();
  //       return Object.assign(f, { preview: `${serverUrl}/files/${json.name}` });
  //     });
  //     await Promise.all(uploadedFiles);

  //     setFiles(uploadedFiles);
  //   },
  // });

  const sendData = async (e: any) => {
    e.preventDefault();

    const data = {
      name: dataForm.nameprod,
      typology: dataForm.typeprod,
      quantity: dataForm.quantprod,
      cropDate: dataForm.prodcrop,
      price: dataForm.prodprice,
      specialDeliveryConditions: dataForm.proddelivery,
      description: dataForm.proddescription,
      unitOfMeas: "KG",
      producerId: 1,
    };
    console.log(data);

    const res = await fetch(`${serverUrl}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    console.log(json);
  };

  const [dataForm, setDataForm] = useState({
    nameprod: "",
    typeprod: "",
    quantprod: "",
    prodcrop: "",
    prodprice: "",
    proddelivery: "",
    proddescription: "",
  });

  const onChangeInput = (e: any) =>
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });

  // const sendContact = async (e) => {
  //   e.preventDefault();
  //   console.log(dataForm.inputproduct);
  // };

  return (
    <Layout title="Registro de Produtos">
      <form onSubmit={sendData}>
        <div className="container mx-auto p-4 flex flex-col justify-content-center">
          <ul className="steps steps-horizontal mb-14">
            <li
              onClick={() => setStep(0)}
              className={classNames({
                step: true,
                "cursor-pointer": true,
                "step-primary": step >= 0,
              })}
            >
              Informações do produto
            </li>
            <li
              onClick={() => setStep(1)}
              className={classNames({
                step: true,
                "cursor-pointer": true,
                "step-primary": step >= 1,
              })}
            >
              Informações adicionais para a venda
            </li>
            <li
              onClick={() => setStep(2)}
              className={classNames({
                step: true,
                "cursor-pointer": true,
                "step-primary": step >= 2,
              })}
            >
              Descrição do produto
            </li>
          </ul>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-y-12">
            {step === 0 && (
              <>
                <div>
                  <h2 className="">Nome do produto:</h2>
                  <input
                    type="text"
                    name="nameprod"
                    className="w-full"
                    placeholder="Qual o nome do seu produto?"
                    onChange={onChangeInput}
                    value={dataForm.nameprod}
                  />
                </div>

                <div>
                  <h2>Tipo do produto:</h2>
                  <select
                    name="typeprod"
                    className="w-full"
                    placeholder="Selecione o tipo"
                    onChange={onChangeInput}
                    value={dataForm.typeprod}
                  >
                    <option value="unknown">Desconhecido</option>
                    <option value="beekeeping">Apicultura</option>
                    <option value="cereals">Cereais</option>
                    <option value="fruits">Frutas</option>
                    <option value="vegetables">Hortaliças</option>
                    <option value="dairy">Laticínios e derivados,</option>
                    <option value="protein">Proteína de origem animal</option>
                    <option value="tubers">Raizes e turbéculos</option>
                    <option value="meals">Refeições</option>
                    <option value="seeds">Sementes e mudas</option>
                    <option value="legumes">Legumes</option>
                    <option value="bakery">Panificação</option>
                    <option value="sweets">Doces, mel, melado e geléias</option>
                    <option value="beverages">Bebidas e polpas</option>
                    <option value="herbs">Chás e ervas</option>
                    <option value="sausages">Embutidos</option>
                    <option value="preserves">Conservas</option>
                  </select>
                </div>

                <div>
                  <h2>Quantidade:</h2>
                  <input
                    type="number"
                    name="quantprod"
                    className="w-full"
                    placeholder="Qual a quantidade em estoque?"
                    onChange={onChangeInput}
                    value={dataForm.quantprod}
                  />
                </div>

                {/* <section className="container">
                  <div {...getRootProps({ className: "dropzone" })}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                  <aside>
                    {files.map((file) => (
                      <div key={file.name}>
                        <div>
                          <img src={file.preview} />
                        </div>
                      </div>
                    ))}
                  </aside>
                </section> */}
              </>
            )}

            {step === 1 && (
              <>
                <div>
                  <h2>Safra:</h2>
                  <input
                    type="date"
                    name="prodcrop"
                    className="w-full"
                    placeholder="Qual a safra?"
                    onChange={onChangeInput}
                    value={dataForm.prodcrop}
                  />
                </div>

                <div>
                  <h2>Preço:</h2>
                  <input
                    type="number"
                    name="prodprice"
                    className="w-full"
                    placeholder="Qual o valor por KG?"
                    onChange={onChangeInput}
                    value={dataForm.prodprice}
                  />
                </div>

                <div>
                  <h2>Condições de entrega:</h2>
                  <input
                    type="text"
                    name="proddelivery"
                    className="w-full"
                    placeholder="Busca no local ou entrega própria?"
                    onChange={onChangeInput}
                    value={dataForm.proddelivery}
                  />
                </div>

                <br />
                <br />
              </>
            )}

            {step === 2 && (
              <>
                <div className="col-span-2">
                  <h2>Descrição:</h2>
                  <textarea
                    name="proddescription"
                    className="w-full"
                    placeholder="Insira uma descrição"
                    onChange={onChangeInput}
                    rows={5}
                    value={dataForm.proddescription}
                  />
                </div>
              </>
            )}
          </div>

          {step < 2 && (
            <button
              type="button"
              className="btn btn-primary mt-14 cursor-pointer"
              onClick={() => setStep(step + 1)}
            >
              Próximo
            </button>
          )}

          {step >= 2 && (
            <button
              type="submit"
              className="btn btn-primary mt-14 cursor-pointer"
            >
              Enviar
            </button>
          )}
          {/* <button type="submit" className="cursor-pointer">Enviar</button> */}
        </div>
      </form>
    </Layout>
  );
}
