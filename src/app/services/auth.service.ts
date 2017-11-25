import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { MdDialog } from '@angular/material';
import { ErrorComponent } from '../auth-component/error/error.component';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

	user: firebase.User;
  herokuChargeUrl = 'https://shrouded-bastion-34965.herokuapp.com/api/charge';

  constructor(
          private http: HttpClient,
          private afAuth: AngularFireAuth,
  				private db: AngularFireDatabase,
  				private router: Router,
  				public dialog: MdDialog) { 
  	this.user = afAuth.auth.currentUser;
  }

  googleLogin(){
  	this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
  		.then(res => {
  			console.log("Signed in user is: "+res.user.displayName);
  			console.log("Signed in user is: "+res.user.email);
  			console.log("Signed in user is: "+res.user.photoURL);
  		})
  }

  fbLogin(){
  	this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
  		.then(res => {
  			console.log("Signed in user is: "+res.user.displayName);
  			console.log("Signed in user is: "+res.user.email);
  			console.log("Signed in user is: "+res.user.photoURL);
  		})
  }

  logOut(){
  	this.afAuth.auth.signOut();
  }

  getUser(){
  	return this.afAuth.auth.currentUser;
  }

  chargeUser(uid){
    console.log("Charging user wit uid: ", uid);
    var cond = false;
    const amount = 200; //HARD CODE AMOUNT FOR NOW

    //make external request to stripe to charge user account, 
    //if it succeeds set cond to true and proceed with rest of function

      //TODO: convert this to call to cloud function
      //for now make request to heroku hosted node server

      return this.http.post(this.herokuChargeUrl, {uid, amount})
        .map(_=> {
          //set flag to true
          cond  = true;
        }).toPromise();
  }

}
