import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'; // Shadcn components

type ResumenFacturasProps = {
  resumen: {
    Solicitadas: number;
    Facturadas: number;
    Enviadas: number;
    Vencidas: number;
    Pagadas: number;
  };
};

const ResumenFacturas: React.FC<ResumenFacturasProps> = ({ resumen }) => {
  return (
    <div className="flex space-x-2 overflow-x-auto mb-2">
      {Object.entries(resumen).map(([key, value]) => (
        <Card key={key} className="flex-shrink-0 w-24 p-2 shadow-sm border">
          <CardHeader className="p-1">
            <p
              className="text-xs font-medium text-center"
              style={{ color: '#2f4bce' }}
            >
              {key}
            </p>
          </CardHeader>
          <CardContent className="p-1">
            <p className="text-sm font-bold text-center">{value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ResumenFacturas;
