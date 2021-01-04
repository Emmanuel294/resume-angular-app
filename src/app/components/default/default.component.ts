import { Component, OnInit } from '@angular/core';
import { resume } from 'src/app/models/resume';
import { UserService } from 'src/app/services/user.service';
import { ResumeService } from 'src/app/services/resume.service';
import { global } from '../../global';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css'],
  providers: [ResumeService, UserService]
})
export class DefaultComponent implements OnInit {
  public url:string;
  public identity;
  public token;
  public pageTitle:string;
  constructor(
    private _userService:UserService,
    private _resumeService:ResumeService
  ) { 
    this.pageTitle = "Home";
    this.url = global.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(){
  }

  

}
