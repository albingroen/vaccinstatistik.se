import "../styles/globals.css";
import splitbee from "@splitbee/web";

// This initiliazes Splitbee.js
splitbee.init();

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
