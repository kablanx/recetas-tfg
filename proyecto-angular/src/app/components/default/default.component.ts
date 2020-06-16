import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RecetaService } from 'src/app/services/receta.service';
import { Receta } from 'src/app/models/receta';
import {NgxPaginationModule} from 'ngx-pagination';
@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css','../../app.component.css'],
  providers: [UserService, RecetaService],
})
export class DefaultComponent implements OnInit {
  public titulo: string;
  public user: User;
  public status: string;
  public recetas;
  public p=1;
  public token;
  public identity;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _recetaService: RecetaService
  ) {
    this.titulo = 'Inicio';
    this.identity = _userService.getIdentity();
    this.token=_userService.getToken();
    this.getRecetasSeguidos(this.identity.sub);
  }

  ngOnInit(): void {
    console.log('default.component cargado correctamente!!');
    console.log("this.identity");
    console.log(this.identity);
    /* console.log(this.recetas); */
  }

  getRecetasSeguidos(id){
    this._recetaService.getRecetasSeguidos(id).subscribe(
      response=>{
        this.recetas=response.recetas;
        console.log(this.recetas);
      },
      error=>{
        console.log(<any>error);
      }
    )
  }
}
