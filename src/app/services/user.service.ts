import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {global} from '../global';

@Injectable()
export class UserService{
    public url:string;
    public identity;
    public token;

    constructor(
        public _http:HttpClient
    ){
        this.url = global.url;
    }

    register(user):Observable<any>{
        let json = JSON.stringify(user);
        let params = json;

        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+'users', params,{headers:headers});
    }

    login(user,password):Observable<any>{
        let params = new HttpParams().set('user',user).set('password',password);
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

        return this._http.post(this.url+'users/login', params,{headers:headers});
    }

    getIdentity(){
        let identity = JSON.parse(localStorage.getItem('identity'));
        if(identity && identity != "undefined" ){
          this.identity = identity;
        }else{
            this.identity = null;
        }

        return this.identity;
      }
    
      getToken(){
        let token = localStorage.getItem('token');
        if(token && token != "undefined"){
            this.token = token;
        }else{
            this.token = null;
        }
        return this.token;
      }
}