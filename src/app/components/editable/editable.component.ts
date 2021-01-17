import { Component, OnInit } from "@angular/core";
import { EventEmitter } from "@angular/core";

@Component({
  selector: 'app-editable',
  inputs: [ "value" ],
	outputs: [ "valueChangeEvents: valueChange" ],
  templateUrl: './editable.component.html',
  styleUrls: ['./editable.component.css']
})
export class EditableComponent implements OnInit{

  public isEditing: boolean;
	public pendingValue: string;
	public value!: string;
	public valueChangeEvents: EventEmitter<string>;
	public create:boolean;


  constructor() { 
    this.isEditing = false;
		this.pendingValue = "";
		this.valueChangeEvents = new EventEmitter();
  }

  ngOnInit() {

  }

  public cancel() : void {
		if(this.create){
			this.value = 'Create New tool';
		}
		this.isEditing = false;

	}


	// I enable the editing of the value.
	public edit() : void {
		if(this.value != null && this.value == 'Create New tool'){
			this.value = '';
			this.create = true;
		}
		this.pendingValue = this.value;
		this.isEditing = true;

	}


	// I process changes to the pending value.
	public processChanges() : void {

		// If the value actually changed, emit the change but don't change the local
		// value - we don't want to break unidirectional data-flow.
		if ( this.pendingValue !== this.value ) {

			this.valueChangeEvents.emit( this.pendingValue );

		}
		if(this.create){
			this.value = 'Create New tool';
		}
		this.isEditing = false;

	}

}
