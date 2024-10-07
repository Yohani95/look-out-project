import { revalidateTag, revalidatePath } from 'next/cache';
import ICrudOperations from '@/app/api/interfaces/ICrudOperations';
export class CrudOperations<T> implements ICrudOperations<T> {
  constructor(private apiUrl: string, private tag: string) {}

  async create(item: T) {
    'use server';
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });
      if (response.ok) {
        revalidateTag(this.tag); // Revalida solo si la operación fue exitosa
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }

  async update(item: T, id: string | number) {
    'use server';
    try {
      const response = await fetch(`${this.apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });
      if (response.ok) {
        revalidateTag(this.tag);
        return response.status;
      }
      return response.status;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }

  async getById(id: string | number) {
    'use server';
    try {
      const response = await fetch(`${this.apiUrl}/${id}`, {
        cache: 'no-cache',
      });
      return response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }

  async getAll() {
    'use server';
    try {
      const response = await fetch(this.apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: { tags: [this.tag] },
        cache: 'no-cache',
      });
      return response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }

  async deleteById(id: string | number) {
    try {
      const response = await fetch(`${this.apiUrl}/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        revalidateTag(this.tag);
        return response.ok;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }
  async revalidateData(tag = this.tag) {
    revalidateTag(tag);
  }
}
