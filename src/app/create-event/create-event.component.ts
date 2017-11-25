import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { MdSnackBar } from '@angular/material';

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
  user: firebase.User;//reference to current user

  constructor(
    private router: Router,
    private fb: FormBuilder,
  	private db: AngularFireDatabase,
    private snackbar: MdSnackBar) { 
  	
  		//form initialization
	  	this.eventForm = fb.group({
	  		'name': ['Event Name', Validators.required],
	  		'date': ['', Validators.required],
	  		'description': ['Event description', Validators.required],
	  		'promoImage': ['', Validators.required]
	  	});

	  	//db stuff
	  	this.events = db.list('/Events');

      //curent user 
      this.user = firebase.auth().currentUser;
  }

  ngOnInit() {
  }

  onSubmit(form: any): void{
  	//push form value to db
  	//TODO:: Make it so that venues create events only for themselves by including a 'createdBy' key
  	//inside the events directory (signedInUser)
  	form.createdBy = this.user.uid;//added createdBy field to form b4 pushing to db
    const promise = this.events.push(form);
  	promise
  		.then(_ => {
  			console.log("successfully added event: " + form.name);
        this.snackbar.open("successfully added event!", "", {duration: 2000});
  			this.eventForm.reset();
  			//TODO: add redirect to venue events here
        this.router.navigate(['/upcoming-events']);
  		})
  		.catch(err => console.log(err, "You do not have access!"));
  }

}
