"use client";
import React, { useState,useEffect } from "react";
import {
  handleInputChange,
  handleSubmit,
} from "@/app/[locale]/utils/user/userFormLogic";
import { userApiUrl, apiHeaders } from "@/app/api/apiConfig";
import NotificationSweet from '@/app/[locale]/components/common/NotificationSweet';
import { useRouter} from "next/navigation";
function UserForm({locale,isEdit,id}) {
  const router = useRouter();
  let translations;
  translations = require(`@/messages/${locale}.json`);
  const [formData, setFormData] = useState({
    usu_nombre: "",
    usu_contraseña: "",
    usu_contraseña2: "",
    per_id: 0, // Ejemplo de campo adicional
    prf_id: 0, // Ejemplo de campo adicional
    usu_vigente: 0, // Ejemplo de campo adicional
    // Otros campos del formulario
  });
  if (id != null && !isNaN(id)) {
    useEffect(() => {
      // Realiza una llamada API para obtener los datos del usuario por su ID
      // y actualiza el estado formData con los datos obtenidos
      fetchUserData(id);
    }, [id]);
  }
  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(`${userApiUrl}/${userId}`);
      if(response.ok){
        const userData = await response.json();
        userData.usu_contraseña = "";
        userData.usu_contraseña2 = "";
        setFormData(userData); // Actualiza el estado formData con los datos obtenidos
      }else if(response.status==404){
        NotificationSweet({
          title: translations.notification.warning.title,
          text: translations.Common.notExist,
          type: translations.notification.warning.type,
          push: router.push,
          link:'/admin/user/list'
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const handleFormSubmit = handleSubmit(
    formData,
    setFormData,
    translations,
    router.push,
    id,
    isEdit
  );
  const cancel=()=>{
    router.back()
  }
  return (
    <div className="container ">
      <h4>{isEdit ?  translations.user.editUser : translations.user.createUser}</h4>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label htmlFor="usu_nombre" className="form-label">
            {translations.Common.userName}
          </label>
          <input
            type="text"
            className="form-control"
            id="usu_nombre"
            name="usu_nombre"
            value={formData.usu_nombre}
            onChange={handleInputChange(formData, setFormData)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="usu_contraseña" className="form-label">
            {translations.Common.password}
          </label>
          <input
            type="password"
            className="form-control"
            id="usu_contraseña"
            name="usu_contraseña"
            value={formData.usu_contraseña}
            onChange={handleInputChange(formData, setFormData)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="usu_contraseña2" className="form-label">
            {translations.Common.password}
          </label>
          <input
            type="password"
            className="form-control"
            id="usu_contraseña2"
            name="usu_contraseña2"
            value={formData.usu_contraseña2}
            onChange={handleInputChange(formData, setFormData)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="per_id" className="form-label">
            {translations.user.idPerson}
          </label>
          <input
            type="number"
            className="form-control"
            id="per_id"
            name="per_id"
            value={formData.per_id}
            onChange={handleInputChange(formData, setFormData)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="prf_id" className="form-label">
            {translations.user.idProfile}
          </label>
          <input
            type="number"
            className="form-control"
            id="prf_id"
            name="prf_id"
            value={formData.prf_id}
            onChange={handleInputChange(formData, setFormData)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="usu_vigente" className="form-label">
            {translations.user.active}
          </label>
          <select
            className="form-control"
            id="usu_vigente"
            name="usu_vigente"
            value={formData.usu_vigente}
            onChange={handleInputChange(formData, setFormData)}
            required
          >
            <option value={1}>Yes</option>
            <option value={0}>No</option>
          </select>
        </div>
        {/* Agregar más campos aquí */}
        <button type="submit" className="btn btn-primary">
          {isEdit ?  translations.Common.edit:translations.Common.saveButton}
        </button>
        <button type="button" className="btn btn-danger m-2" onClick={cancel}>
          {translations.Common.cancel}
        </button>
      </form>
    </div>
  );
}

export default UserForm;
