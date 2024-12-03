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
import { MoreVertical } from 'lucide-react';

const ActionButtons = ({ onDelete, onEdit, onView }) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical /> {/* Icono de tres puntos */}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel></DropdownMenuLabel>
          <DropdownMenuItem>
            <Button>
              <FaEye size={16} onClick={onView} />
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button size="sm">
              <FaEdit size={16} onClick={onEdit} />
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button size="sm" variant="destructive">
              <FaTrash size={16} className="" onClick={onDelete} />
            </Button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
      <Button variant="link">
        <FaEye size={16} onClick={onView} />
      </Button>
      {/* <Button variant="link" size="sm">
        <FaBuilding className="custom-icon" />
      </Button> */}
      <Button size="sm" variant="link">
        <FaEdit size={16} onClick={onEdit} />
      </Button>
      <Button size="sm" variant="link">
        <FaTrash size={16} className="" onClick={onDelete} />
      </Button>
    </>
  );
};

export default ActionButtons;
