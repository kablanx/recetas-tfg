import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';
let ComentarioService = class ComentarioService {
    constructor(_http) {
        this._http = _http;
        this.url = GLOBAL.url;
    }
    create(token, comentario) {
        let json = JSON.stringify(comentario);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);
        return this._http.post(this.url + 'comentario/', params, { headers: headers });
    }
    delete(token, id) {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);
        return this._http.delete(this.url + 'comentario/' + id, { headers: headers });
    }
};
ComentarioService = __decorate([
    Injectable()
], ComentarioService);
export { ComentarioService };
//# sourceMappingURL=comentario.service.js.map