export class Mensaje {
  constructor(
    public id: number,
    public id_usuario_e: number,
    public id_usuario_r: number,
    public texto: string,
    public created_at: any,
    public updated_at: any
  ) {}
}
