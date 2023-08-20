"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { Hero_content } from "../Hero_content";
import Login from "../Auth/Login";
function Hero({locale}) {
  const { data: session, status } = useSession(); // Estado para controlar el estado de carga
  let translations;
  translations = require(`@/messages/${locale}.json`);
  // Simula una demora en la carga
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
  } // Tiempo en milisegundos (2 segundos en este caso)

  return <main>{session ? <Hero_content /> : <Login translations={translations}/>}</main>;
}

export default Hero;
