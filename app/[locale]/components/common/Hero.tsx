'use client';
import React from 'react';
import { useSession } from 'next-auth/react';
import Login from '../Auth/Login';
import Header from '../header/Header';
import Footer from '@/app/[locale]/components/Footer';
import { Home } from '../Home';
function Hero({ locale }) {
  const { data: session, status } = useSession(); // Estado para controlar el estado de carga
  let translations;
  translations = require(`@/messages/${locale}.json`);
  if (status === 'loading') {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: '20vh' }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">
            {translations.Common.loading}...
          </span>
        </div>
      </div>
    );
  }

  return (
    <>
      {session ? (
        <>
          <Home />
        </>
      ) : (
        <Login translations={translations} />
      )}
    </>
  );
}

export default Hero;
