import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
let ExplorarComponent = class ExplorarComponent {
    constructor(_route, _router, _userService) {
        this._route = _route;
        this._router = _router;
        this._userService = _userService;
        this.titulo = 'Editar perfil';
        /* this.user = new User(
          1,
          'usuario',
          '',
          '',
          '',
          '',
          'usuario.png',
          '',
          '',
          ''
        ); */
        this.identity = _userService.getIdentity();
        this.token = _userService.getToken();
    }
    ngOnInit() {
        // subscribe es para el observable y recoger el resultado del api
        this._userService.getUsers().subscribe((response) => {
            if (response.status == 'success') {
                this.users = response.users;
            }
        }, (error) => {
            console.log(error);
        });
    }
    getImage() {
        this._userService.getImage(this.identity.avatar).subscribe((response) => {
            if (response) {
                /* this.avatar= 'data:image/png;base64,' + this.inspectionDetails.reportImage; */
                /* this.avatar = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${response}`); */
                this.avatar = response;
                console.log(this.avatar);
                /* console.log(this.avatar);
                console.log("identity");
                console.log(this.identity.avatar); */
                /* this.avatar = atob(response); */
                /* localStorage.setItem('identity', JSON.stringify(this.identity)); */
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
ExplorarComponent = __decorate([
    Component({
        selector: 'app-explorar',
        templateUrl: './explorar.component.html',
        styleUrls: ['./explorar.component.css'],
        providers: [UserService],
    })
], ExplorarComponent);
export { ExplorarComponent };
//# sourceMappingURL=explorar.component.js.map