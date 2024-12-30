'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const UnauthorizedPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">403 - Acceso no autorizado</h1>
      <p className="text-lg text-gray-600 mb-6">
        No tienes permiso para acceder a esta página.
      </p>
      <Button
        variant="default"
        onClick={() => router.push('/')}
        className="px-6 py-2"
      >
        Volver al inicio
      </Button>
    </div>
  );
};

export default UnauthorizedPage;
