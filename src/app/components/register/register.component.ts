import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public pageTitle:string;
  public user:User;
  public status:number;
  public message:string;
  public identity;
  public token;

  constructor(
    private _userService:UserService,
    private _router:Router,
    private _route:ActivatedRoute
  ) { 

    this.pageTitle = 'Create User';
    this.user = new User(0,"","","","","");
  }

  ngOnInit(): void {

  }

  onSubmit(form){
    
    this._userService.register(this.user).subscribe(
      response =>{
        if(response.status_code == 200){
          this.message = response.message;
          if(this.message == 'success'){
            this.status = response.status_code;
            form.reset();
          }else{
            this.status = 400;
          }
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

}
