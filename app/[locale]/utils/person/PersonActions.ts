"use server";

import { personApiUrl, personTipoPersonaApiUrl } from "@/app/api/apiConfig";
import { Constantes } from "@/app/api/models/common/Constantes";
import { revalidatePath, revalidateTag } from "next/cache";
import { handleFormSubmit } from "../Form/UtilsForm";
export const fetchAllProfessionals = async () => {
  try {
    const response = await fetch(
      `${personTipoPersonaApiUrl}/${Constantes.TipoPersona.PERSONA_PROFESIONAL}`,
      { cache: "no-cache" ,next:{tags:["profesionales"]}}
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
export const fetchAllContacts = async () => {
  try {
    const response = await fetch(
      `${personTipoPersonaApiUrl}/${Constantes.TipoPersona.PERSONA_CONTACTO}`,
      { cache: "no-cache" ,next:{tags:["profesionales"]}}
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
export const submitProfessional =async ()=>{
  try {
    revalidateTag("profesionales")
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};