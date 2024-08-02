'use server';
import FacturaAdaptacion from '@/app/api/models/factura/FacturaAdaptacion';
import { FacturaAdaptacionApiUrl } from '@/app/api/apiConfig';
import { CrudOperations } from '@/app/api/models/common/CrudOperations';

const tag = 'FacturaAdaptacionActions';
const FacturaAdaptacionCrud = new CrudOperations<FacturaAdaptacion>(
  FacturaAdaptacionApiUrl,
  tag
);

export const createFacturaAdaptacion = async (item: FacturaAdaptacion) =>
  FacturaAdaptacionCrud.create(item);
export const updateFacturaAdaptacion = async (
  item: FacturaAdaptacion,
  id: string | number
) => FacturaAdaptacionCrud.update(item, id);
export const getFacturaAdaptacionById = async (id: string | number) =>
  FacturaAdaptacionCrud.getById(id);
export const deleteFacturaAdaptacion = async (id: string | number) =>
  FacturaAdaptacionCrud.deleteById(id);
export const getAllFacturaAdaptacion = async () =>
  FacturaAdaptacionCrud.getAll();
export const revalidateDataFacturaAdaptacion = async () =>
  FacturaAdaptacionCrud.revalidateData();

export const GetAllFacturaAdaptacionEntitiesByIdLicense = async (
  id: number
) => {
  try {
    const response = await fetch(
      `${FacturaAdaptacionApiUrl}/GetAllEntitiesByIdLicense/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-cache',
        next: { tags: [tag] },
      }
    );
    if (response.ok) {
      if (response.status === 204) {
        return null; // Devuelve un array vacío si no hay contenido
      }
    }
    const data = await response.json();
    await revalidateDataFacturaAdaptacion();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export const GetAllFacturaAdaptacionEntitiesByIdPeriod = async (id: number) => {
  try {
    const response = await fetch(
      `${FacturaAdaptacionApiUrl}/GetAllEntitiesByIdPeriod/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-cache',
        next: { tags: [tag] },
      }
    );
    if (response.ok) {
      if (response.status === 204) {
        return null; // Devuelve un array vacío si no hay contenido
      }
    }
    const data = await response.json();
    await revalidateDataFacturaAdaptacion();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};
export const GetAllFacturaAdaptacionEntitiesByIdHoras = async (id: number) => {
  try {
    const response = await fetch(
      `${FacturaAdaptacionApiUrl}/GetAllEntitiesByIdHoras/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-cache',
        next: { tags: [tag] },
      }
    );
    if (response.ok) {
      if (response.status === 204) {
        return null; // Devuelve un array vacío si no hay contenido
      }
    }
    const data = await response.json();
    await revalidateDataFacturaAdaptacion();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export const GetAllFacturaAdaptacionEntitiesByIdSoporte = async (
  id: number
) => {
  try {
    const response = await fetch(
      `${FacturaAdaptacionApiUrl}/GetAllEntitiesByIdSoporte/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-cache',
        next: { tags: [tag] },
      }
    );
    if (response.ok) {
      if (response.status === 204) {
        return null; // Devuelve un array vacío si no hay contenido
      }
    }
    const data = await response.json();
    await revalidateDataFacturaAdaptacion();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};
