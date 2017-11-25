import { Component, Input, OnInit, Inject, HostListener } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { MdDialog, MdSnackBar, MdIcon } from '@angular/material';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AuthService } from '../services/auth.service';
import { VenuesApiService } from '../venues-service/venues-api.service';
import { PaymentService } from '../services/payment.service';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/switchMap';
import * as firebase from 'firebase/app';
import {MD_DIALOG_DATA} from '@angular/material';//for accessing data passed to dialog from component
import { environment } from '../../environments/environment';

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
  guestList: any = '';

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
    this.events = this.db.list('Events', {
      query: {
        orderByChild: 'createdBy',
        equalTo: this.venue.name
      }
    });
  }

//function for populating module content
  getEventDetails(event: any){
    console.log("Getting event details for event key: "+event.$key);
    this.spotlightEvent = event;
    this.showDetails = true;
  }

  hideDetails(){
    this.showDetails = false;
  }

  attendEvent(){
    //prompt them first like are you sure? Your account is going to be charged
    //process payment then redirect to their upcoming events view 
    this.dialog.open(UserPrompt, {data: this.spotlightEvent}); //pass event details to dialog
    this.hideDetails();
  }

  //go back to last page
  goBack(){
    this.location.back();
  }

  //get event guest list
  getGuestList(event){
    this.guestList = this.db.list('Events/' + event.$key + '/guestlist');
  }

  //get buddies attending
  //by checking 'users/uid/buddies' and cross referencing that with the guest list
  getBuddiesAttending(){
    
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
      <button md-button md-dialog-close class="btn btn-danger" (click)="getGuestList();">No</button>
      <!-- Can optionally provide a result for the closing dialog. -->
      <button md-button [md-dialog-close]="true" class="btn btn-success" (click)="confirm();">Yes</button>
    </md-dialog-actions>

    <style type="text/css">
      .btn-success{ margin-left: 10px; }
    </style>
  `
})
export class UserPrompt{
  user: firebase.User;
  handler: any;

  constructor(
    @Inject(MD_DIALOG_DATA) public event: any,
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private authSvc: AuthService,
    private paymentSvc: PaymentService,
    public snackBar: MdSnackBar,
    public router: Router,
    public venuesAPI: VenuesApiService
    ){
        this.user = firebase.auth().currentUser;
  }

  ngOnInit() {
    this.handler = StripeCheckout.configure({
      key: environment.stripeKey,
      image: '/assets/icons/icon-144x144.png',
      locale: 'auto',
      token: token => {
        this.paymentSvc.processPayment(token, this.event.ticketPrice)
      }
    });
  }

  handlePayment(){
    this.handler.open({
      name: 'Wotspoppin',
      description: 'Enter Card Info',
      amount: this.event.ticketPrice
    });
  }

  @HostListener('window:popstate')
    onPopstate(){
      this.handler.close()
    }

  confirm(){
    //charge user card 
    //add user to guest list
    //add to users list of upcoming events
    //then show this message
    
    //check if user signed in
    if(this.user){
      console.log("User is authenticated, adding event: ", this.event.name);

      //charge user card
      //function below returns a promise 
      //either redirect to upcoming events page or stay on current page depending on the status of operation
      this.authSvc.chargeUser(this.user.uid)
        .then((res) => {
          //only call code below if charge succeeds
          //console.log(res);
          console.log("User charged successfully");

          this.addToGuestList(this.user.uid);//add user to venue event guest list

          //add event to user upcoming events
          const promise = this.db.object('/Users/' + this.user.uid + '/upcoming-events/' + this.event.$key).set(this.event);//add to user list of upcoming events

          promise
            .then(_=> {
              console.log("Your spot has been reserved");
              this.snackBar.open('Your spot has been reserved', '', {duration: 5000});
              //add user to guest list here
              this.router.navigate(['upcoming-events']);
            })
            .catch(err => {console.log("error : " + err)});
        }, (err) => {
          //charge failed, stay on page
          //console.log(err);
          this.snackBar.open(err.error.message, '', {duration: 5000}).afterDismissed().subscribe(() => {
            console.log('The snack-bar was dismissed');

            //show pop-up here
            this.handlePayment();
          });
          
        });

    }else{
      console.log("User not signed in, redirecting to sign in page");
      this.router.navigate(['authenticate']);
    }
  }

  //add user to venue guest list
  addToGuestList(userID){
    const promise = this.db.list('Events/' + this.event.$key + '/guestlist').push(userID);
  }

}
