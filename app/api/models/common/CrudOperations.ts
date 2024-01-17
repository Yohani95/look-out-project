
import { revalidateTag,revalidatePath } from 'next/cache';
import ICrudOperations  from '@/app/api/interfaces/ICrudOperations';
export  class CrudOperations<T> implements ICrudOperations<T> {
  
  constructor(private apiUrl: string, private tag: string) {}

  async create(item: T) {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item)
      });
      if(response.ok){
        revalidateTag(this.tag)
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  async update(item: T) {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item)
      });
      if(response.ok){
        revalidateTag(this.tag)
      }
      return response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  async getById(id: string | number) {
    try {
      const response = await fetch(`${this.apiUrl}/${id}`);
      return response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  async getAll() {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-cache',
        next:{tags:[this.tag]}
      });
      return response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  async deleteById(id: string | number) {
    try {
      const response = await fetch(`${this.apiUrl}/${id}`, {
        method: 'DELETE'
      });
      if(response.ok){
        revalidateTag(this.tag)
        return response.ok;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }
}