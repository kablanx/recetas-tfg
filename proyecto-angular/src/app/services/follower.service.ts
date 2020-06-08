import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { map, delay } from 'rxjs/operators';
/* import { Follower } from '../models/follower'; */

@Injectable()
export class FollowerService {
  public url: string;
  public identity;
  public token;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  create(token, follower): Observable<any> {
    let json = JSON.stringify(follower);
    let params = 'json=' + json;

    let headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    ).set('Authorization', token);

    return this._http.post(this.url + 'follower', params, { headers: headers });
  }

  update(token, id, follower): Observable<any> {
    let json = JSON.stringify(follower);
    let params = "json=" + json;
    let headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    ).set('Authorization', token);
    return this._http.put(this.url + 'follower/' + id, params, { headers: headers });
  }

  getFollower(token, id_follower, id_followed): Observable<any> {
    let headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    ).set('Authorization', token);
    return this._http.get(this.url + 'follower/' + id_follower + "/" + id_followed, { headers: headers }).pipe(delay(280));
  }

  existFollower(token, id_follower, id_followed): Observable<any> {
    let headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    ).set('Authorization', token);
    return this._http.get(this.url + 'follower/exist/' + id_follower + "/" + id_followed, { headers: headers }).pipe(delay(280));
  }
}
