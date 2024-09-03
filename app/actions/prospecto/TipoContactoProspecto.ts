'use server';

import { TipoContactoProspectoApiUrl } from '@/app/api/apiConfig';
import { CrudOperations } from '@/app/api/models/common/CrudOperations';
import TipoContactoProspecto from '@/app/api/models/prospecto/TipoContactoProspecto';

const tag = 'TipoContactoProspectoActions';
const TipoContactoProspectoCrud = new CrudOperations<TipoContactoProspecto>(
  TipoContactoProspectoApiUrl,
  tag
);

export const createTipoContactoProspecto = async (
  item: TipoContactoProspecto
) => TipoContactoProspectoCrud.create(item);
export const updateTipoContactoProspecto = async (
  item: TipoContactoProspecto,
  id: string | number
) => TipoContactoProspectoCrud.update(item, id);
export const getTipoContactoProspectoById = async (id: string | number) =>
  TipoContactoProspectoCrud.getById(id);
export const deleteTipoContactoProspecto = async (id: string | number) =>
  TipoContactoProspectoCrud.deleteById(id);
export const getAllTipoContactoProspecto = async () =>
  TipoContactoProspectoCrud.getAll();
export const revalidateDataTipoContactoProspecto = async () =>
  TipoContactoProspectoCrud.revalidateData();
