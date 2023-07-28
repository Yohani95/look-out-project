import React from 'react';
import { useTranslations } from 'next-intl';
import From from '@/app/[locale]/components/account/Form';
import Table from '@/app/[locale]/components/account/Table'
function page() {
  const t = useTranslations('Ficha');
  const translations = {
    t // Aquí agregas todas las traducciones que necesites
  };
  // Aquí defines las opciones para cada select
  const data = [
    { id: 1, name: 'John Doe', position: 'Manager', email: 'john@example.com', phone: '1234567890', rol: 'Admin' },
    { id: 2, name: 'Jane Smith', position: 'Supervisor', email: 'jane@example.com', phone: '9876543210', rol: 'User' },
    { id: 3, name: 'Jane Smith', position: 'Supervisor', email: 'jane@example.com', phone: '9876543210', rol: 'User' },
    { id: 4, name: 'Jane Smith', position: 'Supervisor', email: 'jane@example.com', phone: '9876543210', rol: 'User' },
    { id: 5, name: 'Jane Smith', position: 'Supervisor', email: 'jane@example.com', phone: '9876543210', rol: 'User' },
    { id: 6, name: 'Jane Smith', position: 'Supervisor', email: 'jane@example.com', phone: '9876543210', rol: 'User' },

    // Otros objetos
  ];

  const columns = [
    { Header: t('table.id'), accessor: 'id' },
    { Header: t('table.contacts.name'), accessor: 'name' },
    { Header: t('position'), accessor: 'position' },
    { Header: t('Email'), accessor: 'email' },
    { Header: t('phone'), accessor: 'phone' },
    { Header: t('table.contacts.rol'), accessor: 'rol' },
  ];
  return (
    <div className="d-flex justify-content-center align-items-center m-4">
      <div className="card col-lg-8">
        <div className="card-header  text-center">
          <h3>{t('title')}</h3>
        </div>
        <From t={t} />
        <div className='container'>
        <Table columns={columns} data={data} title={t('table.contacts.title')} search={t('table.search')}/>
        </div>
        <div className='container'>
        <Table columns={columns} data={data} title={t('table.business.title')} search={t('table.search')}/>
        </div>
      </div>
    </div>

  )
}

export default page