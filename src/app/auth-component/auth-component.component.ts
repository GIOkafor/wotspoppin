import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth-component',
  templateUrl: './auth-component.component.html',
  styleUrls: ['./auth-component.component.scss']
})
export class AuthComponent implements OnInit {

  user: Observable<firebase.User>;//this is an observable because it helps update buttons to show or hide otherwise it doesn't work as it should

  constructor(public afAuth: AngularFireAuth,
              public authService: AuthService) { 
  	this.user = afAuth.authState;
  }

  ngOnInit() {
  }

  //google login
  googleLogin(){
  	this.authService.googleLogin();
  }

  fbLogin(){
  	this.authService.fbLogin();
  }

  logOut(){
  	this.authService.logOut();
  }

}
