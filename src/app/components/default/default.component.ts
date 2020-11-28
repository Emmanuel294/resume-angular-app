import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { global } from '../../global';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {
  public url:string;
  public identity;
  public token;
  public pageTitle:string;
  constructor(
    private _userService:UserService
  ) { 
    this.pageTitle = "ResuMe Home";
    this.url = global.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
  }

}
