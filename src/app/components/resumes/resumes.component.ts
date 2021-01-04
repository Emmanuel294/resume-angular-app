import { Component, OnInit } from '@angular/core';
import { resume } from 'src/app/models/resume';
import { UserService } from 'src/app/services/user.service';
import { ResumeService } from 'src/app/services/resume.service';
import { ActivatedRoute, Router } from '@angular/router';
import { global } from '../../global';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-resumes',
  templateUrl: './resumes.component.html',
  styleUrls: ['./resumes.component.css'],
  providers: [ResumeService, UserService]
})
export class ResumesComponent implements OnInit {

  public url:string;
  public identity;
  public token;
  public pageTitle:string;
  public resumes:Array<resume>;
  public resumesMessage:string;

  constructor(
    private _userService:UserService,
    private _resumeService:ResumeService,
    private _route:ActivatedRoute,
    private _router:Router) { 
    this.pageTitle = "Resumes";
    this.url = global.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(){
    if(this.identity){
      this.getResumes();
    }
  }

  getResumes(){
    this._resumeService.getResumes().subscribe(
      response => {
        if(response.status_code == 200){
          if(response.message != 'success'){
            this.resumes = response.resumes;
            this.resumesMessage = response.message;
            return;
          }
          this.resumes = response.resumes;
          this.resumesMessage = '';
        }
        
      },
      error => {
        console.log(<any>error);
        if (error instanceof HttpErrorResponse) {
          if (error.status === 403) {
            this._router.navigate(['/logout/1']);
          }
        }
      }
    );
  }

}
