'use server';

import { MedioLlamadaProspectoApiUrl } from '@/app/api/apiConfig';
import { CrudOperations } from '@/app/api/models/common/CrudOperations';
import MedioLlamadaProspecto from '@/app/api/models/prospecto/MedioLlamadaProspecto';

const tag = 'MedioLlamadaProspectoActions';
const MedioLlamadaProspectoCrud = new CrudOperations<MedioLlamadaProspecto>(
  MedioLlamadaProspectoApiUrl,
  tag
);

export const createMedioLlamadaProspecto = async (
  item: MedioLlamadaProspecto
) => MedioLlamadaProspectoCrud.create(item);
export const updateMedioLlamadaProspecto = async (
  item: MedioLlamadaProspecto,
  id: string | number
) => MedioLlamadaProspectoCrud.update(item, id);
export const getMedioLlamadaProspectoById = async (id: string | number) =>
  MedioLlamadaProspectoCrud.getById(id);
export const deleteMedioLlamadaProspecto = async (id: string | number) =>
  MedioLlamadaProspectoCrud.deleteById(id);
export const getAllMedioLlamadaProspecto = async () =>
  MedioLlamadaProspectoCrud.getAll();
export const revalidateDataMedioLlamadaProspecto = async () =>
  MedioLlamadaProspectoCrud.revalidateData();
