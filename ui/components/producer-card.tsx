import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon } from "@heroicons/react/outline";
import { IProducer } from "../interfaces";

export default function ProducerCard({ item }: { item: IProducer }) {
  //export default function ProducerCard(props:any){
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  //const item = props.item;
  return (
    <div
      key={item.id}
      className="flex flex-col items-center bg-white rounded-lg border shadow-md"
    >
      <div className="flex w-full h-full relative justify-center">
        {item.cover && (
          <img
            className="object-cover w-full rounded-none rounded-t-lg"
            src={`${serverUrl}/files/${item.cover}`}
            alt={item.name}
          />
        )}
        {!item.cover && (
          <Image
            className="object-cover w-full rounded-none rounded-t-lg"
            src={"/placeholder.png"}
            width={125}
            height={125}
            alt={item.name}
          />
        )}
      </div>
      <div className="flex flex-col justify-between px-4 py-2 leading-normal w-full">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          {item.fantasyName}
        </h5>
        <hr className="mb-2 w-full" />
        <p>
          <span className="font-bold">Responsável</span>: {item.name}
        </p>
        <p>
          <span className="font-bold">E-mail</span>:{" "}
          <a
            href={`mailto:${item.email}`}
            className="text-emerald-800 hover:underline active:text-emerald-600"
          >
            {item.email}
          </a>
        </p>
        <div className="pt-4 flex justify-end">
          <Link href={`/producers/${item.id}`}>
            <a className="text-white bg-emerald-800 hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-emerald-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center">
              Saiba mais <ArrowRightIcon className="w-5 h-5 ml-2 -mr-1" />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
