import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';
let LikeService = class LikeService {
    constructor(_http) {
        this._http = _http;
        this.url = GLOBAL.url;
    }
    create(token, like) {
        let json = JSON.stringify(like);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);
        return this._http.post(this.url + 'like', params, { headers: headers });
    }
    getLike(id_usuario, id_receta) {
        return this._http.get(this.url + 'like/' + id_usuario + '/' + id_receta);
    }
};
LikeService = __decorate([
    Injectable()
], LikeService);
export { LikeService };
//# sourceMappingURL=like.service.js.map