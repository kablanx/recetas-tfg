import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers: [UserService],
})
export class RegistroComponent implements OnInit {
  public titulo: string;
  public user: User;
  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.titulo = 'Registro';
    this.user = new User(1, 'usuario', '', '', '', '', 'usuario.png', '', '', '');
  }

  ngOnInit(): void {}

  onSubmit(form) {
    /* console.log(this.user);

    console.log(this._userService.pruebas()); */

    this._userService.register(this.user).subscribe(
      (response) => {
        if(response.status=='success'){
          this.status = response.status;
          this.user = new User(null, 'usuario', '', '', '', '', 'usuario.png', '', '','');
          form.reset();
        }else{
          this.status='error';
        }
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }
}
