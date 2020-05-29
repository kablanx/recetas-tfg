export class User{
   constructor(
      public id: number,
      public rol: string,
      public email: string,
      public password: string,
      public name: string,
      public surname: string,
      public avatar: any,
      public created_at: any,
      public updated_at: any,
      public remember_token: any
   ){}
}