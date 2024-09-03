'use server';

import { EstadoProspectoApiUrl } from '@/app/api/apiConfig';
import { CrudOperations } from '@/app/api/models/common/CrudOperations';
import EstadoProspecto from '@/app/api/models/prospecto/EstadoProspecto';

const tag = 'EstadoProspectoActions';
const EstadoProspectoCrud = new CrudOperations<EstadoProspecto>(
  EstadoProspectoApiUrl,
  tag
);

export const createEstadoProspecto = async (item: EstadoProspecto) =>
  EstadoProspectoCrud.create(item);
export const updateEstadoProspecto = async (
  item: EstadoProspecto,
  id: string | number
) => EstadoProspectoCrud.update(item, id);
export const getEstadoProspectoById = async (id: string | number) =>
  EstadoProspectoCrud.getById(id);
export const deleteEstadoProspecto = async (id: string | number) =>
  EstadoProspectoCrud.deleteById(id);
export const getAllEstadoProspecto = async () => EstadoProspectoCrud.getAll();
export const revalidateDataEstadoProspecto = async () =>
  EstadoProspectoCrud.revalidateData();
