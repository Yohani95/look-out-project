"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { Hero_content } from "../Hero_content";
import Login from "../Auth/Login";
function Hero({locale}) {
  const { data: session, status } = useSession(); // Estado para controlar el estado de carga
  let translations;
  translations = require(`@/messages/${locale}.json`);
  if (status === "loading") {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "20vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">{translations.Common.loading}...</span>
        </div>
      </div>
    );
  } 

  return <main>{session ? <Hero_content /> : <Login translations={translations}/>}</main>;
}

export default Hero;
