import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['../../app.component.css'],
  providers: [UserService],
})
export class LoginComponent implements OnInit {
  public titulo: string;
  public user: User;
  public token;
  public identity;
  public status:string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.titulo = 'Login';
    this.user = new User(null, '', '', '', '', '', '', '', '','');
    this.identity = this._userService.getIdentity();
  }

  ngOnInit() {
    console.log('login.component cargado correctamente!');
    console.log(this.identity);
    console.log(this.user);
    this.logout();

   /*  if(this.identity==null){
      this.logout();
    }else{
      this._router.navigate(['inicio']);
    } */

  }

  onSubmit(form) {
    /* console.log(this.user); */
    this._userService.signup(this.user).subscribe(
      (response) => {
        if (response.status != 'error') {

          this.status='success';
          // Conseguir el token
          /* console.log(response); */
          this.token = response;
          localStorage.setItem('token', this.token);

          // Objeto usuario identificado
          this._userService.signup(this.user, true).subscribe(
            (response) => {
              // Conseguir el token
              /* console.log(response); */
              this.identity = response;
              localStorage.setItem('identity', JSON.stringify(this.identity));
              // Objeto usuario identificado
              window.location.href = "http://localhost:4200/inicio"
              this._router.navigate(['inicio']);

            },
            (error) => {
              console.log(<any>error);
            }
          );
        }else{
          this.status='error';
        }
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  logout() {
    this._route.params.subscribe((params) => {
      let logout = +params['sure'];
      if (logout == 1) {
        localStorage.removeItem('identity');
        localStorage.removeItem('token');
        this.identity = null;
        this.token = null;
        this._router.navigate(['/login']);

      }
    });
  }
}
