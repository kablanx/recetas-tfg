import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { RecetaService } from 'src/app/services/receta.service';
let VerPerfilComponent = class VerPerfilComponent {
    constructor(_route, _router, _userService, _recetaService) {
        this._route = _route;
        this._router = _router;
        this._userService = _userService;
        this._recetaService = _recetaService;
        this.titulo = "Ver perfil";
        // Esto no se si me hace falta ya que no se si voy a usar las variables
        this.identity = _userService.getIdentity();
        this.token = _userService.getToken();
    }
    ngOnInit() {
        // Cogemos la variable id de la ruta y la convertimos a entero poniendo el signo + delante
        this._route.params.subscribe((params) => {
            let id = +params['id'];
            this.getUser(id);
        });
    }
    getUser(id) {
        this._userService.getUser(id).subscribe((response) => {
            if (response.status == 'success') {
                /* console.log(response);  */
                this.user = response.user;
                console.log("a");
                console.log(this.user.email);
                console.log("b");
            }
            else {
                this._router.navigate(['home']);
            }
        }, (error) => {
            console.log(error);
        });
    }
};
VerPerfilComponent = __decorate([
    Component({
        selector: 'app-ver-perfil',
        templateUrl: './ver-perfil.component.html',
        styleUrls: ['./ver-perfil.component.css'],
        providers: [UserService, RecetaService],
    })
], VerPerfilComponent);
export { VerPerfilComponent };
//# sourceMappingURL=ver-perfil.component.js.map