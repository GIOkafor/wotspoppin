import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { MdSnackBar } from '@angular/material';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-create-venue',
  templateUrl: './create-venue.component.html',
  styleUrls: ['./create-venue.component.scss']
})
export class CreateVenueComponent implements OnInit {
// NOTE!! No error checking or handling in place yet

  venuesList: any;//venue list will be referenced here
  formData: any; //user this to prepare object to be pushed to db
  user: firebase.User;

  constructor(
  	private afAuth: AngularFireAuth,
  	private db: AngularFireDatabase,
  	private snackBar: MdSnackBar
  	) 
  { 
  	this.venuesList = db.list('/Venues'); //get list of venues
  	this.user = firebase.auth().currentUser;
  }

  ngOnInit() {
  }

  onSubmit(form: any){
  	//debuging code
  	console.log('Form submitted with value: '+form.venueName);
  	console.log('Form submitted with value: '+form.address);
  	console.log('Form submitted with value: '+form.hours);
  	console.log('Form submitted with value: '+form.imageURL);

	//actual code
	//prepare form object
  	this.formData = form;
  	this.formData.createdBy = this.user.uid;
  	
  	//add form data to list of venues 
  	this.venuesList.push(this.formData)
  		.then(_=> this.snackBar.open('Venue added successfully', '', {duration: 3000}))
  		.catch(err => this.snackBar.open('ERROR! You do not have access.', '', {duration: 3000}));
  }

}
