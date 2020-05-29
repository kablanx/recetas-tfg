import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';
let RecetaService = class RecetaService {
    constructor(_http) {
        this._http = _http;
        this.url = GLOBAL.url;
    }
    getImage(imageUrl) {
        return this._http.get(this.url + 'recetas/image/' + imageUrl);
    }
    create(token, receta) {
        let json = JSON.stringify(receta);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);
        return this._http.post(this.url + 'recetas', params, { headers: headers });
    }
    getReceta(id) {
        return this._http.get(this.url + 'recetas/' + id);
    }
};
RecetaService = __decorate([
    Injectable()
], RecetaService);
export { RecetaService };
//# sourceMappingURL=receta.service.js.map