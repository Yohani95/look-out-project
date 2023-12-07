"use server"
import { revalidatePath, revalidateTag } from 'next/cache'
 
export async function RefreshList() {
    revalidatePath('/')
}