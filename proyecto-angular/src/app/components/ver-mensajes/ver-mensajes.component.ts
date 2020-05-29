import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GLOBAL } from 'src/app/services/global';
import { MensajeService } from 'src/app/services/mensaje.service';
import { Mensaje } from 'src/app/models/mensaje';

@Component({
  selector: 'app-ver-mensajes',
  templateUrl: './ver-mensajes.component.html',
  styleUrls: ['./ver-mensajes.component.css'],
  providers: [MensajeService],
})
export class VerMensajesComponent implements OnInit {
  public titulo;
  public identity;
  public token;

  public mensajes;
  public mensaje: Mensaje;
  public comentario;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _mensajeService: MensajeService
  ) {
    this.titulo = 'Mostrar receta';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    /* this.getMensajesUser(this._route.snapshot.paramMap.get('id')); */
    this.getMensajesToUserByUser(
      this.identity.sub,
      this._route.snapshot.paramMap.get('id')
    );
    this.mensaje = new Mensaje(null, this.identity.sub, +this._route.snapshot.paramMap.get('id'), null, null, null);
  }
  ngOnInit(): void {}

  getMensajesToUserByUser(id_user1, id_user2) {
    this._mensajeService.getMensajesToUserByUser(id_user1, id_user2).subscribe(
      (response) => {
        this.mensajes = response.mensajes;
        console.log(this.mensajes);
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }
  enviarMensaje(mensaje) {
    console.log("this.mensaje");
    console.log(this.mensaje);
    if(this.mensaje.texto!=null && this.mensaje.texto!=''){
      this._mensajeService.create(this.token, this.mensaje).subscribe(
        (response) => {
          console.log("se supone que ha entrado");
          console.log(response);
          this.mensaje.texto='';
          this.getMensajesToUserByUser(this.identity.sub, this._route.snapshot.paramMap.get('id'));
        },
        (error) => {
          console.log(<any>error);
        }
      );
    }
  }
}
