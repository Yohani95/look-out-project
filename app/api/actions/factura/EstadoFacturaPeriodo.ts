'use server';

import { EstadoFacturaPeriodoApiUrl } from '@/app/api/apiConfig';
import { CrudOperations } from '@/app/api/models/common/CrudOperations';
import EstadoFacturaPeriodo from '../../models/factura/EstadoFacturaPeriodo';

const tag = 'EstadoFacturaPeriodoActions';
const EstadoFacturaPeriodoCrud = new CrudOperations<EstadoFacturaPeriodo>(
  EstadoFacturaPeriodoApiUrl,
  tag
);

export const createEstadoFacturaPeriodo = async (item: EstadoFacturaPeriodo) =>
  EstadoFacturaPeriodoCrud.create(item);
export const updateEstadoFacturaPeriodo = async (
  item: EstadoFacturaPeriodo,
  id: string | number
) => EstadoFacturaPeriodoCrud.update(item, id);
export const getEstadoFacturaPeriodoById = async (id: string | number) =>
  EstadoFacturaPeriodoCrud.getById(id);
export const deleteEstadoFacturaPeriodo = async (id: string | number) =>
  EstadoFacturaPeriodoCrud.deleteById(id);
export const getAllEstadoFacturaPeriodo = async () =>
  EstadoFacturaPeriodoCrud.getAll();
export const revalidateDataEstadoFacturaPeriodo = async () =>
  EstadoFacturaPeriodoCrud.revalidateData();
