import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { global } from '../../global';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public url:string;
  public identity;
  public token;
  public pageTitle:string;

  constructor(
    private _userService:UserService
  ) { 
    this.pageTitle = "Welcome to ResuMe";
    this.url = global.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
  }

  ngDoCheck(){
    this.loadUser();
  }

  loadUser(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

}
