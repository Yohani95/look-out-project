import React from "react";
import MyTitle from "@/app/[locale]/components/common/MyTitle";
import { Container, Row, Col, Card } from "react-bootstrap";
import Table from '@/app/[locale]/components/common/CommonTable'
import { useTranslations } from 'next-intl';
function page() {
  const t = useTranslations('Account');
  return (
    <>
      <div className="d-flex justify-content-center align-items-center m-4">
        <div className="col-lg-10">
          <MyTitle title="" />
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center m-4">
        <div className="card col-lg-10 shadow">
          <Table data="" columns="" title="" search="" />
        </div>
      </div>
    </>
  );
}

export default page;
