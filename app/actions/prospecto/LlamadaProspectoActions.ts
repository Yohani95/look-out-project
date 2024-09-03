'use server';

import { LlamadaProspectoApiUrl } from '@/app/api/apiConfig';
import { CrudOperations } from '@/app/api/models/common/CrudOperations';
import LlamadaProspecto from '@/app/api/models/prospecto/LlamadaProspecto';

const tag = 'LlamadaProspectoActions';
const LlamadaProspectoCrud = new CrudOperations<LlamadaProspecto>(
  LlamadaProspectoApiUrl,
  tag
);

export const createLlamadaProspecto = async (item: LlamadaProspecto) =>
  LlamadaProspectoCrud.create(item);
export const updateLlamadaProspecto = async (
  item: LlamadaProspecto,
  id: string | number
) => LlamadaProspectoCrud.update(item, id);
export const getLlamadaProspectoById = async (id: string | number) =>
  LlamadaProspectoCrud.getById(id);
export const deleteLlamadaProspecto = async (id: string | number) =>
  LlamadaProspectoCrud.deleteById(id);
export const getAllLlamadaProspecto = async () => LlamadaProspectoCrud.getAll();
export const revalidateDataLlamadaProspecto = async () =>
  LlamadaProspectoCrud.revalidateData();
