import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Injectable()
export class VenuesApiService {
  venues: FirebaseListObservable<any[]>;
  venue: FirebaseObjectObservable<any[]>;
  db: AngularFireDatabase;

  constructor(db: AngularFireDatabase) {
  	this.venues = db.list('/Venues');
  }

// FUNCTION NOT IN USE
//filter db query to object with particular name
  getVenue(id: any){
  	return (this.db.object('Venues/' + id, { preserveSnapshot: true }));
  }
}
