import TarifarioVentaLicenciaEdit from '@/app/[locale]/components/licencia/tarifario/TarifarioVentaLicenciaEdit';
import { getdocumentoLicenciaById } from '@/app/actions/licencia/DocumentoLicenciaActions';
import { getAllMarcaLicencia } from '@/app/actions/licencia/MarcaLicenciaActions';
import { getAllMayoristaLicencia } from '@/app/actions/licencia/MayoristaLicencia';
import { getTarifarioVentaLicenciaById } from '@/app/actions/licencia/TarifarioVentaLicencia';
import MarcaLicencia from '@/app/api/models/licencia/MarcaLicencia';
import MayoristaLicencia from '@/app/api/models/licencia/MayoristaLicencia';
import { getLocale } from 'next-intl/server';
import { fetchMoneda } from '@/app/[locale]/utils/country/moneda/UtilsMoneda';
import React from 'react';
import BasePages from '@/app/[locale]/components/common/BasePages';
import { getAllTipoLicenciaOportunidad } from '@/app/actions/Oportunidad/TipoLicenciaOportunidadActions';
import TipoLicenciaOportunidad from '@/app/api/models/oportunidad/TipoLicenciaOportunidad';

async function page({ params }) {
  const locale = await getLocale();
  const t = require(`@/messages/${locale}.json`);
  const data = await GetData(params.idTarifa);
  return (
    <>
      <BasePages title={t.Common.licenses}>
        <TarifarioVentaLicenciaEdit
          data={data}
          idTarifa={params.idTarifa}
          t={t}
        />
      </BasePages>
    </>
  );
}
const GetData = async (id: number) => {
  try {
    const [monedas, marca, mayorista, tarifa, licencias] = await Promise.all([
      fetchMoneda(),
      getAllMarcaLicencia(),
      getAllMayoristaLicencia(),
      getTarifarioVentaLicenciaById(id),
      getAllTipoLicenciaOportunidad(),
    ]);
    const mappedMonedas = monedas.map((moneda) => ({
      value: moneda.monId,
      label: moneda.monNombre,
    }));

    const mappedMarca = marca.map((marca) => {
      return new MarcaLicencia(marca).getSelectOptions();
    });
    const mappedMayorista = mayorista.map((mayorista) => {
      return new MayoristaLicencia(mayorista).getSelectOptions();
    });
    const mappedLicencias = licencias.map((licencia) => {
      return new TipoLicenciaOportunidad(licencia).getSelectOptions();
    });
    return {
      monedas: mappedMonedas,
      marca: mappedMarca,
      mayorista: mappedMayorista,
      tarifa: tarifa,
      licencias: mappedLicencias,
    };
  } catch (error) {
    // Manejo de errores si alguna de las operaciones falla
    console.error('Error al obtener los datos:', error);
    throw error;
  }
};
export default page;
