import React from 'react';
import { getLocale } from 'next-intl/server';
import BasePages from '@/app/[locale]/components/common/BasePages';
import FacturasSolicitadasSearch from '../../components/facture/FacturasSolicitadas/FacturasSolicitadasSearch';
import { getAllPreSolicitadaFacturaPeriodo } from '@/app/api/actions/factura/FacturaPeriodoActions';
import { getAllMoneda } from '@/app/api/actions/world/Moneda';
import Moneda from '@/app/api/models/world/Moneda';
import { getAllBanco } from '@/app/api/actions/factura/BancoActions';
import Banco from '@/app/api/models/factura/Banco';
async function page() {
  const locale = await getLocale();
  const t = require(`@/messages/${locale}.json`);
  const facturas = await getAllPreSolicitadaFacturaPeriodo();
  const monedasresult = (await getAllMoneda()) as Moneda[];
  const monedas = monedasresult.map((moneda) => {
    return new Moneda(moneda).getSelectOptions();
  });
  const bancos = await getAllBanco();
  const bancosOptions = bancos.map((b) => new Banco(b).getSelectOptions());
  return (
    <BasePages title={t.Nav.facture.billing}>
      <FacturasSolicitadasSearch
        t={t}
        facturas={facturas}
        monedas={monedas}
        bancos={bancosOptions}
      />
    </BasePages>
  );
}

export default page;
