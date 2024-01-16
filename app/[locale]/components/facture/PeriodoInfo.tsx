import PeriodosProyecto from '@/app/api/models/proyecto/PeriodosProyecto'
import React from 'react'

function PeriodoInfo({t, periodo}: {t: any, periodo: PeriodosProyecto}) {
  return (
    <>
      <div className="mb-3 row align-items-center">
        <div  className="col-sm-1 col-form-label">
          {t.Common.rut}
        </div>
        <div className="col-sm-5">
          <span className="form-control" id="rutCliente">
            {periodo?.proyecto?.cliente?.cliNif}
          </span>
        </div>
        <div  className="col-sm-1 col-form-label">
          {t.Common.account}
        </div>
        <div className="col-sm-5">
          <span className="form-control" id="name">
            {periodo?.proyecto?.cliente?.cliNombre}
          </span>
        </div>
      </div>
      <div className="mb-3 row align-items-center">
        <div  className="col-sm-1 col-form-label">
          {t.facture.project}
        </div>
        <div className="col-sm-5">
          <span className="form-control" id="project">
            {periodo?.proyecto?.pryNombre}
          </span>
        </div>
        <div  className="col-sm-1 col-form-label">
          {t.Common.milestone}
        </div>
        <div className="col-sm-5">
          <span className="form-control" id="milestone">
            {periodo && new PeriodosProyecto(periodo).getPeriodoCompleto()}
          </span>
        </div>
      </div>
      <div className="mb-3 row align-items-center">
        <div className="col-sm-1 col-form-label">
          {t.Common.amount}
        </div>
        <div className="col-sm-5">
          <span className="form-control" id="amount">
            {periodo?.monto}
          </span>
        </div>
      </div>
    </>
  )
}
export default PeriodoInfo