'use server';

import { EtapaProyectoDesarrolloApiUrl } from '@/app/api/apiConfig';
import { CrudOperations } from '@/app/api/models/common/CrudOperations';
import EtapaProyectoDesarrollo from '@/app/api/models/proyectoDesarrollo/EtapaProyectoDesarrollo';

const tag = 'EtapaProyectoDesarrolloActions';
const EtapaProyectoDesarrolloCrud = new CrudOperations<EtapaProyectoDesarrollo>(
  EtapaProyectoDesarrolloApiUrl,
  tag
);

export const createEtapaProyectoDesarrollo = async (
  item: EtapaProyectoDesarrollo
) => EtapaProyectoDesarrolloCrud.create(item);
export const updateEtapaProyectoDesarrollo = async (
  item: EtapaProyectoDesarrollo,
  id: string | number
) => EtapaProyectoDesarrolloCrud.update(item, id);
export const getEtapaProyectoDesarrolloById = async (id: string | number) =>
  EtapaProyectoDesarrolloCrud.getById(id);
export const deleteEtapaProyectoDesarrollo = async (id: string | number) =>
  EtapaProyectoDesarrolloCrud.deleteById(id);
export const getAllEtapaProyectoDesarrollo = async () =>
  EtapaProyectoDesarrolloCrud.getAll();
export const revalidateDataEtapaProyectoDesarrollo = async () =>
  EtapaProyectoDesarrolloCrud.revalidateData();
