'use server';
import Banco from '@/app/api/models/factura/Banco';
import { BancoApiUrl } from '@/app/api/apiConfig';
import { CrudOperations } from '@/app/api/models/common/CrudOperations';

const tag = 'BancoActions';
const BancoCrud = new CrudOperations<Banco>(BancoApiUrl, tag);

export const createBanco = async (item: Banco) => BancoCrud.create(item);
export const updateBanco = async (item: Banco, id: string | number) =>
  BancoCrud.update(item, id);
export const getBancoById = async (id: string | number) =>
  BancoCrud.getById(id);
export const deleteBanco = async (id: string | number) =>
  BancoCrud.deleteById(id);
export const getAllBanco = async () => BancoCrud.getAll();
export const revalidateDataBanco = async () => BancoCrud.revalidateData();
