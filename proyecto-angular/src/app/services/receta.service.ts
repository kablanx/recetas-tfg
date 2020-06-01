import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Receta } from '../models/receta';

@Injectable()
export class RecetaService {

  public url: string;

  public identity;
  public token;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }
  getImage(imageUrl:string):Observable<any>{
    return this._http.get(this.url+'recetas/image/'+imageUrl);
  }

  create(token, receta): Observable<any> {
    let json = JSON.stringify(receta);
    let params = 'json=' + json;

    let headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    ).set('Authorization', token);

    return this._http.post(this.url + 'recetas', params, { headers: headers });
  }

  getReceta(id):Observable<any>{
    return this._http.get(this.url+'recetas/'+id);
  }

  getRecetasSeguidos(id):Observable<any>{
    return this._http.get(this.url+'recetas/inicio/'+id);
  }
  getRecetas(token):Observable<any>{
    let headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    ).set('Authorization', token);
    return this._http.get(this.url+'recetas', {headers:headers});
  }

  delete(token,id){
    let headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    ).set('Authorization', token);
    return this._http.delete(this.url + 'recetas/'+id, { headers: headers });
  }
  update(token, receta): Observable<any> {
    let json = JSON.stringify(receta);
    let params = 'json=' + json;
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
    return this._http.put(this.url + 'recetas/'+receta.id, params, {
      headers: headers,
    });
  }

  buscar(token, nombre):Observable<any>{
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
    return this._http.get(this.url + 'receta/buscar/'+nombre, { headers: headers });
  }
}
