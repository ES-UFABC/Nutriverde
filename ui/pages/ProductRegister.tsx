import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Layout from "../components/layout";

export default function Contato() {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const [step, setstep] = useState(0);
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
                    type="text"
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

                <div>
                  <h2>Condições de entrega:</h2>
                  <input
                    type="text"
                    name="proddelivery"
                    className="w-1/2  "
                    placeholder="Busca no local ou entrega própria?"
                    onChange={onChangeInput}
                    value={dataForm.proddelivery}
                  />
                </div>

                <br />
                <br />
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
                  className="step step-primary cursor-pointer"
                >
                  Informações do produto
                </li>
                <li
                  onClick={() => setstep(1)}
                  className="step step-primary cursor-pointer"
                >
                  Informações adicionais para a venda
                </li>
                <li onClick={() => setstep(2)} className="step cursor-pointer">
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
