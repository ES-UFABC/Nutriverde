import type { AppProps } from "next/app";
import Script from "next/script";

// CSS
import "../styles/globals.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <script src="https://unpkg.com/flowbite@1.4.1/dist/flowbite.js" />
    </>
  );
}

export default App;