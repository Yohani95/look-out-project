import PeriodoGenerico from '@/app/api/models/factura/PeriodoGenerico';
import PeriodosProyecto from '@/app/api/models/proyecto/PeriodosProyecto';
import HorasUtilizadas from '@/app/api/models/support/HorasUtilizadas';
import React from 'react';
import AdaptationFactureModal from './Adapter/AdaptationFactureModal';
import FacturaAdaptacion from '@/app/api/models/factura/FacturaAdaptacion';

function PeriodoInfo({
  t,
  periodo,
  facturaAdaptacion,
}: {
  t: any;
  periodo: PeriodosProyecto | HorasUtilizadas | PeriodoGenerico;
  facturaAdaptacion?: FacturaAdaptacion | null;
}) {
  return (
    <>
      <div className="mb-3 row align-items-center">
        <div className="col-sm-1 col-form-label">{t.Common.rut}</div>
        <div className="col-sm-5">
          <span className="form-control" id="rutCliente">
            {periodo?.proyecto?.cliente?.cliNif}
          </span>
        </div>
        <div className="col-sm-1 col-form-label">{t.Common.account}</div>
        <div className="col-sm-5">
          <span className="form-control" id="name">
            {periodo?.proyecto?.cliente?.cliNombre}
          </span>
        </div>
      </div>
      <div className="mb-3 row align-items-center">
        <div className="col-sm-1 col-form-label">{t.facture.project}</div>
        <div className="col-sm-5">
          <span className="form-control" id="project">
            {periodo?.proyecto?.pryNombre}
          </span>
        </div>
        <div className="col-sm-1 col-form-label">{t.Common.milestone}</div>
        <div className="col-sm-5">
          <span className="form-control" id="milestone">
            {periodo && new PeriodosProyecto(periodo).getPeriodoCompleto()}
          </span>
        </div>
      </div>
      <div className="mb-3 row align-items-center">
        <div className="col-sm-1 col-form-label">{t.Common.amount}</div>
        <div className="col-sm-5">
          <span className="form-control" id="amount">
            {periodo?.monto}
          </span>
        </div>
      </div>
      {facturaAdaptacion ? (
        <>
          <hr />
          <h4>Factura Adaptación</h4>
          <div className="mb-3 row align-items-center">
            <div className="col-sm-1 col-form-label">
              {' '}
              Nuevo {t.Common.amount}
            </div>
            <div className="col-sm-5">
              <span className="form-control" id="amount">
                {facturaAdaptacion?.monto || 'N/A'}
              </span>
            </div>
            <div className="col-sm-1 col-form-label">
              {t.Common.amount} diferencia
            </div>
            <div className="col-sm-5">
              <span className="form-control" id="amount">
                {facturaAdaptacion?.montoDiferencia || 'N/A'}
              </span>
            </div>
          </div>
          <div className="mb-3 row align-items-center">
            <label htmlFor="state" className="col-sm-1 col-form-label">
              {t.Common.description}
            </label>
            <div className="col-sm-5">
              <textarea
                className="form-control"
                id="state"
                readOnly
                rows={
                  facturaAdaptacion?.descripcion
                    ? facturaAdaptacion.descripcion.split('\n').length
                    : 1
                }
                value={facturaAdaptacion?.descripcion || ''}
              />
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
export default PeriodoInfo;
