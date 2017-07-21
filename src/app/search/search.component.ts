import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { VenuesApiService } from '../venues-service/venues-api.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  venues: FirebaseListObservable<any[]>;
  venue: FirebaseObjectObservable<any>;

  constructor(
  	private db: AngularFireDatabase,
  	private router: Router,
    private dialog: MdDialog,
  	private venueService: VenuesApiService) { 
  	this.venues = db.list('/Venues');
  }

  ngOnInit() {
  }

//change type to ven
  getVenue(venue: any){
	//get db object that has this key then transition
    this.venue = this.db.object('Venues/' + venue.$key);

  	this.router.navigate(['venue', venue.$key]);
  }

  openDialog(){
    this.dialog.open(AddDialogComponent);
  }

}

@Component({
  selector: 'add-dialog',
  template: 
  `
    <div>
      <h2 md-dialog-title>NEW</h2>
      <md-dialog-content> What are you creating? </md-dialog-content>
        <md-dialog-actions>
          <button routerLink='/create-venue' md-raised-button md-dialog-close>New Venue</button>
          <button routerLink='/create-event' md-raised-button [md-dialog-close]="true">New Event</button>
        </md-dialog-actions>
    </div>
  `
})
export class AddDialogComponent{}
