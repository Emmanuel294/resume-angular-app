import { Component, OnInit } from '@angular/core';
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

  constructor(
    private _userService:UserService
  ) {
    this.pageTitle = 'LogIn';
    this.user = new User(1,"","","","","");
   }

  ngOnInit(): void {
  }

  onSubmit(form){

    this._userService.login(this.user.email,this.user.password).subscribe(
      response =>{
        console.log(response);
        this.token = response.user_data.token;
        localStorage.setItem('token',this.token);
        if(response.status_code == 200){
          this.status = response.status;
          form.reset();
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

}
