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


  //add user to venue guest list
  addUser(user){
  	console.log("Adding user: "+user+" to guest list");

    //add user uid to guestList for venue event
  }

  //create event for venue
  createEvent(event){
  	console.log("Creating event: "+event);
  }

  //charge user credit card and make deposit into venue account
  chargeCard(){}


  //get event details
  getEvent(event){
    return this.db.object('Events/' + event);
  }

  //get event guest list
  getGuestList(eventID){
    return this.db.list('Events/' + eventID + '/guestlist');
  }


  //VENUE CREATION IS HANDLED IN COMPONENT
}
