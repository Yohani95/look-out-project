'use server';

import { ReunionProspectoApiUrl } from '@/app/api/apiConfig';
import { CrudOperations } from '@/app/api/models/common/CrudOperations';
import ReunionProspecto from '@/app/api/models/prospecto/ReunionProspecto';

const tag = 'ReunionProspectoActions';
const ReunionProspectoCrud = new CrudOperations<ReunionProspecto>(
  ReunionProspectoApiUrl,
  tag
);

export const createReunionProspecto = async (item: ReunionProspecto) =>
  ReunionProspectoCrud.create(item);
export const updateReunionProspecto = async (
  item: ReunionProspecto,
  id: string | number
) => ReunionProspectoCrud.update(item, id);
export const getReunionProspectoById = async (id: string | number) =>
  ReunionProspectoCrud.getById(id);
export const deleteReunionProspecto = async (id: string | number) =>
  ReunionProspectoCrud.deleteById(id);
export const getAllReunionProspecto = async () => ReunionProspectoCrud.getAll();
export const revalidateDataReunionProspecto = async () =>
  ReunionProspectoCrud.revalidateData();
