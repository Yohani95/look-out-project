'use server';

import { EstadoReunionProspectoApiUrl } from '@/app/api/apiConfig';
import { CrudOperations } from '@/app/api/models/common/CrudOperations';
import EstadoReunionProspecto from '@/app/api/models/prospecto/EstadoReunionProspecto';

const tag = 'EstadoReunionProspectoActions';
const EstadoReunionProspectoCrud = new CrudOperations<EstadoReunionProspecto>(
  EstadoReunionProspectoApiUrl,
  tag
);

export const createEstadoReunionProspecto = async (
  item: EstadoReunionProspecto
) => EstadoReunionProspectoCrud.create(item);
export const updateEstadoReunionProspecto = async (
  item: EstadoReunionProspecto,
  id: string | number
) => EstadoReunionProspectoCrud.update(item, id);
export const getEstadoReunionProspectoById = async (id: string | number) =>
  EstadoReunionProspectoCrud.getById(id);
export const deleteEstadoReunionProspecto = async (id: string | number) =>
  EstadoReunionProspectoCrud.deleteById(id);
export const getAllEstadoReunionProspecto = async () =>
  EstadoReunionProspectoCrud.getAll();
export const revalidateDataEstadoReunionProspecto = async () =>
  EstadoReunionProspectoCrud.revalidateData();
