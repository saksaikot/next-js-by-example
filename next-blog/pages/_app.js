import Head from "next/head";
import React from "react";
import NavBar from "../components/NavBar";
import "../styles/global.css";

export default function _app({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="icons/favicon.ico" />
      </Head>
      <header>
        <NavBar />
      </header>
      <Component {...pageProps} />
    </>
  );
}
