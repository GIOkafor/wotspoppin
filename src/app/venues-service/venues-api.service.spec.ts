import { TestBed, inject } from '@angular/core/testing';

import { VenuesApiService } from './venues-api.service';

describe('VenuesApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VenuesApiService]
    });
  });

  it('should be created', inject([VenuesApiService], (service: VenuesApiService) => {
    expect(service).toBeTruthy();
  }));
});
