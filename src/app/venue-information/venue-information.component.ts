import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { MdDialog, MdSnackBar, MdIcon } from '@angular/material';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { VenuesApiService } from '../venues-service/venues-api.service';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-venue-information',
  templateUrl: './venue-information.component.html',
  styleUrls: ['./venue-information.component.scss']
})
export class VenueInformationComponent implements OnInit {
  
  //define object and set params to empty so as to be populated by firebase asynchronously
  //DO THIS ELSE IT RETURNS ERROR
  venue: any = {
    name: "",
    address: "",
    hours: "",
    imageUrl: "",
    menu: ""
  };

  events: any;//event list for this particular venue
  public showDetails = false;//hide popup until button is clicked
  spotlightEvent: any;

  constructor(
  	private route: ActivatedRoute,
  	private router: Router,
    private location: Location,
  	private venueService: VenuesApiService,
    private db: AngularFireDatabase,
    public dialog: MdDialog) { }

  ngOnInit() {
  	this.route.paramMap
  		.switchMap((params: ParamMap) => 
  			this.db.object('Venues/'+params.get('id')))
  			.subscribe((venue: any) => this.venue = venue);

     //wait 5 seconds to get venue information from firebase before getting events
     let timer = Observable.timer(3000);
     timer.subscribe(t=>{
       this.getEvents();
     });
  }

  getEvents(){
    this.events = this.db.list('Venues/events', {
      query: {
        orderByChild: 'createdBy',
        equalTo: this.venue.name
      }
    });
  }

//function for populating module content
  getEventDetails(event: any){
    console.log("Getting event details for : "+event.name);
    this.spotlightEvent = event;
    this.showDetails = true;
  }

  hideDetails(){
    this.showDetails = false;
  }

  attendEvent(){
    //prompt them first like are you sure? Your account is going to be charged
    //process payment then redirect to their upcoming events view 
    this.dialog.open(UserPrompt);
    this.hideDetails();
  }

  //go back to last page
  goBack(){
    this.location.back();
  }

}

//this prompts the user to confirm their decision to book telling them that their card on file will be charged
//consider moving this into it's own file called eventConfirmComponent
@Component({
  selector: 'prompt',
  template: 
  `
    <h2 md-dialog-title>Purchase ticket</h2>
    <md-dialog-content>Are you sure? Your card will be charged and you will be added to the guest list<md-dialog-content>
    <md-dialog-actions>
      <button md-button md-dialog-close class="btn btn-danger">No</button>
      <!-- Can optionally provide a result for the closing dialog. -->
      <button md-button [md-dialog-close]="true" class="btn btn-success" (click)="confirm();">Yes</button>
    </md-dialog-actions>

    <style type="text/css">
      .btn-success{ margin-left: 10px; }
    </style>
  `
})
export class UserPrompt{
  constructor(
    public snackBar: MdSnackBar,
    public router: Router
    ){}

  confirm(){
    //charge user card 
    //add user to guest list
    //add to users list of upcoming events
    //then show this message
    console.log("Your spot has been reserved");
    this.snackBar.open('Your spot has been reserved', '', {duration: 2000,});
    this.router.navigate(['upcoming-events']);
  }
}
