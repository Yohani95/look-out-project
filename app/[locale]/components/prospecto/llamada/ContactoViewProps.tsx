import React from 'react';
import { Card } from 'react-bootstrap';

interface ContactoViewProps {
  contacto: {
    id: number;
    nombreCompleto: string;
    email: string;
    numero: string;
    perfilLinkedin: string;
    idTipo: number;
    idPais: number;
    cargo: string;
    pais: {
      paiId: number;
      paiNombre: string;
      lenId: number;
      codigo: string;
    };
    tipoContactoProspecto: {
      id: number;
      nombre: string;
      descripcion: string;
    };
  };
  t: any; // Función de traducción
}

const ContactoProspectoView: React.FC<ContactoViewProps> = ({
  contacto,
  t,
}) => {
  return (
    <div className="row">
      {/* Columna izquierda */}
      <div className="col-md-6">
        <p>
          <strong>{t.Common.fullName}:</strong> {contacto.nombreCompleto}
        </p>
        <p>
          <strong>{t.Common.email}:</strong> {contacto.email}
        </p>
        <p>
          <strong>{t.Common.phone}:</strong> {contacto.numero}
        </p>
        <p>
          <strong>LinkedIn:</strong> {contacto.perfilLinkedin}
        </p>
      </div>
      {/* Columna derecha */}
      <div className="col-md-6">
        <p>
          <strong>{t.Ficha.position}:</strong> {contacto.cargo}
        </p>
        <p>
          <strong>{t.Account.type}:</strong>{' '}
          {contacto.tipoContactoProspecto?.nombre}
        </p>
        <p>
          <strong>{t.Account.country}:</strong> {contacto.pais?.paiNombre}
        </p>
      </div>
    </div>
  );
};

export default ContactoProspectoView;
