import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Mensaje } from '../models/mensaje';

@Injectable()
export class MensajeService {
  public url: string;
  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  getMensajesUser(id):Observable<any>{
    return this._http.get(this.url+'mensaje/user/'+id);
  }

  getMensajesToUserByUser(id_user1, id_user2):Observable<any>{
    return this._http.get(this.url+'mensaje/user/'+id_user1+'/'+id_user2);
  }

  create(token, mensaje): Observable<any> {
    console.log(mensaje);
    let json = JSON.stringify(mensaje);
    let params = 'json=' + json;

    let headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    ).set('Authorization', token);

    return this._http.post(this.url + 'mensaje', params, { headers: headers });
  }

  delete(token, id_user1, id_user2){
    let headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    ).set('Authorization', token);
    return this._http.delete(this.url + 'mensajes/'+id_user1+'/'+id_user2, { headers: headers });
  }
}
