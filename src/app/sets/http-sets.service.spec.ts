import { TestBed, inject } from '@angular/core/testing';

import { HttpSetsService } from './http-sets.service';

describe('HttpSetsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpSetsService]
    });
  });

  it('should be created', inject([HttpSetsService], (service: HttpSetsService) => {
    expect(service).toBeTruthy();
  }));
});
