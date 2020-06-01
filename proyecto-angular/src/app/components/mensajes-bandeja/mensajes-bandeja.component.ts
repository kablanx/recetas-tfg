import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GLOBAL } from 'src/app/services/global';
import { MensajeService } from 'src/app/services/mensaje.service';
import { Mensaje } from 'src/app/models/mensaje';
import { format } from 'path';

@Component({
  selector: 'app-mensajes-bandeja',
  templateUrl: './mensajes-bandeja.component.html',
  styleUrls: ['./mensajes-bandeja.component.css', '../../app.component.css'],
  providers: [MensajeService],
})
export class MensajesBandejaComponent implements OnInit {
  public titulo;
  public identity;
  public token;

  public mensajes;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _mensajeService: MensajeService
  ) {
    this.titulo = 'Mostrar receta';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.getMensajesUser(this._route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {}

  getMensajesUser(id) {
    this._mensajeService.getMensajesUser(id).subscribe(
      (response) => {
        this.mensajes = response.mensajes;

        this.mensajes.forEach(mensaje1 => {
          let cont=0;
          this.mensajes.forEach(mensaje2 => {
            if (
              mensaje1.id_usuario_r === mensaje2.id_usuario_e && mensaje1.id_usuario_e === mensaje2.id_usuario_r/* &&
              this.mensajes[i].id_usuario_r == this.mensajes[j].id_usuario_e */
            ) {
              console.log("deberia de funcionar");
              this.mensajes.splice(cont,1);
            }
            cont++
          });
        });
        console.log(this.mensajes);

      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  borrarMensajes(id){
    /* this._mensajeService. */
  }
}
