// pages/_app.js
import type { AppProps } from "next/app";
import Script from "next/script";
import { SessionProvider } from "next-auth/react"
// CSS
import "../styles/globals.css";

function App({ Component, pageProps: { session, ...pageProps }, }: AppProps) {
  return (
    <>
      <SessionProvider session={session}>
        <Component {...pageProps} />
     </SessionProvider>
      <script src="https://unpkg.com/flowbite@1.4.1/dist/flowbite.js" />
    </>
  );
}

export default App;
