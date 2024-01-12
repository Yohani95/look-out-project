
import  TipoFacturacion  from '@/app/api/models/factura/TipoFacturacion';
import { tipoFacturacionApiUrl } from '@/app/api/apiConfig';
import  {CrudOperations} from "@/app/api/models/common/CrudOperations" ;

const tag = "tipoFacturacionActions";
export const tipoFacturacionCrud = new CrudOperations<TipoFacturacion>(tipoFacturacionApiUrl,tag);
