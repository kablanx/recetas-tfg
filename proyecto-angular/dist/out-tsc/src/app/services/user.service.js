import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';
let UserService = class UserService {
    /* _http para saber que es un servicio */
    constructor(_http) {
        this._http = _http;
        this.url = GLOBAL.url;
    }
    pruebas() {
        return 'Hola mundo!';
    }
    register(user) {
        let json = JSON.stringify(user);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this.url + 'user', params, { headers: headers });
    }
    signup(user, gettoken = null) {
        if (gettoken != null) {
            user.gettoken = 'true';
        }
        let json = JSON.stringify(user);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this.url + 'login', params, { headers: headers });
    }
    getIdentity() {
        let identity = JSON.parse(localStorage.getItem('identity'));
        if (identity != "undefined") {
            this.identity = identity;
        }
        else {
            this.identity = null;
        }
        return this.identity;
    }
    getToken() {
        let token = localStorage.getItem('token');
        if (token != "undefined") {
            this.token = token;
        }
        else {
            this.token = null;
        }
        return this.token;
    }
    getImage(imageUrl) {
        return this._http.get(this.url + 'user/avatar/' + imageUrl);
    }
    getUser(id) {
        return this._http.get(this.url + 'user/' + id);
    }
    update(token, user) {
        let json = JSON.stringify(user);
        let params = "json=" + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);
        return this._http.put(this.url + 'user/update', params, { headers: headers });
    }
    getUsers() {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.get(this.url + 'user', { headers: headers });
    }
};
UserService = __decorate([
    Injectable()
], UserService);
export { UserService };
//# sourceMappingURL=user.service.js.map