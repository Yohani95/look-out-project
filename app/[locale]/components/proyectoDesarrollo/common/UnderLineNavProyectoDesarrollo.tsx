'use client';
import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import '@/app/css/UnderLineNav.css';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';

function UnderLineNavProyectoDesarrollo({ id }) {
  const locale = useLocale();
  const t = require(`@/messages/${locale}.json`);
  const router = useRouter();
  const [activeKey, setActiveKey] = useState('link-1');

  const handleSelect = (selectedKey) => {
    setActiveKey(selectedKey);
  };
  const handleNavigation = (url) => {
    router.push(url);
  };
  return (
    <>
      <Nav
        variant="underline"
        activeKey={activeKey}
        onSelect={handleSelect}
        className="justify-content-center custom-nav"
      >
        <Nav.Item>
          <Nav.Link
            eventKey="link-1"
            className="custom-nav-link"
            onClick={() => handleNavigation(`/developmentProject/${id}/edit`)}
          >
            {t.Common.project}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-2"
            className="custom-nav-link"
            onClick={() =>
              handleNavigation(`/developmentProject/${id}/milestone/search`)
            }
          >
            {t.Common.milestone}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-3"
            className="custom-nav-link"
            onClick={() =>
              handleNavigation(`/developmentProject/${id}/novelty/search`)
            }
          >
            {t.service.historyNovelty}
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <style jsx>{`
        .custom-nav-link {
          color: #2f4bce !important; /* Color azul para los enlaces */
        }
        .custom-nav {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </>
  );
}

export default UnderLineNavProyectoDesarrollo;
