import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from './models/user';
import { RecetaService } from './services/receta.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService, RecetaService],
})
export class AppComponent implements OnInit, DoCheck {
  public identity;
  public token;

  public avatar: any='';
  public user: User;

  constructor(
    private _userService: UserService,
    private sanitizer: DomSanitizer,
    private _route: ActivatedRoute,
    private _router: Router,
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.getUser(this.identity.sub);
  }
  ngOnInit() {
    console.log('app.component cargado');
  }

  // Comprobar token e identity cuando algo cambie
  ngDoCheck() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  perfilUsuario(id){
    this._router.navigate(['/perfil-usuario', id]);
  }

  getUser(id){
    this._userService.getUser(id).subscribe(
      response=>{
        this.user=response.user;
        console.log("this.user");
        console.log(this.user);
      },
      error=>{
        console.log(<any>error);
      },
    );
  }
  /*  getImage() {
    this._userService.getImage(this.identity.avatar).subscribe(
      (response) => {
        if (response) {
          this.avatar=response;
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
