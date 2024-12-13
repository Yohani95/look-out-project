'use client';
import React, { useState, useEffect } from 'react';
import fetchCountriest from '../../utils/country/Countrylist';
import fetchSectorComerciales from '../../utils/CommercialPlace/list';
import { fetchPerson } from '@/app/[locale]/utils/person/UtilsPerson';
import { fetchGiro } from '@/app/[locale]/utils/giro/UtilsGiro';
import { fetchEstadoCliente } from '@/app/[locale]/utils/EstadoCliente/UtilsEstadoCliente';
import ContactList from '@/app/[locale]/components/contact/ContactList';
import { useRouter } from 'next/navigation';
import NotificationSweet from '@/app/[locale]/components/common/NotificationSweet';
import { clientGetByIdApiUrl } from '@/app/api/apiConfig';
import {
  handleClientInputChange,
  handleClientFormSubmit,
  fetchGetbyId,
} from '../../utils/client/ClientFormLogic';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import SelectField from '../common/SelectField';
import { Progress } from '@/components/ui/progress';
import { CircleDot } from 'lucide-react';
import { Button } from '@/components/ui/button';
function Form({ locale, isEdit, idPerson = null, isCreate = false }) {
  let t;
  t = require(`@/messages/${locale}.json`);
  const [countryOptions, setCountryOptions] = useState([]);
  const [sectorOptions, setSectorOptions] = useState([]);
  const [KamOptions, setKamOptions] = useState([]);
  const [giroOptions, setGiroOptions] = useState([]);
  const [estadoOptions, setEstadoOptions] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [formData, setFormData] = useState({
    cliNombre: '',
    cliDescripcion: '',
    paiId: 0,
    secId: 0,
    girId: 0,
    cliSitioWeb: '',
    cliNif: '',
    idPerson: [],
    kamId: 0,
  });
  const [progress, setProgress] = React.useState(60); // Progreso inicial
  const [showForm, setShowForm] = React.useState(true); // Estado para mostrar el formulario

  const router = useRouter();
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      idPerson: selectedIds,
    }));
  }, [selectedIds]);
  const handleCheckboxChange = (itemId) => {
    // Actualiza `formData` usando el estado calculado más reciente
    setFormData((prevFormData) => ({
      ...prevFormData,
      idPerson: itemId,
    }));
  };

  useEffect(() => {
    fetchCountriest().then((data) => {
      const options = data.map((country) => ({
        value: country.paiId,
        label: country.paiNombre,
      }));
      setCountryOptions(options);
    });
  }, []);
  useEffect(() => {
    fetchPerson().then((data) => {
      const options = data.map((kam) => ({
        value: kam.id,
        label: kam.perNombres + ' ' + kam.perApellidoPaterno,
      }));
      setKamOptions(options);
    });
  }, []);
  useEffect(() => {
    fetchSectorComerciales().then((data) => {
      const options = data.map((sector) => ({
        value: sector.secId,
        label: sector.secNombre,
      }));
      setSectorOptions(options);
    });
  }, []);
  useEffect(() => {
    fetchGiro().then((data) => {
      const options = data.map((sector) => ({
        value: sector.girId,
        label: sector.girNombre,
      }));
      setGiroOptions(options);
    });
  }, []);
  if (idPerson != null && !isNaN(idPerson)) {
    useEffect(() => {
      // Realiza una llamada API para obtener los datos del usuario por su ID
      // y actualiza el estado formData con los datos obtenidos
      fetchclientData(idPerson);
    }, [idPerson]);
  }

  const fetchclientData = async (Id) => {
    try {
      const response = await fetch(`${clientGetByIdApiUrl}/${Id}`);
      if (response.ok) {
        const result = await response.json();
        const { cliente, idPerson, kamIdPerson } = result.data;
        console.log(result);
        setFormData(cliente); // Suponiendo que los campos del formulario coinciden con los del cliente
        setFormData((prevFormData) => ({
          ...prevFormData,
          kamId: kamIdPerson.id,
        }));
        setSelectedIds(idPerson);
      } else if (response.status == 404) {
        NotificationSweet({
          title: t.notification.warning.title,
          text: t.Common.notExist,
          type: t.notification.warning.type,
          push: router.push,
          link: '/account/search',
        });
      }
    } catch (error) {
      console.error('Error fetching client data:', error);
      NotificationSweet({
        title: t.notification.warning.title,
        text: t.Common.notExist,
        type: t.notification.warning.type,
        push: router.push,
        link: '/account/search',
      });
    }
  };
  const handleSelectChange = (event, fieldName) => {
    const selectedValue = event.target.value;
    console.log(`Selected ${fieldName}:`, selectedValue);
    setFormData((prevData) => ({ ...prevData, [fieldName]: selectedValue }));
  };
  const handleSubmit = handleClientFormSubmit(
    formData,
    t,
    router.push,
    isEdit,
    setFormData
  );
  const cancel = () => {
    router.back();
  };
  return (
    <>
      {/* Pasos con barra de progreso */}
      <div className="flex flex-col md:flex-row items-center justify-center w-full md:space-x-4">
        {/* Primer paso */}
        <div className="flex flex-col items-center space-y-2">
          <div className="flex items-center justify-center w-8 h-8 border-2 border-primary rounded-full">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
          </div>
          <span className="text-primary text-sm font-medium">
            Ingresar datos
          </span>
        </div>

        {/* Barra de progreso */}
        <div className="w-full bg-gray-300 md:w-40 lg:w-60">
          <Progress value={progress} />
        </div>

        {/* Segundo paso */}
        <div className="flex flex-col items-center space-y-2">
          <div
            className={`flex items-center justify-center w-8 h-8 border-2 rounded-full ${
              progress >= 100 ? 'border-primary' : 'border-gray-300'
            }`}
          >
            <div
              className={`w-3 h-3 rounded-full ${
                progress >= 100 ? 'bg-primary' : 'bg-transparent'
              }`}
            ></div>
          </div>
          <span
            className={`text-sm font-medium ${
              progress >= 100 ? 'text-primary' : 'text-gray-400'
            }`}
          >
            Enlazar contacto
          </span>
        </div>
      </div>

      {/* Formulario o lista de contactos */}
      {showForm ? (
        <div className="flex flex-col space-y-8 md:space-y-0 md:flex-row md:items-center md:justify-between">
          <div className="w-full">
            <form
              onSubmit={(e) => {
                e.preventDefault(); // Evita el comportamiento por defecto del formulario
                setProgress(100); // Avanza el progreso al 100%
                setShowForm(false); // Oculta el formulario y muestra la lista de contactos
              }}
              className="space-y-6"
            >
              <fieldset
                disabled={!isCreate && !isEdit}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
              >
                {/* Fila 1 */}
                <div>
                  <Label htmlFor="cliNombre">Nombre</Label>
                  <Input
                    id="cliNombre"
                    name="cliNombre"
                    value={formData.cliNombre}
                    onChange={handleClientInputChange(formData, setFormData)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cliNif">NIF</Label>
                  <Input
                    id="cliNif"
                    name="cliNif"
                    value={formData.cliNif}
                    onChange={handleClientInputChange(formData, setFormData)}
                  />
                </div>
                <div>
                  <Label htmlFor="girId">Giro</Label>
                  <SelectField
                    label=""
                    options={giroOptions}
                    preOption="Selecciona un giro"
                    onChange={(e) => handleSelectChange(e, 'girId')}
                    selectedValue={formData.girId}
                  />
                </div>
                <div>
                  <Label htmlFor="secId">Sector</Label>
                  <SelectField
                    label=""
                    options={sectorOptions}
                    preOption="Selecciona un sector"
                    onChange={(e) => handleSelectChange(e, 'secId')}
                    selectedValue={formData.secId}
                  />
                </div>
                {/* Fila 2 */}
                <div>
                  <Label htmlFor="kamId">{t.Account.KAM}</Label>
                  <SelectField
                    label=""
                    options={KamOptions}
                    preOption={t.Account.select}
                    onChange={(e) => handleSelectChange(e, 'kamId')}
                    selectedValue={formData.kamId}
                  />
                </div>
                <div>
                  <Label htmlFor="paiId">{t.Account.country}</Label>
                  <SelectField
                    options={countryOptions}
                    preOption={t.Account.select}
                    onChange={(e) => handleSelectChange(e, 'paiId')}
                    selectedValue={formData.paiId}
                  />
                </div>
                <div>
                  <Label htmlFor="cliSitioWeb">{t.Account.web}</Label>
                  <Input
                    id="cliSitioWeb"
                    name="cliSitioWeb"
                    value={formData.cliSitioWeb}
                    onChange={handleClientInputChange(formData, setFormData)}
                  />
                </div>
              </fieldset>

              {/* Botones */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={cancel}
                >
                  {t.Common.goBack}
                </button>
                <button type="submit" className="btn btn-primary">
                  {t.Common.continue}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        // Lista de contactos

        <div className="mt-5">
          <div className="mt-2 flex justify-end space-x-4">
            <Button
              variant="outline"
              onClick={() => router.push('/contact/create')}
            >
              {t.Common.add} {t.Common.contact}
            </Button>
          </div>
          <ContactList
            locale={locale}
            onRadioChange={handleCheckboxChange}
            idPersons={selectedIds}
            // isCreate={isCreate}
            isView={isCreate || isEdit ? false : true}
          />
          <div className="mt-2 flex justify-end space-x-4">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setShowForm(true);
                setProgress(60);
              }}
            >
              {t.Common.goBack}
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              {t.Common.finish}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Form;
