import { Component, OnInit, HostListener } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { PaymentService } from '../services/payment.service';
import { environment } from '../../environments/environment';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
 
  user: Observable<firebase.User>;

  //strip charge stuff
  handler: any;
  amount = 500;

  constructor(
    public afAuth: AngularFireAuth,
    private paymentSvc: PaymentService) { 
  	this.user = afAuth.authState;
  }

  ngOnInit() {
    this.handler = StripeCheckout.configure({
      key: environment.stripeKey,
      image: '/assets/icons/icon-144x144.png',
      locale: 'auto',
      token: token => {
        this.paymentSvc.processPayment(token, this.amount)
      }
    });
  }

  handlePayment(){
    this.handler.open({
      name: 'Wotspoppin',
      description: 'Enter Card Info'
    });
  }

  @HostListener('window:popstate')
    onPopstate(){
      this.handler.close()
    }

  logOut(){
  	this.afAuth.auth.signOut();
  }

}
