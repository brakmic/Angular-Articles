/**
 * Provides logon services.
 * @type {Injectable}
 */
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IUser, ILogonData } from '../../interfaces';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
const url = 'http://www.mocky.io/v2/576559921100008412a92a65'; // fake json-service

@Injectable()
export class LogonService {

  constructor(private http: Http) { }
  public doLogon(logon: ILogonData): Observable<IUser> {
    const data = {
      'name': logon.name,
      'password': logon.password
    };
    return this.http.post(url, JSON.stringify(data))
      .map((response: Response) => {
        return <IUser>response.json();
      })
      .catch(this.onError);
  }

  private onError(error: Response) {
    return Observable.throw(error.json().error || 'Internal server error');
  }
}
