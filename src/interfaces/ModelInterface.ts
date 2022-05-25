export interface Model<T> {
  create(obj: T): Promise<T>,
  read(): Promise<T[]>,
  readOne(id_: string): Promise<T | null>,
  update(od:string, obj: T): Promise<T | null>
  delete(id_: string): Promise<T | null>
}