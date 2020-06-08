import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Receta } from 'src/app/models/receta';
import { Comentario } from 'src/app/models/comentario';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GLOBAL } from 'src/app/services/global';
import { RecetaService } from 'src/app/services/receta.service';
import { ComentarioService } from 'src/app/services/comentario.service';
import { Like } from 'src/app/models/like';
import { LikeService } from 'src/app/services/like.service';

@Component({
  selector: 'app-receta-mostrar',
  templateUrl: './receta-mostrar.component.html',
  styleUrls: ['./receta-mostrar.component.css', '../../app.component.css'],
  providers: [UserService, RecetaService, ComentarioService, LikeService],
})
export class RecetaMostrarComponent implements OnInit {
  public titulo: string;
  public identity;
  public token;
  public receta: Receta;
  public comentario: Comentario;
  public mostrar = false;

  public like = new Like(null, 1, 1, 0, null, null);
  public likes;
  public comentarios;

  public editar = false;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _recetaService: RecetaService,
    private _comentarioService: ComentarioService,
    private _likeService: LikeService
  ) {
    this.titulo = 'Mostrar receta';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    /* this.receta=this._recetaService */
    this.getReceta(this._route.snapshot.paramMap.get('id'));
    this.comentario = new Comentario(null, this.identity.sub, null, '', '', '');
  }

  ngOnInit(): void { }
  getReceta(id) {
    this._recetaService.getReceta(id).subscribe(
      (response) => {
        if (response.status == 'success') {
          /* console.log(response);  */
          this.receta = response.receta;
          this.likes = response.likes;
          this.comentarios = response.receta.comentarios;
          /* this.recetas=response.user.recetas;
          console.log("this.recetas");
          console.log(this.recetas); */
          /*  this.avatar=this.getImage();
          console.log(this.avatar); */
        } else {
          this._router.navigate(['home']);
        }
      },
      (error) => {
        console.log('error');
        console.log(<any>error);
      }
    );
    this.getLike();
    /* this._likeService.getLike(this.identity.sub, id).subscribe(
      (response) => {
        if (response.status == 'success') {
          this.like = response.dato;
          console.log('hola');
          console.log(this.like);
        }
      },
      (error) => {
        console.log(<any>error);
      }
    ); */
  }

  enviarComentario(form) {
    // asignar datos comentario
    this.comentario.id_receta = this.receta.id;
    if (this.comentario.texto != '') {
      console.log('hola');
      this._comentarioService.create(this.token, this.comentario).subscribe(
        (response) => {
          if ((response.status = 'success')) {
            console.log('funciono');
            form.reset();
            this.comentario.texto = '';
            this.getReceta(this._route.snapshot.paramMap.get('id'));
          }
        },
        (error) => {
          console.log(<any>error);
        }
      );
    }
  }

  editarComentario(form) { }

  borrarComentario(id) {
    let borrar = confirm("Seguro que quiere borrar la sección?");
    if (borrar) {
      this._comentarioService.delete(this.token, id).subscribe(
        (response) => {
          this.getReceta(this._route.snapshot.paramMap.get('id'));
        },
        (error) => {
          console.log(<any>error);
        }
      );
    }
  }

  editarSi(id) {
    this.editar = true;
  }

  getLike() {
    this._likeService.getLike(this.identity.sub, this._route.snapshot.paramMap.get('id')).subscribe(
      (response) => {
        if (response.status == 'success') {
          /* console.log('funciono');
          console.log('response');
          console.log(response); */
          /* this.like=response; */
          this.like = response.dato;
          console.log('hola');
          console.log(this.like);
          /* console.log(this.like); */
          /* this._router.navigate(['mostrar-receta', this.receta.id]); */
        }
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  darLike() {
    console.log(this.like);
    if (
      this.like.updated_at == null /* || this.like.updated_at==new Date() */
    ) {
      console.log('a');
      this.like.gustado = 1;
      this.like.id_usuario = this.identity.sub;
      this.like.id_receta = this.receta.id;
      this._likeService.create(this.token, this.like).subscribe(
        (response) => {
          if (response.status == 'success') {
            console.log('funciono');
            this.getReceta(this._route.snapshot.paramMap.get('id'));
          }
        },
        (error) => {
          console.log(<any>error);
        }
      );
    } else {
      this._likeService.update(this.token, this.like.id, this.like).subscribe(
        (response) => {
          if (response.status == 'success') {
            this.getReceta(this._route.snapshot.paramMap.get('id'));
            console.log('funciono el editar');
          }
        },
        (error) => {
          console.log(<any>error);
        }
      );
    }

    /* if(!this.like){
      this.like = new Like(
        null,
        this.identity.sub,
        this.receta.id,
        1,
        null,
        null
      );
      console.log("unga");
    } */
    /* console.log(this.like); */
    /* console.log('a entrao');


     */
  }

  vaciarTextArea() {
    this.comentario.texto = '';
  }

  mostrarDatos() {
    if (this.mostrar == false) {
      this.mostrar = true;
    } else {
      this.mostrar = false;
    }
  }

  borrarReceta(id) {
    let borrar = confirm("Seguro que quiere borrar la sección?");
    if (borrar) {
      this._recetaService.delete(this.token, id).subscribe(
        response => {
          /* this._router.navigate(['/perfil-usuario', this.identity.sub]); */
          this._router.navigate(['/perfil-usuario', this.identity.sub]);
        },
        error => {
          console.log(<any>error);
        }
      );
    }
  }
}
