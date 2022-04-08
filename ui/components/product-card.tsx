
import Image from "next/image";
import NumberFormat from "react-number-format";
import Link from "next/link";

export default function ProducerCard(props:any){
    const item = props.item;
    return (
        <Link key={item.id} href={`/products/${item.id}`}>
            <a className="flex flex-col items-center bg-white rounded-lg border shadow-md hover:bg-gray-100">
            <div className="flex w-full h-full relative justify-center">
                <Image
                    className="object-cover w-full h-96 rounded-none rounded-t-lg"
                    src="/placeholder.png"
                    width={125}
                    height={125}
                    alt={item.name}
                />
            </div>
            <div className="flex flex-col justify-between px-4 py-2 leading-normal w-full">
                <div className="flex flex-row justify-between">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                    {item.name}
                </h5>
                <p>
                    <NumberFormat
                    className="font-bold text-emerald-800 text-2xl"
                    value={item.price}
                    displayType="text"
                    prefix="R$"
                    decimalSeparator=","
                    thousandSeparator="."
                    decimalScale={2}
                    fixedDecimalScale
                    />{" "}
                    <span>cada {item.unitOfMeas}</span>
                </p>
                </div>
                <hr className="mb-2 w-full" />
                <p>
                <span className="font-bold">Tipologia</span>:{" "}
                {item.typology}
                </p>
            </div>
            </a>
        </Link>
    );
}