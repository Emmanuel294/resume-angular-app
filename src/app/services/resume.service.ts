import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { global } from '../global';
import { resume } from '../models/resume';
import { UserService } from './user.service';

@Injectable()
export class ResumeService{
    public url:string;
    public identity;
    public token;
    public resumes:Array<resume>;

    constructor(
        private _http:HttpClient,
        private _userService:UserService
    ){
        this.url = global.url;
        this.identity = _userService.getIdentity();
        this.token = _userService.getToken();
    }

    test():Array<resume>{
        this.resumes.push(new resume(1,[["1","Resume Page","Page to create resumes"]]));
        this.resumes.push(new resume(2,[["2","Migration Batch","Batch to migrate",""]]));
        return this.resumes;
    }

    getResumes():Observable<any>{
        let id = this.identity.id;
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded').set('Authorization',this.token);
        return this._http.get(this.url+'resumes/'+id,{headers:headers});
    }
}