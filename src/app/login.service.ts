import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {

  public clientId = "a096d3ce655c4f0a806f";

  urls = {
    callback: "https://github.com/login/oauth/access_token",
    callbackServer: "http://localhost:8080/api/authenticate/",
    api: "https://api.github.com/"
  }

  constructor( private http: Http ) { }

  authenticateLogin(hash): Observable<any> {
    //console.log(hash);
    return this.http.get(this.urls.callbackServer+hash).map(this.extractData).catch(this.handleError);
  }

  getUser(access_token): Observable<any> {
    return this.http.get(this.urls.api+"user?access_token="+access_token).map(this.extractData).catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
