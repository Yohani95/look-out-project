import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import MyTitle from '@/app/[locale]/components/common/MyTitle';
import { cn } from '@/lib/utils';

interface BasePagesProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  additionalContent?: React.ReactNode;
  footerContent?: React.ReactNode;
  actionButton?: React.ReactNode;
}

const BasePages: React.FC<BasePagesProps> = ({
  title,
  description,
  children,
  additionalContent = null,
  footerContent = null,
  actionButton = null,
}) => {
  return (
    <>
      <div className="flex flex-col items-center p-4">
        <div className="w-full max-w-[90%] mb-6">
          {/* Encabezado de la página */}
          <MyTitle title={title} />
        </div>

        {/* Card principal */}
        <Card className="w-full max-w-[90%]  p-6 shadow-md border rounded-lg">
          {/* Header del Card */}
          <CardHeader className="flex flex-col items-start gap-2 pb-4">
            {/* Título */}
            <CardTitle>
              <h4 className="text-[#2f4bce] text-xl font-bold">{title}</h4>
            </CardTitle>

            {/* Descripción y Botón */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-4">
              {/* Descripción */}
              {description && (
                <CardDescription className="text-[#272833] text-sm font-normal">
                  {description}
                </CardDescription>
              )}

              {/* Botón */}
              {actionButton && (
                <div className="flex justify-end">{actionButton}</div>
              )}
            </div>
          </CardHeader>

          {/* Contenido del Card */}
          <CardContent>
            {children}
            {additionalContent}
          </CardContent>

          {/* Footer del Card */}
          {footerContent && (
            <CardFooter className="pt-4">{footerContent}</CardFooter>
          )}
        </Card>
      </div>
    </>
  );
};

export default BasePages;
