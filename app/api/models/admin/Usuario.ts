import Persona from "./Persona";
import { Rol } from "./Rol";
import * as Yup from "yup";
export interface Usuario {
  usuNombre: string | null;
  usuContraseña: string | null;
  usuId: number;
  perId: number | null;
  prfId: number | null;
  rolId: number | null;
  usuVigente: string | null;
  rol: Rol | null; // Usa la interfaz Rol que has importado
  persona:Persona|null;
}


