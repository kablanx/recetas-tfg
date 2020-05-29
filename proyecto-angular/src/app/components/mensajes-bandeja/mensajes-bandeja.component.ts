import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GLOBAL } from 'src/app/services/global';
import { MensajeService } from 'src/app/services/mensaje.service';
import {Mensaje } from 'src/app/models/mensaje';

@Component({
  selector: 'app-mensajes-bandeja',
  templateUrl: './mensajes-bandeja.component.html',
  styleUrls: ['./mensajes-bandeja.component.css'],
  providers: [MensajeService]
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

  ngOnInit(): void {

  }

  getMensajesUser(id){
    this._mensajeService.getMensajesUser(id).subscribe(
      response=>{
        this.mensajes=response.mensajes;
        console.log(this.mensajes);
      },
      error=>{
        console.log(<any>error);
      }
    );
  }

}
