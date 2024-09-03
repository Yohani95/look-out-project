'use server';

import { ProspectoApiUrl } from '@/app/api/apiConfig';
import { CrudOperations } from '@/app/api/models/common/CrudOperations';
import Prospecto from '@/app/api/models/prospecto/Prospecto';

const tag = 'ProspectoActions';
const ProspectoCrud = new CrudOperations<Prospecto>(ProspectoApiUrl, tag);

export const createProspecto = async (item: Prospecto) =>
  ProspectoCrud.create(item);
export const updateProspecto = async (item: Prospecto, id: string | number) =>
  ProspectoCrud.update(item, id);
export const getProspectoById = async (id: string | number) =>
  ProspectoCrud.getById(id);
export const deleteProspecto = async (id: string | number) =>
  ProspectoCrud.deleteById(id);
export const getAllProspecto = async () => ProspectoCrud.getAll();
export const revalidateDataProspecto = async () =>
  ProspectoCrud.revalidateData();
