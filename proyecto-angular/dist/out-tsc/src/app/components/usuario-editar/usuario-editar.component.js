import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { GLOBAL } from '../../services/global';
let UsuarioEditarComponent = class UsuarioEditarComponent {
    constructor(_route, _router, _userService) {
        this._route = _route;
        this._router = _router;
        this._userService = _userService;
        this.afuConfig = {
            multiple: false,
            formatsAllowed: ',jpg, .png, .jpeg',
            maxSize: '50',
            uploadAPI: {
                url: GLOBAL.url + 'user/upload',
                headers: {
                    Authorization: this._userService.getToken(),
                },
            },
            theme: 'attachPin',
            hideProgressBar: false,
            hideResetBtn: true,
            hideSelectBtn: false,
            replaceTexts: {
                selectFileBtn: 'Select Files',
                resetBtn: 'Reset',
                uploadBtn: 'Upload',
                dragNDropBox: 'Drag N Drop',
                attachPinBtn: 'Sube tu avatar de usuario',
                afterUploadMsg_success: 'Successfully Uploaded !',
                afterUploadMsg_error: 'Upload Failed !',
            },
        };
        this.titulo = 'Editar perfil';
        this.user = new User(1, 'usuario', '', '', '', '', 'usuario.png', '', '', '');
        this.identity = _userService.getIdentity();
        this.token = _userService.getToken();
        this.url = GLOBAL.url;
        this.user = new User(this.identity.sub, 'usuario', this.identity.email, '', this.identity.name, this.identity.surname, this.identity.avatar, '', '', '');
    }
    ngOnInit() {
        this._route.params.subscribe((params) => {
            // Lo convertimos a entero poniendo el + delante
            let id = +params['id'];
            this.getUser(id);
            /* console.log("user");
            console.log(this.user); */
        });
    }
    /* ngDoCheck(){
      this.identity=this._userService.getIdentity();
      this.token=this._userService.getToken();
    } */
    getUser(id) {
        this._userService.getUser(id).subscribe((response) => {
            if (response.status == 'success') {
                /* console.log("response");
                console.log(response); */
                // Asignamos los datos del usuario, ya que el response.user tiene datos de recetas y seguidores también
                this.user.avatar = response.user.avatar;
                this.user.name = response.user.name;
                this.user.surname = response.user.surname;
                this.user.email = response.user.email;
                console.log(this.user);
            }
            else {
                this._router.navigate(['home']);
            }
        }, (error) => {
            console.log(error);
        });
    }
    // Editar usuario
    onSubmit(form) {
        // Llamamos al servicio usuario, y usamos el método update
        console.log(this.user);
        this._userService.update(this.token, this.user).subscribe((response) => {
            if (response && response.status) {
                console.log(response);
                this.status = 'success';
                // Actualizar usuario en sesion
                if (response.changes.name) {
                    this.identity.name = response.changes.name;
                }
                if (response.changes.surname) {
                    this.identity.surname = response.changes.surname;
                }
                if (response.changes.email) {
                    this.identity.email = response.changes.email;
                }
                if (response.changes.image) {
                    /* console.log(response.changes.image) */
                    this.identity.avatar = response.changes.avatar;
                }
                /* console.log("funciono");
                  console.log(this.user);
                  this.identity = this.user; */
                /*  this.identity.password = */
                /* localStorage.removeItem('identity');*/
                /* console.log(localStorage.getItem('identity')); */
                localStorage.setItem('identity', JSON.stringify(this.identity));
                /* console.log(localStorage.getItem('identity')); */
                form.reset();
            }
        }, (error) => {
            console.log('error');
            console.log(error);
        });
    }
    avatarUpload(datos) {
        console.log(datos);
        let data = JSON.parse(datos.response);
        this.identity.avatar = data.image;
    }
};
UsuarioEditarComponent = __decorate([
    Component({
        selector: 'app-usuario-editar',
        templateUrl: './usuario-editar.component.html',
        styleUrls: ['./usuario-editar.component.css'],
        providers: [UserService],
    })
], UsuarioEditarComponent);
export { UsuarioEditarComponent };
//# sourceMappingURL=usuario-editar.component.js.map