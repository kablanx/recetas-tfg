import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Comentario } from '../models/comentario';

@Injectable()
export class ComentarioService {
  public url:string;
  public identity;
  public token;

  constructor(public _http:HttpClient){
    this.url=GLOBAL.url;
  }

  create(token, comentario):Observable<any>{
    let json = JSON.stringify(comentario);
    let params = 'json=' + json;

    let headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    ).set('Authorization', token);

    return this._http.post(this.url + 'comentario', params, { headers: headers });
  }

  delete(token,id){

    let headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    ).set('Authorization', token);
    return this._http.delete(this.url + 'comentario/'+id, { headers: headers });
  }
}

