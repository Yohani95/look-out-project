'use server';

import { IndustriaApiUrl } from '@/app/api/apiConfig';
import { CrudOperations } from '@/app/api/models/common/CrudOperations';
import Industria from '@/app/api/models/prospecto/Industria';

const tag = 'IndustriaActions';
const IndustriaCrud = new CrudOperations<Industria>(IndustriaApiUrl, tag);

export const createIndustria = async (item: Industria) =>
  IndustriaCrud.create(item);
export const updateIndustria = async (item: Industria, id: string | number) =>
  IndustriaCrud.update(item, id);
export const getIndustriaById = async (id: string | number) =>
  IndustriaCrud.getById(id);
export const deleteIndustria = async (id: string | number) =>
  IndustriaCrud.deleteById(id);
export const getAllIndustria = async () => IndustriaCrud.getAll();
export const revalidateDataIndustria = async () =>
  IndustriaCrud.revalidateData();
