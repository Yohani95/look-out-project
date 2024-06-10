"use server"

import { LogApiUrl } from '@/app/api/apiConfig';
import  {CrudOperations} from "@/app/api/models/common/CrudOperations" ;
import LogEntry from '@/app/api/models/log/LogEntry';

const tag = "LogActions";
const LogCrud = new CrudOperations<LogEntry>(LogApiUrl,tag);

export const createLog = async (item: LogEntry) => LogCrud.create(item);
export const updateLog = async (item: LogEntry,id:string | number) => LogCrud.update(item,id);
export const getLogById = async (id: string | number) => LogCrud.getById(id);
export const deleteLog = async (id: string | number) => LogCrud.deleteById(id);
export const getAllLog = async () => LogCrud.getAll();
export const revalidateDataLog = async () => LogCrud.revalidateData();