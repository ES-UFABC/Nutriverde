import classNames from "classnames";
import Router from "next/router";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import Layout from "../../../components/layout";

interface IFile extends File {
  id: string;
  preview: string;
}

export default function Contato() {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const [step, setStep] = useState(0);
  const [files, setFiles] = useState<IFile[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDropAccepted: async (files) => {
      // Uploads files to server.
      const promises = files.map(async (f) => {
        const data = new FormData();
        data.append("file", f);

        const res = await fetch(`${serverUrl}/files`, {
          method: "POST",
          body: data,
        });

        console.log("file uploaded", res);
        if (res.status < 200 && res.status >= 400) {
          console.error("error uploading file", res);
          return Object.assign(f, { preview: "", id: "" });
        }

        const json = await res.json();
        return Object.assign(f, {
          preview: `${serverUrl}/files/${json.name}`,
          id: json.name,
        });
      });

      const uploadedFiles = await Promise.all(promises);

      // FIXME: waits at least 1 second to load images correctly.
      await new Promise((r) => setTimeout(r, 1 * 1000));
      setDataForm({ ...dataForm, cover: uploadedFiles[0].id });

      setFiles(uploadedFiles);
    },
  });

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
      cover: dataForm.cover,
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
    nameprod: "",
    typeprod: "unknown",
    quantprod: "",
    prodcrop: "",
    prodprice: "",
    proddelivery: "",
    proddescription: "",
    cover: "",
  });

  const onChangeInput = (e: any) =>
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });

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
                    <option value="Desconhecido">Desconhecido</option>
                    <option value="Apicultura">Apicultura</option>
                    <option value="Cereais">Cereais</option>
                    <option value="Frutas">Frutas</option>
                    <option value="Hortaliças">Hortaliças</option>
                    <option value="Laticínios e derivados">
                      Laticínios e derivados
                    </option>
                    <option value="Proteína de origem animal">
                      Proteína de origem animal
                    </option>
                    <option value="Raizes e turbéculos">
                      Raizes e turbéculos
                    </option>
                    <option value="Refeições">Refeições</option>
                    <option value="Sementes e mudas">Sementes e mudas</option>
                    <option value="Legumes">Legumes</option>
                    <option value="Panificação">Panificação</option>
                    <option value="Doces, mel, melado e geléias">
                      Doces, mel, melado e geléias
                    </option>
                    <option value="Bebidas e polpas">Bebidas e polpas</option>
                    <option value="Chás e ervas">Chás e ervas</option>
                    <option value="Embutidos">Embutidos</option>
                    <option value="Conservas">Conservas</option>

                    {/* <option value="unknown">Desconhecido</option>
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
                    <option value="preserves">Conservas</option> */}
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

                <section className="col-span-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Imagens
                  </p>

                  <div
                    {...getRootProps({ className: "dropzone" })}
                    className="w-full text-center border-dashed border-2 border-gray-300 py-12"
                  >
                    <input {...getInputProps()} name="files" />
                    <p className="text-gray-400">
                      Clique ou jogue as imagens aqui
                    </p>
                  </div>

                  {files.length > 0 && (
                    <>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-6 mb-4">
                        Selecione uma imagem como cover:
                      </p>
                      <aside className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-1">
                        {files.map((file) => (
                          <img
                            src={file.preview}
                            className={classNames("cursor-pointer p-1", {
                              "border-solid border-2 border-emerald-800 rounded-md":
                                dataForm.cover === file.id,
                            })}
                            onClick={() =>
                              setDataForm({ ...dataForm, cover: file.id })
                            }
                          />
                        ))}
                      </aside>
                    </>
                  )}
                </section>
              </>
            )}
          </div>

          {step < 2 && (
            <button
              type="button"
              className="btn btn-primary mt-14"
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
        </div>
      </form>
    </Layout>
  );
}
