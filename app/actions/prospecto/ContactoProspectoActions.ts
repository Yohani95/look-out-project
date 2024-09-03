'use server';

import { ContactoProspectoApiUrl } from '@/app/api/apiConfig';
import { CrudOperations } from '@/app/api/models/common/CrudOperations';
import ContactoProspecto from '@/app/api/models/prospecto/ContactoProspecto';

const tag = 'ContactoProspectoActions';
const ContactoProspectoCrud = new CrudOperations<ContactoProspecto>(
  ContactoProspectoApiUrl,
  tag
);

export const createContactoProspecto = async (item: ContactoProspecto) =>
  ContactoProspectoCrud.create(item);
export const updateContactoProspecto = async (
  item: ContactoProspecto,
  id: string | number
) => ContactoProspectoCrud.update(item, id);
export const getContactoProspectoById = async (id: string | number) =>
  ContactoProspectoCrud.getById(id);
export const deleteContactoProspecto = async (id: string | number) =>
  ContactoProspectoCrud.deleteById(id);
export const getAllContactoProspecto = async () =>
  ContactoProspectoCrud.getAll();
export const revalidateDataContactoProspecto = async () =>
  ContactoProspectoCrud.revalidateData();
