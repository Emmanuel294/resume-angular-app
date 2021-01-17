import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { project } from 'src/app/models/project';
import { tool } from 'src/app/models/tool';
import { ProjectService } from 'src/app/services/projects.service';
import { ToolService } from 'src/app/services/tool.service';
import { DOCUMENT } from '@angular/common'; 
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {

  public pageTitle:string;
  public project:project;
  public tools:Array<tool>;

  public currentDate: Date = new Date();
  public minDate: Date = new Date();

  public toolsMessage:string;
  public creating:boolean;
  public isEditing:boolean;

  constructor(@Inject(DOCUMENT) document,
  private datepipe:DatePipe,
    private _projectService:ProjectService,
    private _router:Router,
    private _toolService:ToolService,
    private _route:ActivatedRoute,
    private swal:SweetAlert2Module) { 
    this.pageTitle = 'Create Project';
    this.project = new project(0,0,"","","",null,null,false,new Array<tool>());
    this.creating = false;
    this.isEditing = false;
  }

  ngOnInit(): void {
    this.getTools();
    this._route.params.subscribe(
      params =>{
        if(params['id'] != null){
          this.isEditing = true;
          this.findProject(params['id']);
        }
      });
    
  }

  ngDoCheck(){
    if(this.creating && this.tools != null && document.getElementById((this.tools.length-1)+'') != null){
      document.getElementById((this.tools.length-1)+'').setAttribute('checked', 'checked');
      this.creating = false;
    }
    if(this.tools != null && this.isEditing){
      this.setTools();
    }
  }

  findProject(id:string){
    this._projectService.getProject(id).subscribe(
      response => {
        if(response.status_code == 200){
          
          if(response.message != 'success'){
            this.project = response.projects[0];
            return;
          }
          this.project = response.projects[0];
          this.minDate = this.project.startedDate;
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

  transformDates(){
      var date = this.project.endDate;
      this.project.endDate = new Date(this.datepipe.transform(date, 'MM/dd/yyyy'));
      date = this.project.startedDate;
      this.project.startedDate = new Date(this.datepipe.transform(date, 'MM/dd/yyyy'));
  }

  getTools(){
    this._toolService.getTools().subscribe(
      response => {
        if(response.status_code == 200){
          
          if(response.message != 'success'){
            this.tools = response.tools;
            this.toolsMessage = response.message;
            return;
          }
          this.tools = response.tools;
          this.toolsMessage = '';
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

  setTools(){
    if(this.project.tools){
      for(let i = 0; i < this.tools.length;i++){
        for(let ptool of this.project.tools){
          if(ptool.id == this.tools[i].id){
            this.tools[i] = ptool;
            if(document.getElementById(i+'') != null){
              document.getElementById(i+'').setAttribute('checked', 'checked');
            }
            break;
          }
        }
      }
    }
  }

  changeStarted(start:Date,end:Date){
    this.minDate = start;
    if(end && end < start){
      this.project.endDate = null;
    }
  }

  checkValid(start:Date,end:Date){
    if(start > end){
      console.log("End date can not be before start date")
      this.project.endDate = null;
    }
  }

  onSubmit(form){
    this.transformDates();
    if(!this.isEditing){
      this._projectService.createProject(this.project).subscribe(
        response => {
          if(response.status_code == 200){
            
            if(response.message != 'success'){
              console.log("PROJECT WAS NOT CREATED");
              return;
            }
            Swal.fire(
              'Project Saved!',
              'Project \"'+this.project.name+"\" created successfully",
              'success'
            );
            this._router.navigate(['/projects']);
          }else{
            console.log("PROJECT WAS NOT CREATED ERROR");
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
    }else{
      this._projectService.updateProject(this.project).subscribe(
        response => {
          if(response.status_code == 200){
            
            if(response.message != 'success'){
              console.log("PROJECT WAS NOT CREATED");
              return;
            }
            Swal.fire(
              'Project Saved!',
              'Project \"'+this.project.name+"\" updated successfully",
              'success'
            );
            this._router.navigate(['/projects']);
          }else{
            console.log("PROJECT WAS NOT CREATED ERROR");
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

  moveTool(event){
    if(event.target.checked){
      this.project.tools.push(this.tools[event.target.id]);
    }else{
      let index = this.project.tools.findIndex(x => x === this.tools[event.target.id]);
      this.project.tools.splice(index,1);
    }
  }

  createTool( toolName: string ) : void {
    let newTool = new tool(0,0,toolName);
    this._toolService.createTool(newTool).subscribe(
      response => {
        if(response.status_code == 200){
          if(response.message != 'success'){
            console.log("Tool was not created");
            return;
          }
          this.tools.push(response.tools[0]);
          this.project.tools.push(response.tools[0]);
          this.creating = true;
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
