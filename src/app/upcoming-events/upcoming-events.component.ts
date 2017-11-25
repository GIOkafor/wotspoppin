import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/switchMap';
import * as firebase from 'firebase/app';
import { VenuesApiService } from '../venues-service/venues-api.service';

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
  	private db: AngularFireDatabase,
    private vApi: VenuesApiService) { 
  	//get currently signed in user credentials
  	this.user = afAuth.auth.currentUser;

    console.log("Current user is : "+this.user.displayName);
  	
  	if (this.user){
		console.log("User is signed in, getting their events");
		this.userEvents = this.db.list('/Users/' + this.user.uid + '/upcoming-events', {
      query: {
        orderByChild: 'date'
      }
    });//order by date

  	}else{
  		console.log("User not signed in, redirecting to popup");
  		//afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  	}
	
  }

  ngOnInit() {
  }

  getUserEvents(){

  }

  getEventDetails(event){
    console.log("Getting details for event with key "+event.$key);

    this.db.object('Events/' + event.$key)
      .subscribe(res => {
        console.log(res);
      })
  }

}
