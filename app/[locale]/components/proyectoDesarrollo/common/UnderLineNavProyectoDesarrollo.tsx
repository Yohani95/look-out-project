'use client';
import React, { useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';
import '@/app/css/UnderLineNav.css';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

function UnderLineNavProyectoDesarrollo({ id }) {
  const locale = useLocale();
  const t = require(`@/messages/${locale}.json`);
  const router = useRouter();
  const [activeKey, setActiveKey] = useState(null);

  const handleSelect = (selectedKey) => {
    setActiveKey(selectedKey);
  };
  const pathname = usePathname(); // Para obtener la ruta actual
  useEffect(() => {
    // Sincroniza activeKey con la URL actual, considerando sub URLs
    if (pathname.match(`/developmentProject/${id}/edit`))
      setActiveKey('link-1');
    else if (pathname.match(`/developmentProject/${id}/milestone`))
      setActiveKey('link-2');
    else if (pathname.match(`/developmentProject/${id}/novelty`))
      setActiveKey('link-3');
    else if (pathname.match(`/developmentProject/${id}/planning`))
      setActiveKey('link-4');
  }, [pathname, id]);
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
        <Nav.Item>
          <Nav.Link
            eventKey="link-4"
            className="custom-nav-link"
            onClick={() =>
              handleNavigation(`/developmentProject/${id}/planning/search`)
            }
          >
            {t.Common.planning}
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
