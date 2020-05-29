export class Receta {
  constructor(
    public id: number,
    public id_usuario: number,
    public nombre: string,
    public ingredientes: string,
    public descripcion: string,
    public image1: string,
    public image2: string,
    public image3: string,
    public video1: string,
    public video2: string,
    public created_at: any,
    public updated_at: any
  ) {}
}
