import { Component, OnInit, DoCheck, ɵConsole } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { RecetaService } from 'src/app/services/receta.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { $ } from 'protractor';

@Component({
  selector: 'app-explorar',
  templateUrl: './explorar.component.html',
  styleUrls: ['./explorar.component.css'],
  providers: [UserService, RecetaService],
})
export class ExplorarComponent implements OnInit {
  public titulo;
  public identity;
  public token;

  public users;
  public recetas;

  public avatar: '';

  public mostrarUsuario=true;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _recetaService: RecetaService
  ) {
    this.titulo = 'Editar perfil';
    this.identity = _userService.getIdentity();
    this.token = _userService.getToken();
    this.getRecetas(this.token);
    this.getUsers(this.token);
  }

  ngOnInit(): void {
    // subscribe es para el observable y recoger el resultado del api
  }

  getUsers(token) {
    this._userService.getUsers(token).subscribe(
      (response) => {
        if (response.status == 'success') {
          this.users = response.users;
          console.log('users');
          console.log(this.users);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getRecetas(token) {
    this._recetaService.getRecetas(token).subscribe(
      (response) => {
        if (response.status == 'success') {
          this.recetas = response.recetas;
          console.log('recetas');
          console.log(this.recetas);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  mostrarUsuarios(){
    this.mostrarUsuario=true;
  }
  mostrarRecetas(){
    this.mostrarUsuario=false;
  }


/*  getImage() {
    this._userService.getImage(this.identity.avatar).subscribe(
      (response) => {
        if (response) {


          this.avatar = response;
          console.log(this.avatar);

          console.log(localStorage.getItem('identity'));
        } else {
          console.log('errorrrrrr');
        }
      },
      (error) => {
        console.log(<any>error);
      }
    );
  } */
}
