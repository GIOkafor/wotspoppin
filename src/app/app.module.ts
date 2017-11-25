import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import 'hammerjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxStripeModule } from 'ngx-stripe';
import { MdDialogModule, MdSnackBarModule, MdButtonModule, MdIconModule, MdSidenavModule, MdProgressSpinnerModule } from '@angular/material';
import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import { SearchComponent } from './search/search.component';
import { FooterComponent } from './footer/footer.component';
import { VenueDetailsComponent } from './venue-details/venue-details.component';

import { VenuesApiService } from './venues-service/venues-api.service';
import { AuthService } from './services/auth.service';
import { PaymentService } from './services/payment.service';
import { CanActivateGuard } from './can-activate-guard';
import { VenueComponent } from './venue/venue.component';
import { VenueInformationComponent } from './venue-information/venue-information.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { UpcomingEventsComponent } from './upcoming-events/upcoming-events.component';

import { UserPrompt } from './venue-information/venue-information.component';
import { AuthComponent } from './auth-component/auth-component.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CreateVenueComponent } from './create-venue/create-venue.component';
import { AddDialogComponent } from './search/search.component';
import { MyVenuesComponent } from './my-venues/my-venues.component';
import { ErrorComponent } from './auth-component/error/error.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    FooterComponent,
    VenueDetailsComponent,
    VenueComponent,
    VenueInformationComponent,
    EventDetailsComponent,
    CreateEventComponent,
    UpcomingEventsComponent,
    UserPrompt,
    AuthComponent,
    UserProfileComponent,
    CreateVenueComponent,
    AddDialogComponent,
    MyVenuesComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    NgxStripeModule.forRoot('pk_test_kUdmFcwtzEVGdCUWLQNNzQst'),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MdDialogModule,
    MdSnackBarModule,
    MdButtonModule,
    MdIconModule,
    MdSidenavModule,
    MdProgressSpinnerModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    RouterModule.forRoot([
        {
          path: '',
          redirectTo: 'venues',
          pathMatch: 'full'
        },
        {
          path: 'authenticate',
          component: AuthComponent
        },
        {
          path: 'profile',
          component: UserProfileComponent,
          canActivate: [
            CanActivateGuard
          ]
        },
        {
          path: 'venues',
          component: SearchComponent
        },
        {
          path: 'venue/:id',
          component: VenueComponent,
          children: [
            {path: '', component: VenueInformationComponent},
            {path: 'event/:id/event-details', component: EventDetailsComponent}
          ]
        },
        {
          path: 'create-venue',
          component: CreateVenueComponent,
          canActivate: [
            CanActivateGuard
          ]
        },
        {
          path: 'create-event',
          component: CreateEventComponent,
          canActivate: [
            CanActivateGuard
          ]
        },
        {
          path: 'my-venues',
          component: MyVenuesComponent,
          canActivate: [
            CanActivateGuard
          ]
        },
        {
          path: 'upcoming-events',
          component: UpcomingEventsComponent,
          canActivate: [
            CanActivateGuard
          ]
        },
        {
          path: '**',
          component: SearchComponent
        }
      ])
  ],
  entryComponents: [
    UserPrompt,
    AddDialogComponent,
    ErrorComponent
  ],
  providers: [
    VenuesApiService,
    AuthService,
    PaymentService,
    CanActivateGuard
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
