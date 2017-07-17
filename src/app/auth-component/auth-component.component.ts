import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-auth-component',
  templateUrl: './auth-component.component.html',
  styleUrls: ['./auth-component.component.scss']
})
export class AuthComponent implements OnInit {

  user: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth) { 
  	this.user = afAuth.authState;
  }

  ngOnInit() {
  }

  //google login
  googleLogin(){
  	this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
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

}
