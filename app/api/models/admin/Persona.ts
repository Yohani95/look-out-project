class Persona {
    id: number;
    perIdNacional: string;
    perNombres: string;
    perApellidoPaterno: string;
    perApellidoMaterno: string;
    paiId: number | null;
    tpeId: number | null;
    perFechaNacimiento: string | null=null;
  
    constructor(data: any) {
      if(data){
        this.id = data.id || 0;
        this.perIdNacional = data.perIdNacional || "N/A";
        this.perNombres = data.perNombres || "N/A";
        this.perApellidoPaterno = data.perApellidoPaterno || "N/A";
        this.perApellidoMaterno = data.perApellidoMaterno || "N/A";
        this.paiId = data.paiId || null;
        this.tpeId = data.tpeId || null;
        this.perFechaNacimiento = data.perFechaNacimiento || null;
      }else{
        this.id =  0;
        this.perIdNacional =  "";
        this.perNombres =  "";
        this.perApellidoPaterno =  "";
        this.perApellidoMaterno =  "";
        this.paiId =  null;
        this.tpeId =  null;
        this.perFechaNacimiento = null;
      }
    }
    
    getNombreCompleto(): string {
      return `${this.perNombres} ${this.perApellidoPaterno} ${this.perApellidoMaterno}`;
    }
  }

  export default Persona;