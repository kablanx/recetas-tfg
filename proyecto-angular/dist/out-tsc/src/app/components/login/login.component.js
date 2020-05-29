import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/user.service';
let LoginComponent = class LoginComponent {
    constructor(_route, _router, _userService) {
        this._route = _route;
        this._router = _router;
        this._userService = _userService;
        this.titulo = 'Login';
        this.user = new User(null, 'usuario', '', '', '', '', '', '', '', '');
    }
    ngOnInit() {
        console.log('login.component cargado correctamente!');
        this.logout();
    }
    onSubmit(form) {
        /* console.log(this.user); */
        this._userService.signup(this.user).subscribe((response) => {
            if (response.status != 'error') {
                this.status = 'success';
                // Conseguir el token
                /* console.log(response); */
                this.token = response;
                localStorage.setItem('token', this.token);
                // Objeto usuario identificado
                this._userService.signup(this.user, true).subscribe((response) => {
                    // Conseguir el token
                    /* console.log(response); */
                    this.identity = response;
                    localStorage.setItem('identity', JSON.stringify(this.identity));
                    // Objeto usuario identificado
                    this._router.navigate(['home']);
                }, (error) => {
                    console.log(error);
                });
            }
            else {
                this.status = 'error';
            }
        }, (error) => {
            console.log(error);
        });
    }
    logout() {
        this._route.params.subscribe((params) => {
            let logout = +params['sure'];
            if (logout == 1) {
                localStorage.removeItem('identity');
                localStorage.removeItem('token');
                this.identity = null;
                this.token = null;
                // Redirección
                this._router.navigate(['home']);
            }
        });
    }
};
LoginComponent = __decorate([
    Component({
        selector: 'login',
        templateUrl: './login.component.html',
        providers: [UserService],
    })
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map