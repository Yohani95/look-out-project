'use client';
import React, { useEffect, useMemo, useState } from 'react';
import FacturaPeriodo from '@/app/api/models/factura/FacturaPeriodo';
import PeriodoInfo from './PeriodoInfo';
import FactureFormSection from './FactureFormSection';
import { useFormik } from 'formik';
import { useRouter, usePathname } from 'next/navigation';
import PeriodosProyecto from '@/app/api/models/proyecto/PeriodosProyecto';
import {
  ChangeEstadoFacturaByLicencia,
  ChangeEstadoFacturaByProyectoDesarrollo,
  ChangeEstadoFacturaBySoporte,
  createFacturaPeriodo,
  deleteFacturaPeriodo,
} from '@/app/api/actions/factura/FacturaPeriodoActions';
import TableMaterialUI from '../common/TablaMaterialUi';
import { FaTrash, FaFileDownload } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import NotificationSweet from '@/app/[locale]/components/common/NotificationSweet';
import ConfirmationDialog from '@/app/[locale]/components/common/ConfirmationDialog';
import {
  ChangeEstado,
  ChangeEstadoHoras,
} from '@/app/api/actions/factura/FacturaPeriodoActions';
import { revalidateTag } from 'next/cache';
import DocumentoFactura from '@/app/api/models/factura/DocumentoFactura';
import { Tooltip } from 'react-tooltip';
import HorasUtilizadas from '@/app/api/models/support/HorasUtilizadas';
import PeriodoGenerico from '@/app/api/models/factura/PeriodoGenerico';
import FacturaAdaptacion from '@/app/api/models/factura/FacturaAdaptacion';
import AdaptationFactureModal from './Adapter/AdaptationFactureModal';
import Utils from '@/app/api/models/common/Utils';
import { EnviarEmailFactura } from '@/app/actions/admin/EmailActions';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
const MemoizedTableMaterialUI = React.memo(TableMaterialUI);
interface FactureProps {
  t: any;
  periodo: PeriodosProyecto | HorasUtilizadas | PeriodoGenerico;
  facturas: FacturaPeriodo[];
  facturaAdaptacionData: FacturaAdaptacion | null;
}

const FactureCreate: React.FC<FactureProps> = ({
  t,
  periodo,
  facturas,
  facturaAdaptacionData,
}: {
  t: any;
  periodo: PeriodosProyecto | HorasUtilizadas | PeriodoGenerico;
  facturas: FacturaPeriodo[];
  facturaAdaptacionData: FacturaAdaptacion | null;
}) => {
  const columns = useMemo(() => FacturaPeriodo.createColumns(t), [t]);
  const router = useRouter();
  const pathname = usePathname();
  const [periodoInfo, setPeriodoInfo] = useState<any>(periodo);
  const [facturaAdaptacion, setFacturaAdaptacion] =
    useState<FacturaAdaptacion | null>(facturaAdaptacionData);
  const [maxMontoNextFactura, setMaxMontoNextFactura] = useState(0);
  const showLoadingNotification = async () => {
    await NotificationSweet({
      title: t.notification.loading.title,
      text: '',
      type: t.notification.loading.type,
      showLoading: true,
    });
  };
  const totalFacturas = facturas?.reduce(
    (total, factura) => total + factura.monto,
    0
  );
  useEffect(() => {
    const totalFacturas = facturas?.reduce(
      (total, factura) => total + factura.monto,
      0
    );
    const maxMonto = periodoInfo?.monto - totalFacturas;
    setMaxMontoNextFactura(maxMonto);
  }, [periodoInfo, facturaAdaptacion, totalFacturas]);
  const validationSchema = FacturaPeriodo.getValidationSchema(
    t,
    maxMontoNextFactura
  );
  const formik = useFormik({
    initialValues: new FacturaPeriodo(),
    validationSchema,
    //validateOnMount: true,
    onSubmit: async (values: FacturaPeriodo, { setSubmitting }) => {
      try {
        //aquí al asignar estos valores uno de los 2 quedara null y esto
        //hará la diferencia entre si es soporte o proyecto, es una adaptación al código
        //o un parche solicitado por Don RAUL ya que quiere o necesita ocupar la misma entidad para ahorrar tiempo
        //el cual nunca se definió un padre para ambos casos o un tercer caso esto complica para que sea
        //escalable el proyecto cunado se necesita realizar la factura
        await showLoadingNotification();
        if ('numeroProfesionales' in periodo) {
          values.idPeriodo = periodo.id;
        } else if (pathname.includes('createSupport')) {
          values.idHorasUtilizadas = periodo.id;
        } else if (pathname.includes('createLicense')) {
          values.idLicencia = periodo.id;
        } else if (pathname.includes('createBagSupport')) {
          values.idSoporteBolsa = periodo.proyecto.pryId;
        } else if (pathname.includes('createProject')) {
          values.idHitoProyectoDesarrollo = periodo.proyecto.pryId;
        }
        values.fechaFactura = new Date();
        values.idEstado = FacturaPeriodo.ESTADO_FACTURA.PENDIENTE;
        console.log(values);
        await createFacturaPeriodo(values).then((res) => {
          Utils.handleSuccessNotification(t);
        });
        // Utiliza una variable para almacenar la función handleFormSubmit
      } catch (error) {
        console.error('Error in createFORMIK:', error);
      } finally {
        setSubmitting(false); // Importante para indicar que el formulario ya no está siendo enviado.
      }
    },
  });
  const downloadDocumento = (documentos: DocumentoFactura[]) => {
    documentos.forEach((documento) => {
      const uint8Array = new Uint8Array(
        atob(documento.contenidoDocumento)
          .split('')
          .map((char) => char.charCodeAt(0))
      );

      const blob = new Blob([uint8Array], { type: 'application/pdf' });

      // Crea una URL de objeto para el Blob
      const blobUrl = URL.createObjectURL(blob);

      // Crea un enlace (a) para descargar el Blob
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = documento.nombreDocumento; // Ajusta el nombre del archivo según tus necesidades

      // Agrega el enlace al documento y simula un clic para iniciar la descarga
      document.body.appendChild(link);
      link.click();

      // Elimina el enlace después de la descarga
      document.body.removeChild(link);

      // Liberar recursos
      URL.revokeObjectURL(blobUrl);
    });
  };
  const handleDelete = async (facturaId: number) => {
    const confirmed = await ConfirmationDialog(
      t.notification.deleting.title,
      t.notification.deleting.text,
      t.notification.deleting.type,
      t.notification.deleting.buttonOk,
      t.notification.deleting.buttonCancel
    );
    if (!confirmed) return;
    await showLoadingNotification();
    await Utils.handleOnSubmit(t, deleteFacturaPeriodo, facturaId);
  };
  const memoizedFacturaActions = useMemo(() => {
    return facturas.map((factura) => {
      // Generamos IDs únicos para cada acción en la fila de la factura
      const deleteId = `delete-${factura.id}`;
      const downloadId = `download-${factura.id}`;

      return {
        ...FacturaPeriodo.transformFacturaPeriodoData(factura),
        actions: (
          <>
            <Button
              variant="link"
              type="button"
              onClick={() => handleDelete(factura.id)}
              disabled={
                factura.idEstado != FacturaPeriodo.ESTADO_FACTURA.PENDIENTE
              }
            >
              <FaTrash size={16} id={deleteId} />
            </Button>
            <Tooltip anchorSelect={`#${deleteId}`} place="top">
              {t.Common.delete}
            </Tooltip>

            <Button
              variant="link"
              type="button"
              onClick={() => downloadDocumento(factura.documentosFactura)}
              disabled={factura.documentosFactura.length === 0}
            >
              <FaFileDownload size={16} id={downloadId} />
            </Button>
            <Tooltip anchorSelect={`#${downloadId}`} place="top">
              {t.Common.downloadFile}
            </Tooltip>
          </>
        ),
      };
    });
  }, [facturas, t]);
  const handleChangeEstado = async () => {
    await showLoadingNotification();
    if (formik.values.monto < 0) {
      return;
    }
    if (periodo.id == null || periodo.id == 0) {
      await Utils.handleOnSubmit(
        t,
        ChangeEstadoFacturaBySoporte,
        periodo.proyecto.pryId,
        FacturaPeriodo.ESTADO_FACTURA.SOLICITADA
      );
      return;
    }

    if ('numeroProfesionales' in periodo) {
      await Utils.handleOnSubmit(
        t,
        ChangeEstado,
        periodo.id,
        FacturaPeriodo.ESTADO_FACTURA.SOLICITADA
      );
    } else if ('horasExtras' in periodo) {
      await Utils.handleOnSubmit(
        t,
        ChangeEstadoHoras,
        periodo.id,
        FacturaPeriodo.ESTADO_FACTURA.SOLICITADA
      );
    } else if (pathname.includes('createProject')) {
      await Utils.handleOnSubmit(
        t,
        ChangeEstadoFacturaByProyectoDesarrollo,
        periodo.id,
        FacturaPeriodo.ESTADO_FACTURA.SOLICITADA
      );
    } else {
      await Utils.handleOnSubmit(
        t,
        ChangeEstadoFacturaByLicencia,
        periodo.id,
        FacturaPeriodo.ESTADO_FACTURA.SOLICITADA
      );
    }
    // Crear el objeto con los datos requeridos
    const emailData = {
      pryId: periodo.proyecto?.pryId,
      fechaPeriodoDesde: periodo.fechaPeriodoDesde,
      fechaPeriodoHasta: periodo.fechaPeriodoHasta,
      monto: periodo.monto,
      proyecto: {
        pryId: periodo.proyecto?.pryId,
        pryNombre: periodo.proyecto?.pryNombre,
        cliente: {
          cliNombre: periodo.proyecto?.cliente?.cliNombre || 'N/A',
          cliNif: periodo.proyecto?.cliente?.cliNif || 'N/A',
        },
      },
    };
    const response = await EnviarEmailFactura(emailData);

    if (response) {
      toast.success(' Correo enviado', {
        description: 'El supervisor ha recibido la solicitud.',
        duration: 5000,
      });
    } else {
      toast.error('Error al enviar el correo', {
        description: 'No se pudo enviar el correo. Intenta nuevamente.',
        duration: 5000,
      });
    }
  };
  useEffect(() => {
    if (facturaAdaptacion) {
      setPeriodoInfo((prevPeriodoInfo) => ({
        ...prevPeriodoInfo,
        monto: facturaAdaptacion.monto || 0,
      }));
    }
  }, [facturaAdaptacion]);
  const handleFacturaAdaptacionChange = (
    newFacturaAdaptacion: FacturaAdaptacion
  ) => {
    setFacturaAdaptacion(newFacturaAdaptacion);
  };
  return (
    <>
      {/* <h4>{t?.Nav.facture.requestBilling}</h4> */}
      <div className="d-flex justify-content-end align-items-center mb-3">
        <AdaptationFactureModal
          t={t}
          idCliente={periodo.proyecto.cliente.cliId}
          monto={periodo.monto}
          facturaAdaptacion={facturaAdaptacion}
          onFacturaAdaptacionChange={handleFacturaAdaptacionChange}
          id={periodo.id}
        />
      </div>
      <PeriodoInfo
        t={t}
        periodo={periodo}
        facturaAdaptacion={facturaAdaptacion}
      />
      <hr />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit(e);
        }}
      >
        <FactureFormSection
          t={t}
          formik={formik}
          setFormData={formik.setValues}
          formData={formik.values}
          tipoFactura={
            periodo?.proyecto?.idTipoFacturacion ==
            FacturaPeriodo.TIPO_FACTURA.HES
          }
        />
        <div className="d-flex justify-content-end mt-2 mb-2 ">
          <button type="submit" className="btn btn-primary">
            {t?.Common.saveButton}
          </button>
        </div>
      </form>
      <hr />
      <h4>{t?.facture.requestedInvoices}</h4>
      <MemoizedTableMaterialUI
        columns={columns}
        data={memoizedFacturaActions}
      />

      <div className="d-flex justify-content-end mt-2 mb-2 ">
        <button
          type="button"
          className="btn btn-danger m-2"
          onClick={(e) => {
            router.back();
          }}
        >
          {t.Common.goBack}
        </button>
        <button onClick={handleChangeEstado} className="m-2 btn btn-primary">
          {t?.Common.request}
        </button>
      </div>
    </>
  );
};

export default FactureCreate;
