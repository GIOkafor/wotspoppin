import { Injectable, OnInit } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { MdSnackBar } from '@angular/material';

//NOTE
//Something very strange is happening
//No problem occurs when redirect is triggered from inside the app
//But when it is triggered by typing in the direct URL 
//It rejects signed in users access

@Injectable()
export class CanActivateGuard implements CanActivate, OnInit{

	user: firebase.User;

	constructor(
		private afAuth: AngularFireAuth,
		private router: Router,
		private snackbar: MdSnackBar
		){
/* Old trippy ass code 
saying people were not authed although they were
		firebase.auth().onAuthStateChanged(user => {
			if(user){
				this.user = user;
				console.log("Current user is: "+user.displayName);
			}
		})
*/	
		this.user = afAuth.auth.currentUser;	
	}

	ngOnInit(){

	}

	canActivate(){
		if(this.user){
			console.log("User is logged in, access granted.");
			return true;
		}else{
			console.log("User is not logged in, access denied. Redirecting...");
			this.snackbar.open('You are not logged in, redirecting to login page', '', {duration: 2500,});
			//wait 3 seconds for snackbar to show 
			Observable.timer(3000).subscribe(_=>{
				this.router.navigate(['/authenticate']);
				return false;
			});
		}
	}
}
