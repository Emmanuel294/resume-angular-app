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

  constructor(
    private _userService:UserService,
    private _router:Router,
    private _route:ActivatedRoute
  ) { 

    this.pageTitle = 'Create User';
    this.user = new User(1,"","","","","");
  }

  ngOnInit(): void {

  }

  onSubmit(form){
    
    this._userService.register(this.user).subscribe(
      response =>{
        if(response.status_code == 200){
          this.status = response.status_code;
          form.reset();
          //this._router.navigate(['login']);
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
