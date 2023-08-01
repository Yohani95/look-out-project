import React from "react";
import MyTitle from "@/app/[locale]/components/common/MyTitle";
import Table from "@/app/[locale]/components/common/CommonTable";
import { useTranslations } from 'next-intl';
function page() {
  const t = useTranslations();
  const data = [
    { id: 1, name: 'John Doe', position: 'Manager', email: 'john@example.com', phone: '1234567890', rol: 'Admin',account: 'account' },
    { id: 2, name: 'Jane Smith', position: 'Supervisor', email: 'jane@example.com', phone: '9876543210', rol: 'User',account: 'account' },
    { id: 3, name: 'Jane Smith', position: 'Supervisor', email: 'jane@example.com', phone: '9876543210', rol: 'User',account: 'account' },
    { id: 4, name: 'Jane Smith', position: 'Supervisor', email: 'jane@example.com', phone: '9876543210', rol: 'User',account: 'account' },
    { id: 5, name: 'Jane Smith', position: 'Supervisor', email: 'jane@example.com', phone: '9876543210', rol: 'User',account: 'account' },
    { id: 6, name: 'Jane Smith', position: 'Supervisor', email: 'jane@example.com', phone: '9876543210', rol: 'User',account: 'account' },
    { id: 6, name: 'Jane Smith', position: 'Supervisor', email: 'jane@example.com', phone: '9876543210', rol: 'User',account: 'account' },
    { id: 6, name: 'Jane Smith', position: 'Supervisor', email: 'jane@example.com', phone: '9876543210', rol: 'User',account: 'account' },
    { id: 6, name: 'Jane Smith', position: 'Supervisor', email: 'jane@example.com', phone: '9876543210', rol: 'User',account: 'account' },
    { id: 6, name: 'Jane Smith', position: 'Supervisor', email: 'jane@example.com', phone: '9876543210', rol: 'User',account: 'account' },
    { id: 6, name: 'Jane Smith', position: 'Supervisor', email: 'jane@example.com', phone: '9876543210', rol: 'User',account: 'account' },
    { id: 6, name: 'Jane Smith', position: 'Supervisor', email: 'jane@example.com', phone: '9876543210', rol: 'User',account: 'account' },
    { id: 6, name: 'Jane Smith', position: 'Supervisor', email: 'jane@example.com', phone: '9876543210', rol: 'User',account: 'account' },
    { id: 6, name: 'Jane Smith', position: 'Supervisor', email: 'jane@example.com', phone: '9876543210', rol: 'User',account: 'account' },
    { id: 6, name: 'Jane Smith', position: 'Supervisor', email: 'jane@example.com', phone: '9876543210', rol: 'User',account: 'account' },{ id: 6, name: 'Jane Smith', position: 'Supervisor', email: 'jane@example.com', phone: '9876543210', rol: 'User',account: 'account' },
    { id: 6, name: 'Jane Smith', position: 'Supervisor', email: 'jane@example.com', phone: '9876543210', rol: 'User',account: 'account' },
    { id: 6, name: 'Jane Smith', position: 'Supervisor', email: 'jane@example.com', phone: '9876543210', rol: 'User',account: 'account' },
    { id: 6, name: 'Jane Smith', position: 'Supervisor', email: 'jane@example.com', phone: '9876543210', rol: 'User',account: 'account' },
    { id: 6, name: 'Jane Smith', position: 'Supervisor', email: 'jane@example.com', phone: '9876543210', rol: 'User',account: 'account' },
    
    // Otros objetos
  ];

  const columns = [
    { Header: t('Account.table.contacts.name'), accessor: 'name' },
    { Header: t('Account.position'), accessor: 'position' },
    { Header: t('Account.title'), accessor: 'account' },
    { Header: t('Account.KAM'), accessor: 'id' },
    { Header: t('Account.phone'), accessor: 'phone' },
    { Header: t('Account.Email'), accessor: 'email' },
    { Header: t('Account.action') },
  ];
  return (
    <>
      <div className="d-flex justify-content-center align-items-center m-4">
        <div className="col-lg-10">
        <MyTitle title={`${t('Common.search')} ${t('Account.table.contacts.title')}`} />

        </div>
      </div>

      <div className="d-flex justify-content-center align-items-center m-4">
        <div className="card col-lg-10 shadow">
        <div className="d-flex justify-content-end container mt-2">
              <button type="button" className="btn btn-primary ">
               + {t('Account.add')} {t('Account.table.contacts.title')}
              </button>
            </div>
        <Table columns={columns} data={data} title={t('Account.table.contacts.title')} search={t('Account.table.search')} />
        </div>
      </div>
    </>
  );
}

export default page;
