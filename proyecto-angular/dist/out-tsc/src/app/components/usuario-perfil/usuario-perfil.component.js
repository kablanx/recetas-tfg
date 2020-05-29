import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
let UsuarioPerfilComponent = class UsuarioPerfilComponent {
    constructor(_userService, _recetaService, _route, _router) {
        this._userService = _userService;
        this._recetaService = _recetaService;
        this._route = _route;
        this._router = _router;
        this.avatar = '';
        this.recetas = new Array();
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.user = new User(1, 'usuario', '', '', '', '', '', '', '', '');
    }
    ngOnInit() {
        this.getUser(this._route.snapshot.paramMap.get('id'));
    }
    getUser(id) {
        this._userService.getUser(id).subscribe((response) => {
            if (response.status == 'success') {
                /* console.log(response);  */
                this.user = response.user;
                console.log(this.user);
                this.recetas = response.user.recetas;
                console.log("this.recetas");
                console.log(this.recetas);
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
    getImage() {
        this._recetaService.getImage(this.receta.image1).subscribe((response) => {
            console.log(response);
            if (response) {
                this.recetaImage = response;
                console.log(this.recetaImage);
                /* console.log(localStorage.getItem('identity')); */
            }
            else {
                console.log('errorrrrrr');
            }
        }, (error) => {
            console.log(error);
        });
    }
};
UsuarioPerfilComponent = __decorate([
    Component({
        selector: 'app-usuario-perfil',
        templateUrl: './usuario-perfil.component.html',
        styleUrls: ['./usuario-perfil.component.css'],
    })
], UsuarioPerfilComponent);
export { UsuarioPerfilComponent };
//# sourceMappingURL=usuario-perfil.component.js.map