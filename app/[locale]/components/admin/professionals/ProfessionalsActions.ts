'use server'
 
import { personApiUrl } from '@/app/api/apiConfig';
import axios from 'axios';
import { revalidatePath, revalidateTag } from 'next/cache'
 
export async function EditAction() {
    revalidatePath('/')
}
export const deletePersonById=async (id) =>{
  try {
    const response = await axios.delete(`${personApiUrl}/${id}`);
    revalidatePath('/')
    revalidatePath('/admin/professional/search')
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }finally{

  }
}
export async function tagAction(tag) {
  revalidateTag(tag)
}