'use server';

import { facturaPeriodoApiUrl } from '@/app/api/apiConfig';
import { CrudOperations } from '@/app/api/models/common/CrudOperations';
import FacturaPeriodo from '@/app/api/models/factura/FacturaPeriodo';

const tag = 'facturaPeriodo';

const facturaPeriodoCrud = new CrudOperations<FacturaPeriodo>(
  facturaPeriodoApiUrl,
  tag
);

export const createFacturaPeriodo = async (item: FacturaPeriodo) =>
  facturaPeriodoCrud.create(item);
export const updateFacturaPeriodo = async (
  item: FacturaPeriodo,
  id: string | number
) => facturaPeriodoCrud.update(item, id);
export const getFacturaPeriodoById = async (id: string | number) =>
  facturaPeriodoCrud.getById(id);
export const deleteFacturaPeriodo = async (id: string | number) =>
  facturaPeriodoCrud.deleteById(id);
export const getAllFacturaPeriodo = async () => facturaPeriodoCrud.getAll();
export const revalidateDataFacturaPeriodo = async () =>
  facturaPeriodoCrud.revalidateData();
export async function getFacturaPeriodoByIdPeriodo(idPeriodo: number) {
  try {
    const response = await fetch(
      `${facturaPeriodoApiUrl}/GetAllEntitiesByIdPeriod/${idPeriodo}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-cache',
        next: { tags: [tag] },
      }
    );
    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}
export async function getFacturaPeriodoByIdHoras(idHoras: number) {
  try {
    const response = await fetch(
      `${facturaPeriodoApiUrl}/GetAllEntitiesByIdHoras/${idHoras}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-cache',
        next: { tags: [tag] },
      }
    );
    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}
export async function getAllPreSolicitadaFacturaPeriodo() {
  try {
    const response = await fetch(
      `${facturaPeriodoApiUrl}/GetAllByPreSolicitada`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-cache',
        next: { tags: [tag] },
      }
    );

    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}
export async function ChangeEstado(idPeriodo: number, estado: number) {
  try {
    const response = await fetch(
      `${facturaPeriodoApiUrl}/ChangeEstado/${idPeriodo}/${estado}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-cache',
        next: { tags: [tag] },
      }
    );
    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}
export async function ChangeEstadoHoras(idHoras: number, estado: number) {
  try {
    const response = await fetch(
      `${facturaPeriodoApiUrl}/ChangeEstadoHoras/${idHoras}/${estado}`,
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
      await revalidateDataFacturaPeriodo();
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}
export async function ChangeEstadoFacturaBySoporte(
  idSoporte: number,
  estado: number
) {
  try {
    const response = await fetch(
      `${facturaPeriodoApiUrl}/ChangeEstadoSoporte/${idSoporte}/${estado}`,
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
      await revalidateDataFacturaPeriodo();
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}
export async function GetAllEntitiesByIdSoporte(idSoporte: number) {
  try {
    const response = await fetch(
      `${facturaPeriodoApiUrl}/GetAllEntitiesByIdSoporte/${idSoporte}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-cache',
        next: { tags: [tag] },
      }
    );
    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}
export async function ChangeEstadoFacturaByLicencia(
  idLicencia: number,
  estado: number
) {
  try {
    const response = await fetch(
      `${facturaPeriodoApiUrl}/ChangeEstadoLicencia/${idLicencia}/${estado}`,
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
      await revalidateDataFacturaPeriodo();
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}
export async function GetAllEntitiesByIdLicense(idLicense: number) {
  try {
    const response = await fetch(
      `${facturaPeriodoApiUrl}/GetAllEntitiesByIdLicense/${idLicense}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-cache',
        next: { tags: [tag] },
      }
    );
    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}
export async function ChangeEstadoFacturaByProyectoDesarrollo(
  idProyectoDesarrollo: number,
  estado: number
) {
  try {
    const response = await fetch(
      `${facturaPeriodoApiUrl}/ChangeEstadoProyectoDesarrollo/${idProyectoDesarrollo}/${estado}`,
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
      await revalidateDataFacturaPeriodo();
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}
export async function GetAllEntitiesFacturaByIdProyectoDesarrollo(
  idProyectoDesarrollo: number
) {
  try {
    const response = await fetch(
      `${facturaPeriodoApiUrl}/GetAllEntitiesByIdHitoProyectoDesarrollo/${idProyectoDesarrollo}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-cache',
        next: { tags: [tag] },
      }
    );
    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}
