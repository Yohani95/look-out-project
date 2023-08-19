import React from 'react'
import {
  useTranslations,
} from 'next-intl';
import MyTitle from "@/app/[locale]/components/common/MyTitle";
import UserForm from '@/app/[locale]/components/admin/user/UserForm';
function page({ params }) {
  const t = useTranslations('Nav.administration');
  return (
    <>
    <div className="d-flex justify-content-center align-items-center m-4">
      <div className="col-lg-10">
        <MyTitle title={t("editUser")} />
      </div>
    </div>
    <div className="d-flex justify-content-center align-items-center">
      <div className="card col-lg-10 shadow">
        <div className="container mt-4 mb-4">
          <div className="d-flex justify-content-end mb-3">
          <UserForm locale={params.locale} isEdit={true} id={params.id}/>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default page