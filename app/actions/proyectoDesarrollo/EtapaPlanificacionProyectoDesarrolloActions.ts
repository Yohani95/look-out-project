'use server';

import { EtapaPlanificacionProyectoDesarrolloApiUrl } from '@/app/api/apiConfig';
import { CrudOperations } from '@/app/api/models/common/CrudOperations';
import EtapaPlanificacionProyectoDesarrollo from '@/app/api/models/proyectoDesarrollo/EtapaPlanificacionProyectoDesarrollo';

const tag = 'EtapaPlanificacionProyectoDesarrolloApiUrl';
const EtapaPlanificacionProyectoDesarrolloCrud =
  new CrudOperations<EtapaPlanificacionProyectoDesarrollo>(
    EtapaPlanificacionProyectoDesarrolloApiUrl,
    tag
  );

export const createEtapaPlanificacionProyectoDesarrollo = async (
  item: EtapaPlanificacionProyectoDesarrollo
) => EtapaPlanificacionProyectoDesarrolloCrud.create(item);
export const updateEtapaPlanificacionProyectoDesarrollo = async (
  item: EtapaPlanificacionProyectoDesarrollo,
  id: string | number
) => EtapaPlanificacionProyectoDesarrolloCrud.update(item, id);
export const getEtapaPlanificacionProyectoDesarrolloById = async (
  id: string | number
) => EtapaPlanificacionProyectoDesarrolloCrud.getById(id);
export const deleteEtapaPlanificacionProyectoDesarrollo = async (
  id: string | number
) => EtapaPlanificacionProyectoDesarrolloCrud.deleteById(id);
export const getAllEtapaPlanificacionProyectoDesarrollo = async () =>
  EtapaPlanificacionProyectoDesarrolloCrud.getAll();
export const revalidateDataEtapaPlanificacionProyectoDesarrollo = async () =>
  EtapaPlanificacionProyectoDesarrolloCrud.revalidateData();
