import { TestBed, inject } from '@angular/core/testing';

import { WpApiService } from './wpapi.service';

describe('WpApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WpApiService]
    });
  });

  it('should ...', inject([WpApiService], (service: WpApiService) => {
    expect(service).toBeTruthy();
  }));
});
