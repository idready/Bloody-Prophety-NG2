import { TestBed, inject } from '@angular/core/testing';

import { ExtractsService } from './extracts.service';

describe('ExtractsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExtractsService]
    });
  });

  it('should ...', inject([ExtractsService], (service: ExtractsService) => {
    expect(service).toBeTruthy();
  }));
});
