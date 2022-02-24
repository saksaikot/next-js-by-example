import Head from "next/head";
import React, { useState } from "react";
import { useCartOpen } from "../hooks/pages";
import NavBar from "./NavBar";
import SideModal from "./SideModal";
import Title from "./Title";

export default function Page({ title, children }) {
  // const [cartOpen, setCartOpen] = useState(false);
  const isCartOpen = useCartOpen();
  console.log("[Page][isCartOpen]", isCartOpen);

  return (
    <>
      <Head>
        <title>{title} - Next-Shop</title>
      </Head>
      <header className="sticky top-0 bg-white z-10">
        <NavBar />
      </header>
      <main className="p-3 lg:max-w-5xl md:max-w-3xl m-auto">
        <Title>{title}</Title>
        {children}
      </main>
      {isCartOpen && <SideModal />}
    </>
  );
}
