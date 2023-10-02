"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import MyDatePicker from "@/app/[locale]/components/common/MyDatePicker";
import { fechtClients } from "@/app/[locale]/utils/client/ClientFormLogic";
import SelectField from "@/app/[locale]/components/common/SelectField";
import fetchCountriest from "@/app/[locale]/utils/country/Countrylist";
import { fetchTypeService } from "@/app/[locale]/utils/project/tipoServicio/UtilsTypeService";
import { fetchPersonGetbyIdClient } from "@/app/[locale]/utils/person/UtilsPerson";
import { useSession, signOut } from "next-auth/react";
import {
  handleInputChange,
  handleFormSubmit,
  GetLastIdProjecService,
  fetchServiceById
} from "@/app/[locale]/utils/business/UtilsService";
function FormService({ locale, isEdit, isCreate }) {
  const { data: session, status } = useSession();
  const [countryOptions, setCountryOptions] = useState([]);
  const [typeServiceOptions, setTypeServiceOptions] = useState([]);
  const [contactOptions, setContactOptions] = useState([]);
  const [accountOptions, setAccountOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    pryId: 0,
    cliId: 0,
    pryNombre:"",
    perId: 0,
    tseId: 0,
    paiId: 0,
    kamId: 0,
    file1: null,
    file2: null,
    endDate: "",
    startDate: "",
    closeDate: null,
    months: null,
  });
  let t = require(`@/messages/${locale}.json`);
  const router = useRouter();
  useEffect(() => {
    var data=fetchServiceById();
    console.log(data);
    formData.pryId=data;
  }, []);
  useEffect(() => {
    fetchCountriest().then((data) => {
      const options = data.map((country) => ({
        value: country.paiId,
        label: country.paiNombre,
      }));
      setCountryOptions(options);
      setIsLoading(false);
    });
  }, []);
  useEffect(() => {
    fetchTypeService().then((data) => {
      const options = data.map((item) => ({
        value: item.tseId,
        label: `${item.tseNombre} ${item.tseDescripcion} `,
      }));
      setTypeServiceOptions(options);
    });
  }, []);
  const FillClient = async () => {
    try {
      const datos = await fechtClients();
      const options = datos.map((item) => ({
        value: item.cliId,
        label: item.cliNombre,
      }));
      setAccountOptions(options);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    FillClient();
  }, []);
  const handleSelectChange = (event, fieldName) => {
    const selectedValue = event.target.value;
    //console.log(`Selected ${fieldName}:`, selectedValue);
    setFormData((prevData) => ({ ...prevData, [fieldName]: selectedValue }));
    if (fieldName == "cliId") {
      fetchPersonGetbyIdClient(selectedValue).then((person) => {
        const options = person.data.map((item) => ({
          value: item.id,
          label: item.perNombres + " " + item.perApellidoPaterno,
        }));
        setContactOptions(options);
      });
    }
  };
  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const cancel = () => {
    router.push("/");
  };
  const openFileDialog = (index) => {
    fileInputRefs[index].current.click();
  };
  const goContactCreate = () => {
    router.push("/contact/create");
  };
  const fileInputRefs = [useRef(null), useRef(null)];
  const calculateEndDate = () => {
    const { startDate, months } = formData;
    if (months < 1 || months > 60) {
      return; // No actualices el estado si el valor está fuera del rango
    }
    if (startDate && months) {
      const startDateCopy = new Date(startDate);
      const parsedMonths = parseInt(months, 10);
      if (!isNaN(parsedMonths)) {
        startDateCopy.setMonth(startDateCopy.getMonth() + parsedMonths);
        const year = startDateCopy.getFullYear();
        const month = (startDateCopy.getMonth() + 1)
          .toString()
          .padStart(2, "0"); // Obtener el mes en formato "mm"
        const day = startDateCopy.getDate().toString().padStart(2, "0"); // Obtener el día en formato "dd"
        const formattedEndDate = `${day}/${month}/${year}`;
        setFormData((prevData) => ({
          ...prevData,
          endDate: formattedEndDate,
        }));
      }
    } else {
      // Si uno de los campos no está lleno o es inválido, borra la fecha de finalización
      setFormData((prevData) => ({
        ...prevData,
        endDate: null,
      }));
    }
  };
  useEffect(() => {
    if (session) {
      setFormData((prevData) => ({
        ...prevData,
        kamId: session.user.persona.id,
      }));
    }
  }, [session]);
  useEffect(() => {
    calculateEndDate();
  }, [formData.startDate, formData.months]);
  const handleSubmit = handleFormSubmit(
    formData,
    t,
    router.push,
    isEdit,
    setFormData
  );
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="d-flex justify-content-end mt-2">
          <div className="col-sm-2">
            <h6 className="text-end ">
              ID {t.business.title} {formData.pryId==0? "N/A" : formData.pryId}
            </h6>
          </div>
        </div>
        <div className="mt-3">
          <div className="mb-3 row align-items-center">
            <label htmlFor="kamId" className="col-sm-1 col-form-label">
              {t.Account.KAM}
            </label>
            <div className="col-sm-3">
              {session && (
                <input
                  type="hidden"
                  className="form-control"
                  id="kamId"
                  name="KamId"
                  value={session.user.persona.id}
                  onChange={handleInputChange(formData, setFormData)}
                  disabled
                />
              )}
              <span className="form-control">
                {session
                  ? `${session.user.persona.perNombres} ${session.user.persona.perApellidoPaterno}`
                  : ""}
              </span>
            </div>
            <label htmlFor="accountName" className="col-sm-2 col-form-label">
              {t.Ficha.table.business.dateEnd}
            </label>
            <div className="col-sm-3">
              <MyDatePicker
                selectedDate={formData.closeDate}
                onChange={(date) =>
                  setFormData({ ...formData, closeDate: date })
                }
                isRead={true}
              />
            </div>
            <SelectField
              label={t.Account.country}
              options={isLoading ? [] : countryOptions}
              preOption={t.Account.select}
              labelClassName="col-sm-1 col-form-label"
              divClassName="col-sm-2"
              onChange={(e) => handleSelectChange(e, "paiId")}
              selectedValue={formData.paiId}
            />
          </div>

          <div className=" mb-3 row align-items-center">
            <SelectField
              label={t.Account.name}
              options={accountOptions}
              preOption={t.Account.select}
              labelClassName="col-sm-1 col-form-label"
              divClassName="col-sm-3"
              onChange={(e) => handleSelectChange(e, "cliId")}
              selectedValue={formData.cliId}
            />
            <div className="col-sm-2">
              <button type="button" className="badge btn btn-primary">
                {t.Common.request} (+){" "}
              </button>
            </div>
            <label htmlFor="pryNombre" className="col-sm-1 col-form-label">
              {t.Account.business_name}
            </label>
            <div className="col-sm-5">
              <input
                type="text"
                className="form-control"
                id="pryNombre"
                value={formData.pryNombre}
                onChange={handleInputChange(formData, setFormData)}
              />
            </div>
          </div>

          <div className=" mb-3 row align-items-center">
            <SelectField
              label={t.Common.contact}
              options={contactOptions}
              preOption={t.Account.select}
              labelClassName="col-sm-1 col-form-label"
              divClassName="col-sm-3"
              onChange={(e) => handleSelectChange(e, "perId")}
              selectedValue={formData.perId}
            />
            <div className="col-sm-2">
              <button
                type="button"
                className="badge btn btn-primary"
                onClick={goContactCreate}
              >
                {t.Common.add} (+)
              </button>
            </div>
            <SelectField
              label={`${t.Account.type} ${t.Account.business}`}
              options={typeServiceOptions}
              preOption={t.Account.select}
              labelClassName="col-sm-1 col-form-label"
              divClassName="col-sm-3"
              onChange={(e) => handleSelectChange(e, "tseId")}
              selectedValue={formData.tseId}
            />
          </div>

          <div>
            <div className="mb-3 row align-items-center">
              <label
                htmlFor="confirmclient"
                className="col-sm-1 col-form-label"
              >
                {t.Common.confirm} {t.Common.client}
              </label>
              <div className="col-sm-3">
                <input
                  type="text"
                  className="form-control"
                  id="confirmclient"
                  value={formData.file1 ? formData.file1.name : "N/A"}
                  readOnly
                  onClick={() => openFileDialog(0)} // Abre el cuadro de diálogo del primer archivo
                  accept=".pdf, .jpg, .jpeg, .png"
                  disabled
                />
                <input
                  type="file"
                  ref={fileInputRefs[0]}
                  id="file1"
                  name="file1"
                  onChange={(event) => handleFileChange(event, 0)} // Maneja el primer archivo
                  style={{ display: "none" }}
                />
              </div>
              <div className="col-sm-2">
                <button
                  type="button"
                  className="badge btn btn-success"
                  onClick={() => openFileDialog(0)} // Abre el cuadro de diálogo del primer archivo
                >
                  {t.Common.uploadFile}
                </button>
              </div>
              <label htmlFor="proposal" className="col-sm-1 col-form-label">
                {t.Common.proposal} {t.Common.accepted}
              </label>
              <div className="col-sm-3">
                <input
                  type="text"
                  className="form-control"
                  id="proposal"
                  value={formData.file2 ? formData.file2.name : "N/A"}
                  readOnly
                  onClick={() => openFileDialog(1)} // Abre el cuadro de diálogo del segundo archivo
                  accept=".pdf, .jpg, .jpeg, .png"
                  disabled
                />
                <input
                  type="file"
                  ref={fileInputRefs[1]}
                  id="file2"
                  name="file2"
                  onChange={(event) => handleFileChange(event, 1)} // Maneja el segundo archivo
                  style={{ display: "none" }}
                />
              </div>
              <div className="col-sm-2">
                <button
                  type="button"
                  className="badge btn btn-success"
                  onClick={() => openFileDialog(1)} // Abre el cuadro de diálogo del segundo archivo
                >
                  {t.Common.uploadFile}
                </button>
              </div>
            </div>
          </div>
          <hr />

          <div className="mb-3 row align-items-center">
            <label
              htmlFor="estimatedStartDate"
              className="col-sm-1 col-form-label"
            >
              {t.business.estimatedStartDate}
            </label>
            <div className="col-sm-2">
              <MyDatePicker
                selectedDate={formData.startDate}
                onChange={(date) =>
                  setFormData({ ...formData, startDate: date })
                }
              />
            </div>
            <label htmlFor="months" className="col-sm-1 col-form-label">
              {t.business.estimatedTerm}
            </label>
            <div className="col-sm-2">
              <input
                type="number"
                className="form-control"
                id="months"
                name="months"
                min="1"
                max="60"
                value={formData.months || ""}
                onChange={handleInputChange(formData, setFormData)}
              />
            </div>
            <label htmlFor="endDate" className="col-sm-2 col-form-label">
              {t.business.estimatedClosingDate}
            </label>
            <div className="col-sm-2">
              <input
                type="text"
                className="form-control"
                id="endDate"
                name="endDate"
                value={formData.endDate || ""}
                required
                disabled
              />
            </div>
          </div>
        </div>
        <div className="mb-2 row d-flex justify-content-end">
          {/* <div className="col-sm-1">
            <button className="text-end badge btn btn-primary">
              {t.Common.include} ...{" "}
            </button>
          </div> */}
        </div>
        <div className="d-flex justify-content-end mt-2 mb-2">
          <div className="col-sm-2">
            <button className="btn btn-primary">{t.Common.saveDraf}</button>
          </div>
          <div className="col-sm-2">
            <button className="btn btn-primary">
              {t.business.saveClosing}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
export default FormService;
