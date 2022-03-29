import Head from "next/head";
import Navbar from "./navbar";
import Footer from "./footer";
import classNames from "classnames";
import { ReactNode } from "react";

export default function Layout({
  children,
  title = "This is the default title",
  center = false,
}: {
  children: ReactNode;
  title?: string;
  center?: boolean;
}) {
  return (
    <div>
      <Head>
        <title>NutriVerde - {title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div
        className={classNames({
          flex: true,
          "flex-col": true,
          "h-screen": true,
          "justify-between": center,
        })}
      >
        <Navbar />
        <div
          className={classNames({
            "mb-auto": !center,
          })}
        >
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
}
