'use server'

import { revalidatePath, revalidateTag } from "next/cache"

export async function UpdateDataPath(path) {
    revalidatePath(path)
  }
  export async function UpdateDataTag(tag) {
    revalidateTag(tag)
  }