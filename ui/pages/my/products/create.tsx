import classNames from "classnames";
import { Formik, FormikErrors } from "formik";
import Router from "next/router";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import Layout from "../../../components/layout";
import { IFile, IProduct } from "../../../interfaces";
import * as Auth from "../../../services/auth";
import * as Yup from "yup";
import InputField from "../../../components/form/input-field";

interface StepInfo {
  label: string;
  // Which fields belongs to this step, for use in validating steps.
  fields: string[];
}

export default function MyProductCreate() {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const [step, setStep] = useState(0);
  const [files, setFiles] = useState<IFile[]>([]);

  const steps: StepInfo[] = [
    {
      label: "Informações do produto",
      fields: ["name", "typology", "quantity"],
    },
    {
      label: "Informações adicionais para a venda",
      fields: ["cropDate", "price", "specialDeliveryConditions"],
    },
    {
      label: "Descrição do produto",
      fields: ["description", "cover", "images"],
    },
  ];

  const typologies = [
    "Desconhecido",
    "Apicultura",
    "Cereais",
    "Frutas",
    "Hortaliças",
    "Laticínios e derivados",
    "Proteína de origem animal",
    "Raizes e turbéculos",
    "Refeições",
    "Sementes e mudas",
    "Legumes",
    "Panificação",
    "Doces, mel, melado e geléias",
    "Bebidas e polpas",
    "Chás e ervas",
    "Embutidos",
    "Conservas",
  ];

  var token: any;
  if (typeof window !== "undefined") {
    token = Auth.getToken();
  }

  // Sets initialValues before Formik for it to know it is a IProduct.
  const initialValues: IProduct = {
    id: 0,
    name: "",
    typology: "",
    quantity: 0,
    cropDate: "",
    price: 0,
    specialDeliveryConditions: "",
    description: "",
    unitOfMeas: "KG", // FIXME: select Unit of measure
    producerId: 1, // This id must be in a autorization fild in the req header
    cover: "",
    images: [] as string[],
  };

  const onDropAccepted =
    (setFieldValue: (field: string, value: any) => void) =>
    async (files: File[]) => {
      // Uploads files to server.
      const promises = files.map(async (f) => {
        const data = new FormData();
        data.append("file", f);

        const res = await fetch(`${serverUrl}/files`, {
          method: "POST",
          body: data,
        });

        if (res.status < 200 && res.status >= 300) {
          console.error("error uploading file", res);
          throw new Error(`error uploading file: status code ${res.status}`);
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

      setFieldValue("cover", uploadedFiles?.length ? uploadedFiles[0].id : "");
      setFieldValue("images", uploadedFiles?.map((item) => item.id) ?? []);
      setFiles(uploadedFiles);
    };

  const submit = async (values: IProduct) => {
    console.log(values);
    return;

    const requestOptions = {
      method: "POST",
      headers: {
        "x-auth-token": `${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values }),
    };

    const res = await fetch(`${serverUrl}/products`, requestOptions);

    if (res.status < 200 || res.status >= 300) {
      console.log("Error creating product", res);
      return;
    }

    Router.push("/my/products");
  };

  const updateStep =
    (
      errors: FormikErrors<IProduct>,
      setFieldTouched: (field: string) => void
    ) =>
    () => {
      const stepInfo = steps[step];
      stepInfo.fields.forEach((item) => setFieldTouched(item));
      const hasError = stepInfo.fields.reduce(
        (previous, current) =>
          previous || !!errors[current as keyof FormikErrors<IProduct>],
        false
      );

      if (!hasError) {
        setStep(step + 1);
      }
    };

  return (
    <Layout title="Registro de Produtos">
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          name: Yup.string().required("Obrigatório"),
          typology: Yup.string()
            .oneOf(typologies, "Deve ser um tipo válido")
            .required("Obrigatório"),
          quantity: Yup.number()
            .integer()
            .positive("Deve ser maior que 0")
            .required("Obrigatório"),
          cropDate: Yup.date()
            .max(new Date(), "Deve ser no máximo de hoje")
            .required("Obrigatório"),
          price: Yup.number()
            .positive("Deve ser maior que 0")
            .required("Obrigatório"),
          specialDeliveryConditions: Yup.string().optional(),
          description: Yup.string().required("Obrigatório"),
          unitOfMeas: Yup.string().required("Obrigatório"),
          cover: Yup.string().required("Obrigatório"),
          images: Yup.array().min(1, "Deve conter no mínimo 1 imagem"),
        })}
        onSubmit={submit}
      >
        {({
          values,
          isValid,
          isSubmitting,
          errors,
          setFieldValue,
          setFieldTouched,
          handleSubmit,
          validateField,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="container mx-auto p-4 flex flex-col justify-content-center">
              <ul className="steps steps-horizontal mb-14">
                {steps.map((item, i) => (
                  <li
                    key={i}
                    onClick={() => setStep(i)}
                    className={classNames("step cursor-pointer", {
                      "step-primary": step >= i,
                    })}
                  >
                    {item.label}
                  </li>
                ))}
              </ul>

              <div className="grid lg:grid-cols-2 gap-8 lg:gap-y-12">
                {step === 0 ? (
                  <>
                    <InputField
                      label="Nome do produto"
                      type={"text"}
                      name="name"
                    />

                    <InputField
                      label="Tipo do produto"
                      as={"select"}
                      name="typology"
                    >
                      <option value="" disabled>
                        Selecione o tipo
                      </option>
                      {typologies.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </InputField>

                    <InputField
                      label="Quantidade"
                      type={"number"}
                      name="quantity"
                    />
                  </>
                ) : null}

                {step === 1 ? (
                  <>
                    <InputField label="Safra" type={"date"} name="cropDate" />
                    <InputField label="Preço" type={"number"} name="price" />
                    <InputField
                      label="Condições de entrega"
                      type={"text"}
                      name="specialDeliveryConditions"
                    />
                  </>
                ) : null}

                {step === 2 ? (
                  <>
                    <div className="col-span-2">
                      <InputField
                        label="Descrição"
                        name="description"
                        as={"textarea"}
                      />
                    </div>

                    <section className="col-span-2">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Imagens
                      </p>

                      <Dropzone
                        accept={"image/*"}
                        onDropAccepted={onDropAccepted(setFieldValue)}
                        maxFiles={5}
                        maxSize={100 * 1024 * 1024} // 100MB
                      >
                        {({ getRootProps, getInputProps }) => (
                          <div
                            {...getRootProps()}
                            className="w-full text-center border-dashed border-2 border-gray-300 py-12"
                          >
                            <input {...getInputProps()} name="files" />
                            <p className="text-gray-400">
                              Clique ou jogue as imagens aqui
                            </p>
                          </div>
                        )}
                      </Dropzone>

                      {files.length > 0 ? (
                        <>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-6 mb-4">
                            Selecione uma imagem como cover:
                          </p>
                          <aside className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-1">
                            {files.map((item) => (
                              <img
                                key={item.id}
                                src={item.preview}
                                className={classNames("cursor-pointer p-1", {
                                  "border-solid border-2 border-emerald-800 rounded-md":
                                    values.cover === item.id,
                                })}
                                onClick={() => setFieldValue("cover", item.id)}
                              />
                            ))}
                          </aside>
                        </>
                      ) : null}
                    </section>
                  </>
                ) : null}
              </div>

              {step < 2 ? (
                <button
                  type="button"
                  className="btn btn-primary mt-14"
                  onClick={updateStep(errors, setFieldTouched)}
                >
                  Próximo
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-primary mt-14 cursor-pointer"
                  disabled={!isValid || isSubmitting}
                >
                  Enviar
                </button>
              )}
            </div>
          </form>
        )}
      </Formik>
    </Layout>
  );
}
