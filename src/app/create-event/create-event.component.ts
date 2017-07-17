import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { Event } from '../classes/event';
import { User } from '../classes/user';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {
  
  eventForm: FormGroup;
  //TODO: get venue's existing events
  //for now it's just going to reference all events 'Venues/events'
  events: FirebaseListObservable<any>;

  constructor(
  	fb: FormBuilder,
  	db: AngularFireDatabase) { 
  	
  		//form initialization
	  	this.eventForm = fb.group({
	  		'name': ['Event Name', Validators.required],
	  		'date': ['', Validators.required],
	  		'description': ['Event description', Validators.required],
	  		'promoImage': ['', Validators.required]
	  	});

	  	//db stuff
	  	this.events = db.list('/Venues/events');
  }

  ngOnInit() {
  }

  onSubmit(form: any): void{
  	//push form value to db
  	//TODO:: Make it so that venues create events only for themselves by including a 'createdBy' key
  	//inside the events directory (signedInUser)
  	const promise = this.events.push(form);
  	promise
  		.then(_ => {
  			console.log("successfully added event: " + form.name);
  			this.eventForm.reset();
  			//TODO: add redirect to venue events here
  		})
  		.catch(err => console.log(err, "You do not have access!"));
  }

}
