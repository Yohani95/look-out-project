import React from 'react';
import { FaTrash, FaEdit, FaEye } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import ConfirmationDialog from '@/app/[locale]/components/common/ConfirmationDialog';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreVertical } from 'lucide-react';

function OportunidadButtons({ t, oportunidad }) {
  const router = useRouter();

  const handleEdit = async (id, trans, push) => {
    const confirmed = await ConfirmationDialog(
      trans.notification.edit.title,
      trans.notification.edit.text,
      trans.notification.edit.type,
      trans.notification.edit.buttonOk,
      trans.notification.edit.buttonCancel
    );
    if (confirmed) {
      push(`/opportunities/edit/${oportunidad.id}`);
    }
  };

  const handleDelete = async (id, trans, push) => {
    const confirmed = await ConfirmationDialog(
      trans.notification.delete.title,
      trans.notification.delete.text,
      trans.notification.delete.type,
      trans.notification.delete.buttonOk,
      trans.notification.delete.buttonCancel
    );
    if (confirmed) {
      console.log('Eliminar', oportunidad.id); // Reemplaza esto con la lógica de eliminación real
    }
  };

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
        {/* Opción para editar */}
        <DropdownMenuItem
          onClick={() => handleEdit(oportunidad.id, t, router.push)}
        >
          {t?.Common.edit}
        </DropdownMenuItem>

        {/* Opción para eliminar */}
        <DropdownMenuItem
          onClick={() => handleDelete(oportunidad.id, t, router.push)}
          className="text-red-600"
        >
          {t?.Common.delete}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Opción de ver detalle */}
        {/* <DropdownMenuItem
          onClick={() => router.push(`/opportunities/view/${oportunidad.id}`)}
        >
          <FaEye className="mr-2" size={16} />
          {t?.Common.view}
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default OportunidadButtons;
