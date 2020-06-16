import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';
import { RecetaService } from 'src/app/services/receta.service';
import { User } from 'src/app/models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Receta } from 'src/app/models/receta';
import { Follower } from 'src/app/models/follower';
import { FollowerService } from 'src/app/services/follower.service';
import {NgxPaginationModule} from 'ngx-pagination';

@Component({
  selector: 'app-ver-perfil',
  templateUrl: './ver-perfil.component.html',
  styleUrls: ['./ver-perfil.component.css', '../../app.component.css'],
  providers: [UserService, RecetaService, FollowerService]
})

export class VerPerfilComponent implements OnInit {

  public p=1;
  public avatar: any = '';
  public identity;
  public token;
  public user = new User(0, null, null, null, null, null, null, null, null, null);
  public follower = new Follower(null, 0, 0, 1, null, null);
  // Datos del usuario
  public seguidos = new Array<Follower>();
  public seguidores = new Array<Follower>();
  public recetas = new Array<Receta>();
  public receta
  public recetaImage;

  constructor(
    private _userService: UserService,
    private _recetaService: RecetaService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _followerService: FollowerService
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.getUser(this._route.snapshot.paramMap.get('id'))
  }

  ngOnInit(): void {
  }

  getUser(id): any {
    this._userService.getUser(id).subscribe(
      (response) => {
        if (response.status == 'success') {
          this.recetas = response.user.recetas;
          this.user = response.user;
          this.seguidores = response.user.seguidores;
          this.seguidos = response.user.seguidos;

          /*  console.log(this.recetas); */

        } else {
          /* this._router.navigate(['home']); */
        }
      },
      (error) => {
        console.log('error');
        console.log(<any>error);
      }
    );
    if (id != this.identity.sub) {

      this._followerService.existFollower(this.token, this.identity.sub, id).subscribe(
        response => {

          if (response.message == 'Existe') {
            this._followerService.getFollower(this.token, this.identity.sub, id).subscribe(
              response => {
                if (response.status == 'success') {

                  this.follower = response.follower;

                } else {
                  /* console.log(response.status); */
                  /*  this._router.navigate(['home']); */
                }
              },
              error => {
                console.log('error');
                console.log(<any>error);
              }
            );
            console.log(response.message);
          } else {
            /* console.log('No existe'); */
          }
        },
        error => {
          console.log(<any>error);
        }
      );
    }
  }

  seguir(id) {
    if (this.identity.sub == this.user.id) {
      console.log("Un usuario no puede seguirse a sí mismo");
    } else {
      if (this.follower.updated_at == null) {
        // Asignar valores de follower
        this.follower.id_follower = this.identity.sub;
        this.follower.id_followed = this.user.id;
        this.follower.id = 1;
        this._followerService.create(this.token, this.follower).subscribe(
          response => {
            if (response.status == 'success') {
              /* console.log('funciono el crear'); */
              this.getUser(this.user.id);
            }
          },
          error => {
            console.log(<any>error);
          }
        );
      } else {
        // actualizar
        /* this._router.navigate(['perfil-usuario', this.user.id]); */
        this._followerService.update(this.token, this.follower.id, this.follower).subscribe(
          (response) => {
            /* console.log(this.follower); */
            /* console.log(response);*/
            if (response.status == 'success') {
              /* console.log('funciono el crear'); */
              this.getUser(this.user.id);
            }
          },
          (error) => {
            console.log(<any>error);
          }
        );
      }
    }
  }

  /* getFollower(id_follower, id_followed){
    this._followerService.getFollower(this.token, id_follower, id_followed).subscribe(
      response=>{
        if(response.status=='success'){
          this.follower=response.follower;
        }
      },
      error=>{
        console.log('error');
        console.log(<any>error);
      }
    );
  } */

  borrarReceta(id) {
    let borrar = confirm("Seguro que quiere borrar la sección?");
    if (borrar) {
      this._recetaService.delete(this.token, id).subscribe(
        response => {
          /* this._router.navigate(['/perfil-usuario', this.identity.sub]); */
          this.getUser(this._route.snapshot.paramMap.get('id'));
        },
        error => {
          console.log(<any>error);
        }
      );
    }
  }
}
