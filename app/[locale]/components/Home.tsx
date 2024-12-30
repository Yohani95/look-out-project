import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import AppInfo from './common/AppInfo';

export const Home = () => {
  return (
    <>
      {/* Versión y AppInfo */}
      <div className="flex justify-center items-center my-4">
        <div className="max-w-4xl text-center">
          <h6 className="text-sm font-medium text-gray-600">Version 1.0.0</h6>
          <AppInfo />
        </div>
      </div>

      {/* Hero Content */}
      <div className="flex justify-center items-center my-4">
        <Card className="max-w-4xl shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Websites done right
            </CardTitle>
            <CardDescription>
              Lorem Ipsum es simplemente el texto de relleno de las imprentas y
              archivos de texto...
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700 leading-relaxed">
              Lorem Ipsum ha sido el texto de relleno estándar de las industrias
              desde el año 1500, cuando un impresor desconocido usó una galería
              de textos y los mezcló de tal manera que logró hacer un libro de
              textos especimen. No sólo sobrevivió 500 años, sino que también
              ingresó como texto de relleno en documentos electrónicos, quedando
              esencialmente igual al original. Fue popularizado en los 60s con
              la creación de las hojas "Letraset", las cuales contenían pasajes
              de Lorem Ipsum, y más recientemente con software de autoedición,
              como por ejemplo Aldus PageMaker, el cual incluye versiones de
              Lorem Ipsum.
            </p>

            <p className="text-sm text-gray-700 leading-relaxed mt-4">
              Es un hecho establecido hace demasiado tiempo que un lector se
              distraerá con el contenido del texto de un sitio mientras que mira
              su diseño. El punto de usar Lorem Ipsum es que tiene una
              distribución más o menos normal de las letras, al contrario de
              usar textos como por ejemplo "Contenido aquí, contenido aquí".
              Estos textos hacen parecerlo un español que se puede leer. Muchos
              paquetes de autoedición y editores de páginas web usan el Lorem
              Ipsum como su texto por defecto, y al hacer una búsqueda de "Lorem
              Ipsum" va a dar por resultado muchos sitios web que usan este
              texto si se encuentran en estado de desarrollo. Muchas versiones
              han evolucionado a través de los años, algunas veces por
              accidente, otras veces a propósito (por ejemplo insertándole humor
              y cosas por el estilo).
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
