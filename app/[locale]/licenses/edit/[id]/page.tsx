import React from 'react';
import { fetchMoneda } from "@/app/[locale]/utils/country/moneda/UtilsMoneda";
import fetchCountriest from "@/app/[locale]/utils/country/Countrylist";
import { fechtClients } from "@/app/[locale]/utils/client/ClientFormLogic";
import { getAllEmpresaPrestadora } from '@/app/api/actions/proyecto/EmpresaPrestadoraActions';
import { useLocale } from 'next-intl';
import BasePages from "@/app/[locale]/components/common/BasePages";
import EmpresaPrestadora from "@/app/api/models/proyecto/EmpresaPrestadora";
import VentaLicenciaCreate from '../../../components/licencia/VentaLicenciaCreate';
import { getAllEstadoVentaLicencia } from '@/app/actions/licencia/EstadoLicenciaVentaActions';
import EstadoVentaLicencia from '@/app/api/models/licencia/EstadoVentaLicencia';
import { getAllTipoFacturacion } from '@/app/api/actions/factura/TipoFacturacionActions';
import TipoFacturacion from '@/app/api/models/factura/TipoFacturacion';
import VentaLicenciaEdit from '../../../components/licencia/VentaLicenciaEdit';
import { Constantes } from '@/app/api/models/common/Constantes';
import { getAllByIdTipoPersona } from '@/app/actions/admin/PersonaActions';
import Persona from '@/app/api/models/admin/Persona';
import { getVentaLicenciaById } from '@/app/actions/licencia/VentaLicenciaActions';

async function page({params}) {
    const locale = useLocale();
    const t = require(`@/messages/${locale}.json`);
    const data = await GetData(params.id);
    return (
        <BasePages title={t.Common.licenses}>
            <VentaLicenciaEdit data={data} t={t} />
        </BasePages>
    )
}
const GetData = async (id: number) => {
    try {
        const [monedas, paises, clientes, empresaPrestadora,estadoVentaLicencia,tipofacturacion,personasKam,ventaLicencia] =
            await Promise.all([
                fetchMoneda(),
                fetchCountriest(),
                fechtClients(),
                getAllEmpresaPrestadora(),
                getAllEstadoVentaLicencia(),
                getAllTipoFacturacion(),
                getAllByIdTipoPersona(Constantes.TipoPersona.PERSONA_KAM),
                getVentaLicenciaById(id)
            ]);

        const mappedMonedas = monedas.map((moneda) => ({
            value: moneda.monId,
            label: moneda.monNombre,
        }));

        const mappedPaises = paises.map((country) => ({
            value: country.paiId,
            label: country.paiNombre,
        }));

        const mappedclientes = clientes.map((item) => ({
            value: item.cliId,
            label: item.cliNombre,
        }));
        const mappedEmpresaEmprestadora = empresaPrestadora.map((empresa) => { return new EmpresaPrestadora(empresa).getSelectOptions() });
        const mappedEstadoVentaLicencia = estadoVentaLicencia.map((tipo) => { return new EstadoVentaLicencia(tipo).getSelectOptions() });
        const mappedTipoFacturacion=tipofacturacion.map((tipoFactura) => { return new TipoFacturacion(tipoFactura).getSelectOptions() }); 
        const mappedPersonaKam=personasKam.map((kam)=>{return new Persona(kam).getSelectOptions()})
        return {
            monedas: mappedMonedas,
            paises: mappedPaises,
            clientes: mappedclientes,
            empresaPrestadora: mappedEmpresaEmprestadora,
            estadoVentaLicencia: mappedEstadoVentaLicencia,
            tipofacturacion:mappedTipoFacturacion,
            personasKam:mappedPersonaKam,
            ventaLicencia
        };
    } catch (error) {
        // Manejo de errores si alguna de las operaciones falla
        console.error("Error al obtener los datos:", error);
        throw error;
    }
};
export default page