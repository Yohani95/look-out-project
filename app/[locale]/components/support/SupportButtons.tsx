import React from 'react';
import {
  FaTrash,
  FaEdit,
  FaRegClock,
  FaFileInvoiceDollar,
} from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';
import { useRouter } from 'next/navigation';
import ConfirmationDialog from '@/app/[locale]/components/common/ConfirmationDialog';
import { Constantes } from '@/app/api/models/common/Constantes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
function SupportButtons({ t, proyecto }) {
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
      switch (proyecto.idTipoSoporte) {
        case Constantes.TipoSorpote.CONTRATO:
          push(`/business/Support/contract/edit/${id}`);
          break;
        case Constantes.TipoSorpote.BOLSA:
          push(`/business/Support/bag/edit/${id}`);
          break;
        case Constantes.TipoSorpote.ONDEMAND:
          push(`/business/Support/onDemand/edit/${id}`);
          break;
        default:
          break;
      }
    }
  };
  return (
    <>
      <DropdownMenu>
        {/* Trigger para el menú */}
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="w-4 h-4" /> {/* Icono de tres puntos */}
          </Button>
        </DropdownMenuTrigger>

        {/* Contenido del menú */}
        <DropdownMenuContent className="w-48 bg-white shadow-md border border-gray-200 rounded-lg z-50">
          <DropdownMenuItem
            onClick={() => {
              router.push(
                `/business/Support/contract/addHour/${proyecto.pryId}`
              );
            }}
          >
            {t?.Common.add} {t?.Common.hour}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleEdit(proyecto.pryId, t, router.push)}
          >
            {t?.Common.edit}
          </DropdownMenuItem>
          <DropdownMenuItem className="text-red-600">Eliminar</DropdownMenuItem>
          {proyecto.idTipoSoporte == Constantes.TipoSorpote.BOLSA && (
            <DropdownMenuItem
              onClick={() => {
                router.push(`/facture/createBagSupport/${proyecto.pryId}`);
              }}
            >
              {t?.Nav.facture.requestBilling}
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>

      {/* <Button
        size="sm"
        variant="link"
        onClick={() => {
          router.push(`/business/Support/contract/addHour/${proyecto.pryId}`);
        }}
      >
        <FaRegClock size={16} id={`add-hour-tooltip-${proyecto.pryId}`} />
        <Tooltip
          anchorSelect={`#add-hour-tooltip-${proyecto.pryId}`}
          place="top"
        >
          {t?.Common.add} {t?.Common.hour}
        </Tooltip>
      </Button> */}

      {/* <Button
        size="sm"
        variant="link"
        onClick={() => handleEdit(proyecto.pryId, t, router.push)}
      >
        <FaEdit size={16} id={`edit-tooltip-${proyecto.pryId}`} />
        <Tooltip anchorSelect={`#edit-tooltip-${proyecto.pryId}`} place="top">
          {t?.Common.edit}
        </Tooltip>
      </Button> */}

      {/* {proyecto.idTipoSoporte == Constantes.TipoSorpote.BOLSA && (
        <Button
          size="sm"
          variant="link"
          onClick={() => {
            router.push(`/facture/createBagSupport/${proyecto.pryId}`);
          }}
        >
          <FaFileInvoiceDollar
            size={16}
            id={`billing-tooltip-${proyecto.pryId}`}
          />
          <Tooltip
            anchorSelect={`#billing-tooltip-${proyecto.pryId}`}
            place="top"
          >
            {t?.Nav.facture.requestBilling}
          </Tooltip>
        </Button>
      )} */}

      {/* <Button size="sm" variant="link">
    <FaFileDownload size={16} className="my-anchor-documento"/>
    <Tooltip anchorSelect=".my-anchor-documento" place="top">
      {t?.Common.downloadFile} 
    </Tooltip>
  </Button> */}

      {/* <Button size="sm" variant="link">
        <FaTrash size={16} />
      </Button> */}
    </>
  );
}

export default SupportButtons;
