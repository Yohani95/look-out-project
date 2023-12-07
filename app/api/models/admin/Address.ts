class Address
{
    dirCalle: string | null;
    dirNumero: string | null;
    dirBlock: string | null;
    dirId: number;
    perId: number | null;
    cliId: number | null;
    comId: number | null;
    tdiId: number | null;
    dirPrincipal: number | null;
    constructor(data: any) {
        // Inicializar propiedades con valores predeterminados o del objeto 'data' si está presente
        this.dirCalle = data?.dirCalle || null;
        this.dirNumero = data?.dirNumero || null;
        this.dirBlock = data?.dirBlock || "N/A";
        this.dirId = data?.dirId || 0;
        this.perId = data?.perId || null;
        this.cliId = data?.cliId || null;
        this.comId = data?.comId || 1;
        this.tdiId = data?.tdiId || 1;
        this.dirPrincipal = data?.dirPrincipal || 0;
    }
    
}
export default Address;