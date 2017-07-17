import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

}
