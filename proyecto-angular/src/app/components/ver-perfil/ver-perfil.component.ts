import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { RecetaService } from 'src/app/services/receta.service';
import { User } from 'src/app/models/user';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-ver-perfil',
  templateUrl: './ver-perfil.component.html',
  styleUrls: ['./ver-perfil.component.css'],
  providers: [UserService, RecetaService],
})

export class VerPerfilComponent implements OnInit {

  public titulo;
  public user: User;
  public identity;
  public token;
  public image;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _recetaService: RecetaService
  ) {
    this.titulo="Ver perfil";

    // Esto no se si me hace falta ya que no se si voy a usar las variables
    this.identity=_userService.getIdentity();
    this.token=_userService.getToken();
  }

  ngOnInit(): void {
    // Cogemos la variable id de la ruta y la convertimos a entero poniendo el signo + delante
    this._route.params.subscribe((params)=>{
      let id= +params['id'];
      this.getUser(id);
    })

  }

  getUser(id) {
    this._userService.getUser(id).subscribe(
      (response) => {
        if (response.status == 'success') {
          /* console.log(response);  */
          this.user = response.user;
          console.log("a");
          console.log(this.user.email);
          console.log("b");
        } else {
          this._router.navigate(['home']);
        }
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }
  /* getImage() {
    this._recetaService.getImage(this.re).subscribe(
      (response) => {
        if (response) {
          this.image=response;
          console.log(this.image);

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
