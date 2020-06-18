import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from './models/user';
import { RecetaService } from './services/receta.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as jsPDF from 'jspdf';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService, RecetaService],
})
export class AppComponent implements OnInit, DoCheck {
  public identity;
  public token;
  public users;
  public avatar: any='';
  public user: User;
  public x=10;
  public y=15;

  constructor(
    private _userService: UserService,
    private sanitizer: DomSanitizer,
    private _route: ActivatedRoute,
    private _router: Router,
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    if(this.identity){
      this.getUser(this.identity.sub);
      this.getUsers();
    }


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
  getUsers(){
    this._userService.getUsers(this.token).subscribe(
      response=>{
        this.users=response.users;
        console.log("this.user");
        console.log(this.users);
      },
      error=>{
        console.log(<any>error);
      },
    );
  }

  pdfUsers(){
    var doc=new jsPDF('l','mm',[297,210]);
    doc.text("LISTADO DE USUARIOS DE FOOD-4U", 71, 7);
    this.users.forEach(element => {
      doc.text(
        element.id +' - '+
        element.name +' - '+
        element.surname +' - '+
        element.email +' - '+
        element.created_at +' - ',this.x,this.y, true
      );
      this.y += 10;
    });
    doc.save('Users.pdf');
  }
}
