import { Component, OnInit } from '@angular/core';
import { AngularFireAuth }  from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-my-venues',
  templateUrl: './my-venues.component.html',
  styleUrls: ['./my-venues.component.scss']
})
export class MyVenuesComponent implements OnInit {
 
  user: firebase.User;
  myVenues: any;//firebase list of my venues

  constructor(private db: AngularFireDatabase) { 
  	this.user = firebase.auth().currentUser;

  	//get my venues based on my uid in createdBy field
  	this.myVenues = db.list('/Venues', {
  		query: {
  			orderByChild: 'createdBy',
  			equalTo: this.user.uid
  		}
  	})
  }

  ngOnInit() {
  }

}
