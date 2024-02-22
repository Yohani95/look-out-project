class DiaPagos{
    id: number | null;
    dia: number | null;
  
    constructor(data?: any) {
      this.id = data?.id || 0;
      this.dia= data?.dia || null;
    }
  
    static createColumns(t: any) {
      return [
        {
          accessorKey: "id",
          header: "ID",
          size: 50,
        },
        {
          accessorKey: "nombre",
          header: `${t.Common.name}`,
          size: 150,
        },
        {
          accessorKey: "descripcion",
          header: `${t.Common.comment}`,
          size: 150,
        },
        // Agregar más columnas según sea necesario
      ];
    }
    getSelectOptions() {
      return {
        value: this.id,
        label: this.dia,
      };
    }
}

export default DiaPagos;