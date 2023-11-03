class Novedad {
  id: number = 0;
  idPersona: number | null = null;
  idProyecto: number | null = null;
  fechaInicio: Date | null = null;
  fechaHasta: Date | null = null;
  idPerfil: number | null = null;
  idTipoNovedad: number | null = null;
  observaciones: string | null = "N/A";

  constructor() {
  }
}

export default Novedad;
