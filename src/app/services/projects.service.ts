import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tool} from '../models/tool';
import {global} from '../global';
import { UserService } from './user.service';
import { project } from '../models/project';

@Injectable()
export class ProjectService{
    public url:string;
    public identity;
    public token;

    constructor(
        private _http:HttpClient,
        private _userService:UserService
    ){
        this.url = global.url;
        this.token = _userService.getToken();
        this.identity = _userService.getIdentity();
    }

    getProjects():Observable<any>{
        let id = this.identity.id;
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded').set('Authorization',this.token);
        return this._http.get(this.url+'projects/'+id,{headers:headers});
    }

    getProject(pid:string):Observable<any>{
        let id = this.identity.id;
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded').set('Authorization',this.token);
        return this._http.get(this.url+'projects/'+id+'/'+pid,{headers:headers});
    }

    createProject(projectT:project):Observable<any>{
        let id = this.identity.id;
        let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',this.token);
        return this._http.post(this.url+'projects/'+id,projectT,{headers:headers});
    }

    updateProject(projectT:project):Observable<any>{
        let id = this.identity.id;
        let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',this.token);
        return this._http.put(this.url+'projects/'+id,projectT,{headers:headers});
    }

    deleteProject(pid):Observable<any>{
        let id = this.identity.id;
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded').set('Authorization',this.token);
        return this._http.delete(this.url+'projects/'+id+'/'+pid,{headers:headers});
    }
}