import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { resume } from 'src/app/models/resume';
import { ResumeService } from 'src/app/services/resume.service';
import { UserService } from 'src/app/services/user.service';
import { global } from '../../global';

@Component({
  selector: 'app-resumesview',
  templateUrl: './resumesview.component.html',
  styleUrls: ['./resumesview.component.css'],
  providers: [ResumeService]
})
export class ResumesviewComponent implements OnInit {

  public url:string;
  public identity;
  public token;
  public pageTitle:string;
  public resume:resume;
  public resumeMessage:string;

  constructor(
    private _userService:UserService,
    private _resumeService:ResumeService,
    private _route:ActivatedRoute,
    private _router:Router
  ) {
    this.pageTitle = "Resume View";
    this.url = global.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
   }

  ngOnInit(): void {
    if(this.identity){
      this.getResume();
    }
  }

  getResume(){
    this._route.params.subscribe(
      params =>{
        let id = params['id'];
      this._resumeService.getResume(id).subscribe(
        response => {
          if(response.status_code == 200){
            if(response.message != 'success'){
              this.resume = null;
              this.resumeMessage = response.message;
              return;
            }
            this.resume = response.resumes[0];
            this.resumeMessage = '';
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
      });
  }

}
