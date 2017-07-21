import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/switchMap';
import * as firebase from 'firebase/app';

@Injectable()
export class UserService {
  
  userEvents: any;

  constructor(public db: AngularFireDatabase) { }

}
