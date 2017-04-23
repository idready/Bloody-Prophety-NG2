import { TestBed, inject } from '@angular/core/testing';

import { WpapiService } from './wpapi.service';

describe('WpapiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WpapiService]
    });
  });

  it('should ...', inject([WpapiService], (service: WpapiService) => {
    expect(service).toBeTruthy();
  }));
});
