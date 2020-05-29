import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { RecetaService } from './services/receta.service';
let AppComponent = class AppComponent {
    constructor(_userService, sanitizer) {
        this._userService = _userService;
        this.sanitizer = sanitizer;
        this.avatar = '';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
    }
    ngOnInit() {
        console.log('app.component cargado');
        this.getImage();
    }
    ngDoCheck() {
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
    }
    getImage() {
        this._userService.getImage(this.identity.avatar).subscribe((response) => {
            if (response) {
                this.avatar = response;
                console.log(this.avatar);
                console.log(localStorage.getItem('identity'));
            }
            else {
                console.log('errorrrrrr');
            }
        }, (error) => {
            console.log(error);
        });
    }
};
AppComponent = __decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css'],
        providers: [UserService, RecetaService],
    })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map