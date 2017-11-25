import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class PaymentService {

  user: firebase.User;
  herokuChargeUrl = 'https://shrouded-bastion-34965.herokuapp.com/api/charge';
  herokuCustomerCreate = 'https://shrouded-bastion-34965.herokuapp.com/api/createCustomer';

  constructor(
  	private db: AngularFireDatabase,
  	private afAuth: AngularFireAuth,
  	private http: HttpClient) { 
  		this.user = afAuth.auth.currentUser;
  }

  processPayment(token, amount){
  	console.log("Token is: ", token);
  	//console.log("Amount is: ", amount);

  	const paymentInfo = {token};
  	const uid = this.user.uid;

  	this.db.object('/Users/' + uid + '/paymentInfo').set(paymentInfo)
  		.then(_=> console.log("added payment successfully"));

  	//setup headers pre call to external endpoint
  	const headers = new HttpHeaders()
        .set('Content-Type', 'application/json');

  	//call heroku charge stripe with token data
  	this.http.post(this.herokuCustomerCreate, {token, uid})
  		.subscribe(data => {
  			//console.log(data);
  		});
  }

}
