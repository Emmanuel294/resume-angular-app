import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/projects.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { global } from '../../global';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  public url:string;
  public identity;
  public token;
  public pageTitle:string;
  public projects:Array<project>;
  public projectsMessage:string;
  constructor(private _userService:UserService,
    private _projectService:ProjectService,
    private _route:ActivatedRoute,
    private _router:Router,
    private datepipe: DatePipe
  ) { 
    this.pageTitle = "Tools";
    this.url = global.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken(); }

  ngOnInit(): void {
    if(this.identity){
      this.getProjects();
    }
  }
  ngDoCheck():void{
    if(this.projects && this.projects.length > 0 && this.projectsMessage == 'no content'){
      this.projectsMessage = '';
    }
  }

  getProjects(){
    this._projectService.getProjects().subscribe(
      response => {
        if(response.status_code == 200){
          
          if(response.message != 'success'){
            this.projects = response.projects;
            this.projectsMessage = response.message;
            return;
          }
          this.projects = response.projects;
          this.projectsMessage = '';
          this.transformDates();
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

  deleteProject(project:project,index){
    Swal.fire({
      title: 'Are you sure?',
      text: "Delete this project will remove it from all the resumes related!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._projectService.deleteProject(project.id).subscribe(
          response => {
            if(response.message != 'success'){
              Swal.fire(
                'Error deleting project',
                response.message+'',
                'error'
              )
              return;
            }
            Swal.fire(
              'Deleted!',
              'Your project '+project.name+' has been deleted.',
              'success'
            )
            this.projects.splice(index,1);
            
          },error=>{

          }
        );
      }
    })
  }

  transformDates(){
    for(let project of this.projects){
      var date = project.endDate;
      project.endDate = new Date(this.datepipe.transform(date, 'MMMM dd yyyy'));
      date = project.startedDate;
      project.startedDate = new Date(this.datepipe.transform(date, 'MMMM dd yyyy'));
    }
  }

}
