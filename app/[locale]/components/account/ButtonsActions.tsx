import React from 'react';
import { FaTrash, FaBuilding, FaEdit, FaEye } from 'react-icons/fa';
import { handleDelete } from '../common/DeleteSweet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Edit, Eye, MoreVertical, Trash2 } from 'lucide-react';

const ActionButtons = ({ onDelete, onEdit, onView }) => {
  return (
    <DropdownMenu>
      {/* Trigger para el menú */}
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical className="w-4 h-4" /> {/* Icono de tres puntos */}
        </Button>
      </DropdownMenuTrigger>

      {/* Contenido del menú */}
      <DropdownMenuContent className="w-48 bg-white shadow-md border border-gray-200 rounded-lg z-50">
        <DropdownMenuItem onClick={onView}>
          <Eye className="w-4 h-4 mr-2" /> Ver
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onEdit}>
          <Edit className="w-4 h-4 mr-2" /> Editar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDelete} className="text-red-600">
          <Trash2 className="w-4 h-4 mr-2" /> Eliminar
        </DropdownMenuItem>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionButtons;
