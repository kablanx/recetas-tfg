import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
let DefaultComponent = class DefaultComponent {
    constructor(_route, _router, _userService) {
        this._route = _route;
        this._router = _router;
        this._userService = _userService;
        this.titulo = 'Inicio';
        this.identity = _userService.getIdentity();
    }
    ngOnInit() {
        console.log('default.component cargado correctamente!!');
        console.log(this.identity);
    }
};
DefaultComponent = __decorate([
    Component({
        selector: 'app-default',
        templateUrl: './default.component.html',
        styleUrls: ['./default.component.css'],
        providers: [UserService],
    })
], DefaultComponent);
export { DefaultComponent };
//# sourceMappingURL=default.component.js.map