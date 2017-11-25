const functions = require('firebase-functions');
const stripe = require('stripe')('pk_test_kUdmFcwtzEVGdCUWLQNNzQst');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

//check db when value is updated
//create customer with id passed to db
/*
exports.createCustomer = functions.database.ref('/Users/{uid}/paymentInfo')
	.onWrite(event => {
		const token = event.data.val().token;

		//use token to create customer object via stripe
		console.log("Token passed is: ", token); //debug code

		//CHECK IF CUSTOMER_ID EXISTS TO PREVENT INFINITE LOOP
		//******************

		//create customer
		stripe.customers.create({
			email: token.email,
			source: token.id,
		}).then(customer => {

			//save customer info in db for later use
			return event.data.ref.child('customerId').set(customer.id);
		}).catch(err => {
			//external request to cloud function fails so set id to temp value
			//return event.data.ref.child('customerId').set('tempID');
			return;
			console.log("Custom error message: ", err);
		});
		//catch above makes the difference b/w failing gracefully and throwing a bunch of errors
		return event.data.ref.child('customerId').set('tempID');
	});
	*/