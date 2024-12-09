'use client';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';
import TableMaterialUI from '@/app/[locale]/components/common/TablaMaterialUi';
import LogEntry from '@/app/api/models/log/LogEntry';
import { Button, Modal } from 'react-bootstrap';
import '@/app/css/ModalLog.css';
const MemoizedTableMaterialUI = React.memo(TableMaterialUI);
function LogSearch({ t, data }) {
  const [ExceptionModal, setExceptionModal] = useState('');
  const toggleException = (exception) => {
    setExceptionModal(exception);
    setShowModal(!showModal);
  };
  const [showModal, setShowModal] = useState(false);
  const columns = useMemo(() => LogEntry.createColumns(t), [t]);
  const memoizedSoporteActions = useMemo(() => {
    return data.map((log: LogEntry) => ({
      ...log,
      fecha: new LogEntry(log).getFechaString(),
      exception: (
        <div>
          {log.exception.slice(0, 25)}{' '}
          {/* Mostrar solo los primeros 50 caracteres */}
          {log.exception.length > 25 && (
            <Button
              variant="link"
              onClick={() => toggleException(log.exception)}
            >
              Ver más
            </Button>
          )}
        </div>
      ),
    }));
  }, [data, t]);
  return (
    <>
      <div className="d-flex justify-content-end container mb-3"></div>
      <MemoizedTableMaterialUI
        columns={columns}
        data={memoizedSoporteActions}
      />
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Exception</Modal.Title>
        </Modal.Header>
        <Modal.Body>{ExceptionModal}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default LogSearch;
