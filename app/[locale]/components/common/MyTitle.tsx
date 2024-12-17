'use client';
import Link from 'next/link';
import AppInfo from './AppInfo';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Slash } from 'lucide-react';
function MyTitle({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-4">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link href="/" className="text-blue hover:underline text-blue-800">
              Home
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink>{title}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* App Info */}
      <AppInfo />
    </div>
  );
}

export default MyTitle;
