import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Comentario } from 'src/app/models/comentario';
import { RecetaService } from 'src/app/services/receta.service';
import { ComentarioService } from 'src/app/services/comentario.service';
import { Like } from 'src/app/models/like';
import { LikeService } from 'src/app/services/like.service';
let RecetaMostrarComponent = class RecetaMostrarComponent {
    constructor(_route, _router, _userService, _recetaService, _comentarioService, _likeService) {
        this._route = _route;
        this._router = _router;
        this._userService = _userService;
        this._recetaService = _recetaService;
        this._comentarioService = _comentarioService;
        this._likeService = _likeService;
        this.editar = false;
        this.titulo = 'Mostrar receta';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        /* this.receta=this._recetaService */
    }
    ngOnInit() {
        // Obtener los datos de la receta
        this.getReceta(this._route.snapshot.paramMap.get('id'));
        /* console.log("Receta");
        console.log(this.receta); */
        this.comentario = new Comentario(null, this.identity.sub, null, '', '', '');
        /* this.like = new Like(
          null,
          this.identity.sub,
          this.receta.id,
          null,
          null,
          null
        ); */
        /* this.comentario=new Comentario(
          null,
          this.identity.sub,
          this.receta.id,
          '',
          '',
          ''
        );
    
        this.comentario.id_receta=this.receta.id;
        this.comentario.id_usuario=this.identity.sub; */
    }
    getReceta(id) {
        this._recetaService.getReceta(id).subscribe((response) => {
            if (response.status == 'success') {
                /* console.log(response);  */
                this.receta = response.receta;
                console.log('this.receta');
                console.log(this.receta);
                this.comentarios = response.receta.comentarios;
                console.log(this.comentarios);
                /* this.recetas=response.user.recetas;
                console.log("this.recetas");
                console.log(this.recetas); */
                /*  this.avatar=this.getImage();
                console.log(this.avatar); */
            }
            else {
                this._router.navigate(['home']);
            }
        }, (error) => {
            console.log('error');
            console.log(error);
        });
    }
    enviarComentario(form) {
        // asignar datos comentario
        this.comentario.id_receta = this.receta.id;
        this._comentarioService.create(this.token, this.comentario).subscribe((response) => {
            if ((response.status = 'success')) {
                console.log('funciono');
                this._router.navigate(['mostrar-receta', this.receta.id]);
            }
        }, (error) => {
            console.log(error);
        });
    }
    editarComentario(form) { }
    borrarComentario(id) {
        this._comentarioService.delete(this.token, id).subscribe((response) => {
            this.getReceta(this._route.snapshot.paramMap.get('id'));
        }, (error) => {
            console.log(error);
        });
    }
    editarSi(id) {
        this.editar = true;
    }
    darLike() {
        this.getLike();
        if (!this.like) {
            this.like = new Like(null, this.identity.sub, this.receta.id, 1, null, null);
            console.log("unga");
        }
        /* console.log('a entrao');
    
    
        this._likeService.create(this.token, this.like).subscribe(
          (response) => {
            if (response.status == 'success') {
              console.log('funciono');
              this._router.navigate(['mostrar-receta', this.receta.id]);
            }
          },
          (error) => {
            console.log(<any>error);
          }
        ); */
    }
    getLike() {
        this._likeService.getLike(this.identity.sub, this.receta.id).subscribe((response) => {
            if (response) {
                console.log('funciono');
                console.log("response");
                console.log(response);
                this.like = response.dato;
                console.log(this.like);
                /* this._router.navigate(['mostrar-receta', this.receta.id]); */
            }
        }, (error) => {
            console.log(error);
        });
    }
};
RecetaMostrarComponent = __decorate([
    Component({
        selector: 'app-receta-mostrar',
        templateUrl: './receta-mostrar.component.html',
        styleUrls: ['./receta-mostrar.component.css'],
        providers: [UserService, RecetaService, ComentarioService, LikeService],
    })
], RecetaMostrarComponent);
export { RecetaMostrarComponent };
//# sourceMappingURL=receta-mostrar.component.js.map