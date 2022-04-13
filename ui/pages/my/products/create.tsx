import classNames from "classnames";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Layout from "../../../components/layout";

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

    const res = await fetch(`${serverUrl}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.status < 200 || res.status >= 400) {
      console.log("Error creating product", res);
      return;
    }

    Router.push("/my/products");
  };

  const [dataForm, setDataForm] = useState({
    nameprod: undefined,
    typeprod: "unknown",
    quantprod: undefined,
    prodcrop: undefined,
    prodprice: undefined,
    proddelivery: undefined,
    proddescription: undefined,
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
                <div className="relative z-0 mb-6 w-full group">
                  <input
                    type="text"
                    name="nameprod"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-800 peer"
                    placeholder=" "
                    onChange={onChangeInput}
                    value={dataForm.nameprod}
                    required
                  />
                  <label
                    htmlFor="nameprod"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Nome do produto
                  </label>
                </div>

                <div className="relative z-0 mb-6 w-full group">
                  <select
                    name="typeprod"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-800 peer"
                    placeholder=" "
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
                  <label
                    htmlFor="typeprod"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Tipo do produto
                  </label>
                </div>

                <div className="relative z-0 mb-6 w-full group">
                  <input
                    type="number"
                    name="quantprod"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-800 peer"
                    placeholder=" "
                    onChange={onChangeInput}
                    value={dataForm.quantprod}
                  />
                  <label
                    htmlFor="quantprod"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Quantidade
                  </label>
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
                <div className="relative z-0 mb-6 w-full group">
                  <input
                    type="date"
                    name="prodcrop"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-800 peer"
                    placeholder=" "
                    onChange={onChangeInput}
                    value={dataForm.prodcrop}
                  />
                  <label
                    htmlFor="prodcrop"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Safra
                  </label>
                </div>

                <div className="relative z-0 mb-6 w-full group">
                  <input
                    type="number"
                    name="prodprice"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-800 peer"
                    placeholder=" "
                    onChange={onChangeInput}
                    value={dataForm.prodprice}
                  />
                  <label
                    htmlFor="prodprice"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Preço
                  </label>
                </div>

                <div className="relative z-0 mb-6 w-full group">
                  <input
                    type="text"
                    name="proddelivery"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-800 peer"
                    placeholder=" "
                    onChange={onChangeInput}
                    value={dataForm.proddelivery}
                  />
                  <label
                    htmlFor="proddelivery"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Condições de entrega
                  </label>
                </div>

                <br />
                <br />
              </>
            )}

            {step === 2 && (
              <>
                <div className="relative z-0 mb-6 w-full group col-span-2">
                  <textarea
                    name="proddescription"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-800 peer"
                    placeholder=" "
                    onChange={onChangeInput}
                    rows={5}
                    value={dataForm.proddescription}
                  />
                  <label
                    htmlFor="proddescription"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Descrição
                  </label>
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
