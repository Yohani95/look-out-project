import Cliente from '../cuenta/Cliente';

interface PeriodoGenerico {
  id: number | null;
  pryId: number | null;
  fechaPeriodoDesde: Date | null;
  fechaPeriodoHasta: Date | null;
  monto: number | null;
  proyecto: {
    pryId: number | null;
    idTipoFacturacion: number | null;
    pryNombre: string | null;
    cliente: Cliente | null;
  };
}
export default PeriodoGenerico;
