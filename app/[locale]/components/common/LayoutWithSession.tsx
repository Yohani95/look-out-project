'use client';

import { useSession } from 'next-auth/react';
import Header from '@/app/[locale]/components/header/Header';
import Footer from '@/app/[locale]/components/Footer';
import { Loader2 } from 'lucide-react';

const LayoutWithSession = ({ children }) => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin h-12 w-12 text-blue-500" />
      </div>
    );
  }

  return (
    <>
      {session && <Header />}
      <main className="main-content">{children}</main>
      {session && <Footer />}
    </>
  );
};

export default LayoutWithSession;
