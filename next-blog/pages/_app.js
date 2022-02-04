import React from "react";
import NavBar from "../components/NavBar";
import "../styles/global.css";

export default function _app({ Component, pageProps }) {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <Component {...pageProps} />
    </>
  );
}
