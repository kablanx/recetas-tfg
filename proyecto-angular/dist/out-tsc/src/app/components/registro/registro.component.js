import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/user.service';
let RegistroComponent = class RegistroComponent {
    constructor(_route, _router, _userService) {
        this._route = _route;
        this._router = _router;
        this._userService = _userService;
        this.titulo = 'Registro';
        this.user = new User(1, 'usuario', '', '', '', '', 'usuario.png', '', '', '');
    }
    ngOnInit() { }
    onSubmit(form) {
        /* console.log(this.user);
    
        console.log(this._userService.pruebas()); */
        this._userService.register(this.user).subscribe((response) => {
            if (response.status == 'success') {
                this.status = response.status;
                this.user = new User(null, 'usuario', '', '', '', '', 'usuario.png', '', '', '');
                form.reset();
            }
            else {
                this.status = 'error';
            }
        }, (error) => {
            console.log(error);
        });
    }
};
RegistroComponent = __decorate([
    Component({
        selector: 'app-registro',
        templateUrl: './registro.component.html',
        styleUrls: ['./registro.component.css'],
        providers: [UserService],
    })
], RegistroComponent);
export { RegistroComponent };
//# sourceMappingURL=registro.component.js.map