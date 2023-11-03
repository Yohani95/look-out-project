class Perfil {
  prf_Nombre: string | null;
  prf_Descripcion: string | null;
  id: number;
  constructor(data: any) {
    this.id = data.id || 0;
    this.prf_Descripcion = data.prf_Descripcion || "N/A";
    this.prf_Nombre = data.prf_Nombre || "N/A";
  }
}

export default Perfil;
