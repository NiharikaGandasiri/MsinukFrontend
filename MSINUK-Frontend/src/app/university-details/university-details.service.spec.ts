import { TestBed } from '@angular/core/testing';

import { UniversityDetailsService } from './university-details.service';

describe('UniversityDetailsService', () => {
  let service: UniversityDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UniversityDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
