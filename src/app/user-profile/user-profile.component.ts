import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
 
  user: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth) { 
  	this.user = afAuth.authState;
  }

  ngOnInit() {
  }

  logOut(){
  	this.afAuth.auth.signOut();
  }

}
