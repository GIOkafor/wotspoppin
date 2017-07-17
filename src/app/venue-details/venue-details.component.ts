import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { VenuesApiService } from '../venues-service/venues-api.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-venue-details',
  templateUrl: './venue-details.component.html',
  styleUrls: ['./venue-details.component.scss']
})
export class VenueDetailsComponent implements OnInit {
  @Input() venue: any;

  constructor(
  		private venueService: VenuesApiService,
  		private route: ActivatedRoute,
  		private location: Location
  	) { }

  ngOnInit(): void {

  }

}
