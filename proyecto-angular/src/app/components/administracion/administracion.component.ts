import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from '../../services/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from '../../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css'],
  providers:[UserService]
})
export class AdministracionComponent implements OnInit {

  public titulo;
  public identity;
  public token;

  public avatar: any='';
  public user1: User;
  public users;

  constructor(
    private _userService: UserService,
    private sanitizer: DomSanitizer,
    private _route: ActivatedRoute,
    private _router: Router,
  ) {
    this.titulo = 'Inicio';
    this.identity = _userService.getIdentity();
    this.token=_userService.getToken();
    this.getUsers();
    this.getUser();
  }

  ngOnInit(): void {
  }

  getUser(){
    this._userService.getUser(this.identity.sub).subscribe(
      response=>{
        this.user1=response.user;
        console.log("this.user");
      },
      error=>{
        console.log(<any>error);
      }
    );
  }
  public getUsers(){
    this._userService.getUsers(this.token).subscribe(
      response=>{
        this.users=response.users;
      },
      error=>{
        console.log(<any>error);
      }
    );
  }

  public deleteUser(id){
    this._userService.delete(this.token, id).subscribe(
      (response) => {
        this.getUsers();
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }
}
