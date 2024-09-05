'use server';

import { clientApiUrl } from '@/app/api/apiConfig';
import { CrudOperations } from '@/app/api/models/common/CrudOperations';
import Cliente from '@/app/api/models/cuenta/Cliente';

const tag = 'ClienteActions';
const ClienteCrud = new CrudOperations<Cliente>(clientApiUrl, tag);

export const createCliente = async (item: Cliente) => ClienteCrud.create(item);
export const updateCliente = async (item: Cliente, id: string | number) =>
  ClienteCrud.update(item, id);
export const getClienteById = async (id: string | number) =>
  ClienteCrud.getById(id);
export const deleteCliente = async (id: string | number) =>
  ClienteCrud.deleteById(id);
export const getAllCliente = async () => ClienteCrud.getAll();
export const revalidateDataCliente = async () => ClienteCrud.revalidateData();
