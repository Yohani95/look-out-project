import React from 'react';
import {
  FaTrash,
  FaEdit,
  FaEye,
  FaFileDownload,
  FaUserPlus,
} from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreVertical } from 'lucide-react';

function ServiceButtons({ id, onDelete, onEdit, onView, downloadFile, t }) {
  const router = useRouter();

  return (
    <DropdownMenu>
      {/* Botón de tres puntos */}
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>

      {/* Contenido del menú */}
      <DropdownMenuContent className="w-48 bg-white shadow-md border border-gray-200 rounded-lg z-50">
        {/* Agregar profesionales */}
        <DropdownMenuItem onClick={onView}>
          {t?.Common.add} {t?.Common.professionals}
        </DropdownMenuItem>

        {/* Editar */}
        <DropdownMenuItem onClick={onEdit}>{t?.Common.edit}</DropdownMenuItem>

        {/* Descargar documento */}
        <DropdownMenuItem onClick={downloadFile}>
          {t?.Common.downloadFile}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Eliminar */}
        <DropdownMenuItem onClick={onDelete} className="text-red-600">
          {t?.Common.delete}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ServiceButtons;
