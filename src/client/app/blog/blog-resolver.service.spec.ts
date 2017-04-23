import { TestBed, inject } from '@angular/core/testing';

import { BlogResolverService } from './blog-resolver.service';

describe('BlogResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlogResolverService]
    });
  });

  it('should ...', inject([BlogResolverService], (service: BlogResolverService) => {
    expect(service).toBeTruthy();
  }));
});
