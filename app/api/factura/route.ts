import { NextResponse } from "next/server";
import {tipoFacturacionCrud}  from "@/app/api/actions/factura/TipoFacturacionActions";
import TipoFacturacion from "../models/factura/TipoFacturacion";

export const GET = async () => {
    return tipoFacturacionCrud.getAll().then((response) => {
        return new Response(JSON.stringify(response), {
            headers: { "content-type": "application/json" },
        });
    });
  };

  //queda correguir esta parte
  export  const POST = async () => {
    return tipoFacturacionCrud.create(new TipoFacturacion).then((response) => {
        return NextResponse.json({response});
    });
  }