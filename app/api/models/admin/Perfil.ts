class Perfil {
  prf_Nombre: string | null;
  prf_Descripcion: string | null;
  id: number;
  constructor(data: any) {
    this.id = data.id || 0;
    this.prf_Descripcion = data.prf_Descripcion || 'N/A';
    this.prf_Nombre = data.prf_Nombre || 'N/A';
  }
  getSelectOptions() {
    return {
      value: this.id,
      label: `${this.prf_Nombre} ${this.prf_Descripcion}`,
    };
  }
}

export default Perfil;
