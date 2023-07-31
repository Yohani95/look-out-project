import React from 'react'
import { useTranslations } from 'next-intl';
import From from '@/app/[locale]/components/account/Form';
import Table from '@/app/[locale]/components/account/Table'
import SelectField from '../../components/SelectField';
function page() {
  const t = useTranslations('Account');
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
    { Header: "check", accessor: 'id' },
    { Header: t('table.contacts.name'), accessor: 'name' },
    { Header: t('position'), accessor: 'position' },
    { Header: t('Email'), accessor: 'email' },
    { Header: t('phone'), accessor: 'phone' },
    { Header: t('table.contacts.owner'), accessor: 'rol' },
  ];
  const countryOptions = [
    { value: 'option1', label: 'option1' },
    { value: 'option2', label: 'option2' },
    // Agrega más opciones según sea necesario
  ];
  return (
    <div className="d-flex justify-content-center align-items-center m-4">
      <div className="card col-lg-10">
        <div className="card-header  text-center">
          <h3>{t('title')}</h3>
        </div>
        <div className='container'>
          <From t={t} />
          <div className="mb-3 row align-items-center">
            <SelectField
              options={countryOptions}
              preOption={t('select')}
              divClassName="col-sm-4 mb-2"
            />
            <div className="col-sm-3">
              <button type="button" className="btn btn-primary mb-2">
                {t('select')}
              </button>
            </div>
          </div>
          <Table columns={columns} data={data} title={t('table.contacts.title')} search={t('table.search')} />
          <div className="d-flex justify-content-end mb-3">
            <button type="button" className="btn btn-primary me-2">
              {t('saveButton')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page