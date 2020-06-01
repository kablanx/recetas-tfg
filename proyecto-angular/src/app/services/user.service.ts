import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { User } from '../models/user';

@Injectable()
export class UserService {
  public url: string;

  public identity;
  public token;

  /* _http para saber que es un servicio */
  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  pruebas() {
    return 'Hola mundo!';
  }

  register(user): Observable<any> {
    let json = JSON.stringify(user);
    let params = 'json=' + json;

    let headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    return this._http.post(this.url + 'user', params, { headers: headers });
  }

  signup(user, gettoken = null): Observable<any> {
    if (gettoken != null) {
      user.gettoken = 'true';
    }
    let json = JSON.stringify(user);
    let params = 'json=' + json;

    let headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    return this._http.post(this.url + 'login', params, { headers: headers });
  }

  getIdentity() {
    let identity = JSON.parse(localStorage.getItem('identity'));
    if (identity != 'undefined') {
      this.identity = identity;
    } else {
      this.identity = null;
    }

    return this.identity;
  }

  getToken() {
    let token = localStorage.getItem('token');
    if (token != 'undefined') {
      this.token = token;
    } else {
      this.token = null;
    }
    return this.token;
  }

  getImage(imageUrl: string): Observable<any> {
    return this._http.get(this.url + 'user/avatar/' + imageUrl);
  }

  getUser(id): Observable<any> {
    return this._http.get(this.url + 'user/' + id);
  }

  update(token, user): Observable<any> {
    let json = JSON.stringify(user);
    let params = 'json=' + json;
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
    return this._http.put(this.url + 'user/update', params, {
      headers: headers,
    });
  }

  getUsers(token): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
    return this._http.get(this.url + 'user', { headers: headers });
  }

  buscar(token, nombre):Observable<any>{
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
    return this._http.get(this.url + 'user/buscar/'+nombre, { headers: headers });
  }
}
