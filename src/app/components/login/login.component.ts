import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import {User } from '../../models/user' ;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public pageTitle:string;
  public user:User;
  public status: number;
  public token;
  public identity;

  constructor(
    private _userService:UserService,
    private _router:Router,
    private _route:ActivatedRoute
  ) {
    this.pageTitle = 'LogIn';
    this.user = new User(1,"","","","","");
   }

  ngOnInit(){
    this.logOut();
  }

  onSubmit(form){

    this._userService.login(this.user.email,this.user.password).subscribe(
      response =>{
        console.log(response);
        this.token = response.user_data.token;
        if(response.status_code == 200){
          this.identity = response.user_data;
          this.identity.password = '';
          //this.identity.email = '';
          this.identity.token = '';
          this.identity.createAt = '';
          
          localStorage.setItem('token',this.token);
          localStorage.setItem('identity',JSON.stringify(this.identity));
          this.status = response.status;
          form.reset();
          this._router.navigate(['home']);
        }else{
          this.status = 400;
        }

      },
      error => {
        this.status = 400;
        console.log(<any>error);
      }
    ); 

  }

  ngDoCheck(){
    this.loadUser();
  }

  loadUser(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    if(this.identity && this.token){
      this._router.navigate(['home']);
    }
  }

  logOut(){
    this._route.params.subscribe(params => {
      let logout = +params['sure'];
      
      if(logout == 1){
        localStorage.removeItem('identity');
        localStorage.removeItem('token');

        this.identity = null;
        this.token = null;

        //Redireccion a la pagina principal
        this._router.navigate(['home']);
      }
    });
  } 

}
