class Persona {
    id: number;
    perIdNacional: string;
    perNombres: string;
    perApellidoPaterno: string;
    perApellidoMaterno: string;
    paiId: number | null;
    tpeId: number | null;
    perFechaNacimiento: string | null;
    tipoPersona: string | null;
  
    constructor(data: any) {
      this.id = data.id || 0;
      this.perIdNacional = data.perIdNacional || "N/A";
      this.perNombres = data.perNombres || "N/A";
      this.perApellidoPaterno = data.perApellidoPaterno || "N/A";
      this.perApellidoMaterno = data.perApellidoMaterno || "N/A";
      this.paiId = data.paiId || null;
      this.tpeId = data.tpeId || null;
      this.perFechaNacimiento = data.perFechaNacimiento || null;
      this.tipoPersona = data.tipoPersona || null;
    }
    
    getNombreCompleto(): string {
      return `${this.perNombres} ${this.perApellidoPaterno} ${this.perApellidoMaterno}`;
    }
  }

  export default Persona;