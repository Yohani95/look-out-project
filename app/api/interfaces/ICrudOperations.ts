export default interface ICrudOperations<T> {
    create(item: T): Promise<any>;
    update(item: T): Promise<any>;
    getById(id: string | number): Promise<any>;
    getAll(): Promise<any>;
    deleteById(id: string | number): Promise<any>;
  }
  