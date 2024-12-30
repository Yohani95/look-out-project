'use client';
import React, { useEffect, useState } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { usePathname, useRouter } from 'next/navigation';

function SubNavSupport() {
  const pathname = usePathname(); // Obtiene la ruta actual
  const router = useRouter();
  // Configuración de rutas y etiquetas
  const routes = [
    { path: '/business/Support/search', label: 'Contrato' },
    { path: '/business/Support/bag/search', label: 'Bolsa' },
    { path: '/business/Support/onDemand/search', label: 'OnDemand' },
  ];
  // Verifica si la ruta actual coincide con alguna de las rutas configuradas
  const match = routes.some((route) => pathname.includes(route.path));

  // Si no hay coincidencia, retorna null para no renderizar nada
  if (!match) {
    return null;
  }
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {routes.map((route) => (
          <BreadcrumbItem key={route.path}>
            <BreadcrumbLink
              onClick={() => router.push(route.path)}
              className={`pb-2 text-base font-medium transition-all duration-200 cursor-pointer ${
                pathname.match(route.path)
                  ? 'text-[#2F4BCE] border-b-2 border-[#2F4BCE]'
                  : 'text-gray-500 hover:text-[#2F4BCE]'
              }`}
              style={{
                // Evita cambio de color en hover para el enlace activo
                pointerEvents: pathname.match(route.path) ? 'none' : 'auto',
              }}
            >
              {route.label}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
export default SubNavSupport;
