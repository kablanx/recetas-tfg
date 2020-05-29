import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Like } from '../models/like';

@Injectable()
export class LikeService {
  public url: string;
  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  create(token, like): Observable<any> {
    let json = JSON.stringify(like);
    let params = 'json=' + json;

    let headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    ).set('Authorization', token);

    return this._http.post(this.url + 'like', params, { headers: headers });
  }

  getLike(id_usuario, id_receta):Observable<any>{
    return this._http.get(this.url+'like/'+id_usuario+'/'+id_receta);
  }

  update(token, id, like):Observable<any>{
    let json=JSON.stringify(like);
    let params="json="+json;
    let headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    ).set('Authorization', token);
    return this._http.put(this.url+'like/'+id, params, {headers:headers});
  }
}
