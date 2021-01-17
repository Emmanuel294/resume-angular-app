import { Component, OnInit } from '@angular/core';
import { tool } from 'src/app/models/tool';
import { UserService } from 'src/app/services/user.service';
import { ToolService } from 'src/app/services/tool.service';
import { ActivatedRoute, Router } from '@angular/router';
import { global } from '../../global';
import { HttpErrorResponse } from '@angular/common/http';
import { EditableComponent } from '../editable/editable.component';

@Component({
  selector: 'app-tools',
  inputs: [ "tools" ],
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css'],
  providers: [ToolService, UserService]
})
export class ToolsComponent implements OnInit {
  public url:string;
  public identity;
  public token;
  public pageTitle:string;
  public tools:Array<tool>;
  public toolsMessage:string;

  constructor(
    private _userService:UserService,
    private _toolService:ToolService,
    private _route:ActivatedRoute,
    private _router:Router
  ) { 
    this.pageTitle = "Tools";
    this.url = global.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    if(this.identity){
      this.getTools();
    }
  }

  ngDoCheck(): void{
    if(this.tools && this.tools.length > 0 && this.toolsMessage == 'no content'){
      this.toolsMessage = '';
    }
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

  public createTool( toolName: string ) : void {
    let newTool = new tool(0,0,toolName);
    this._toolService.createTool(newTool).subscribe(
      response => {
        if(response.status_code == 200){
          if(response.message != 'success'){
            console.log("Tool was not created");
            return;
          }
          //Something on success
          console.log("Tool "+toolName+" Created");
          this.tools.push(response.tools[0]);
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

  public saveTooltName( tool: tool, newName: string ) : void {
    let oldName = tool.name;
    tool.name = newName;
    this._toolService.updateTool(tool).subscribe(
      response => {
        if(response.status_code == 200){
          
          if(response.message != 'success'){
            tool.name = oldName;
            return;
          }
          //Something on success
        }
      },
      error => {
        console.log(<any>error);
        tool.name = oldName;
        if (error instanceof HttpErrorResponse) {
          if (error.status === 403) {
            this._router.navigate(['/logout/1']);
          }
        }
      }
    );
  }
  
  deleteTool(tool, index){
    this._toolService.deleteTool(tool.id).subscribe(
      response => {
        if(response.status_code == 200){
          if(response.message != 'success'){
            console.log("Tool not removed");
            return;
          }
          console.log("Tool "+tool.name+" removed");
          this.tools.splice(index,1);
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
