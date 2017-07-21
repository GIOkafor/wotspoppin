import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/switchMap';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-upcoming-events',
  templateUrl: './upcoming-events.component.html',
  styleUrls: ['./upcoming-events.component.scss']
})
export class UpcomingEventsComponent implements OnInit {
  
  user: firebase.User;
  userEvents: FirebaseListObservable<any[]>;

  constructor(
  	private afAuth: AngularFireAuth,
  	private db: AngularFireDatabase) { 
  	//get currently signed in user credentials
  	this.user = firebase.auth().currentUser;
  	
  	if (this.user){
		console.log("User is signed in, getting their events");
		this.userEvents = this.db.list('/events/' + this.user.uid);
  	}else{
  		console.log("User not signed in, redirecting to popup");
  		afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  	}
  	
  }

  ngOnInit() {
  }

  getEventDetails(){}

}
