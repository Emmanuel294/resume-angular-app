import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tool} from '../models/tool';
import {global} from '../global';
import { UserService } from './user.service';

@Injectable()
export class ToolService{
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

    getTools():Observable<any>{
        let id = this.identity.id;
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded').set('Authorization',this.token);
        return this._http.get(this.url+'tools/'+id,{headers:headers});
    }

    updateTool(tool:tool):Observable<any>{
        let id = this.identity.id;
        let json = JSON.stringify(tool);
        let params = json;
        let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',this.token);
        return this._http.put(this.url+'tools/'+id,params,{headers:headers});
    }

    deleteTool(toolIid: string):Observable<any>{
        let id = this.identity.id;
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded').set('Authorization',this.token);
        return this._http.delete(this.url+'tools/'+id+'/'+toolIid,{headers:headers});
    }

    createTool(tool:tool):Observable<any>{
        let id = this.identity.id;
        tool.idUser = id;
        let json = JSON.stringify(tool);
        let params = json;
        let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',this.token);
        return this._http.post(this.url+'tools',params,{headers:headers});
    }
}