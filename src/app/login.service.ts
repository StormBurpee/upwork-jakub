import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {

  public clientId = "a096d3ce655c4f0a806f";
  public auth = localStorage.access_token;

  urls = {
    callback: "https://github.com/login/oauth/access_token",
    callbackServer: "http://localhost:8080/api/authenticate/",
    api: "https://api.github.com/",
    localServer: "http://localhost:8080/api/"
  }

  constructor( private http: Http ) { }

  authenticateLogin(hash): Observable<any> {
    //console.log(hash);
    this.updateServer('page', 'auth_login:'+hash);
    return this.http.get(this.urls.callbackServer+hash).map(this.extractData).catch(this.handleError);
  }

  getMyUser(access_token): Observable<any> {
    this.updateServer('github', 'getmyuser:'+access_token);
    return this.http.get(this.urls.api+"user?access_token="+access_token).map(this.extractData).catch(this.handleError);
  }

  getUser(username): Observable<any> {
    this.updateServer('github', 'getuser:'+username);
    return this.http.get(this.urls.api+"users/"+username+"?access_token="+this.auth).map(this.extractData).catch(this.handleError);
  }

  getUserRepos(username): Observable<any> {
    this.updateServer('github', 'user_repos:'+username);
    return this.http.get(this.urls.api+"users/"+username+"/repos"+"?access_token="+this.auth).map(this.extractData).catch(this.handleError);
  }

  getUserEvents(username): Observable<any> {
    this.updateServer('github', 'user_events:'+username);
    let pg1 = this.http.get(this.urls.api+"users/"+username+"/events?page=1"+"&access_token="+this.auth).map(this.extractData).catch(this.handleError);
    return pg1;
  }

  //DEPRECIATION:
  getUserCommits(username, page): Observable<any> {
    this.updateServer('github', 'user_commits:'+username);
    return this.http.get(this.urls.api+"users/"+username+"/events?page="+page+"&access_token="+this.auth).map(this.extractData).catch(this.handleError);
  }

  getUserReceived(username, page): Observable<any> {
    this.updateServer('github', 'received_events:'+username);
    return this.http.get(this.urls.api+"users/"+username+"/received_events?page="+page+"&access_token="+this.auth).map(this.extractData).catch(this.handleError);
  }

  getUserStarred(username): Observable<any> {
    this.updateServer('github', 'getstars:'+username);
    return this.http.get(this.urls.api+"users/"+username+"/starred"+"?access_token="+this.auth).map(this.extractData).catch(this.handleError);
  }

  searchUser(username): Observable<any> {
    this.updateServer('github', 'search:'+username);
    return this.http.get(this.urls.api+"search/users?q="+username+"&access_token="+this.auth).map(this.extractData).catch(this.handleError);
  }

  updateServer(type, endpoint) {
    let username = localStorage.username;
    //console.log(type, endpoint, username);
    this.http.get(this.urls.localServer+"server/saverequest/"+type+"/"+username+"/"+endpoint).subscribe();
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
