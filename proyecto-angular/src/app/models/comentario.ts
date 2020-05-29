export class Comentario {
  constructor(
    public id: number,
    public id_usuario: number,
    public id_receta: number,
    public texto: string,
    public created_at: any,
    public updated_at: any
  ) {}
}
