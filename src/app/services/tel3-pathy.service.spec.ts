import { TestBed } from '@angular/core/testing';

import { Tel3PathyService } from './tel3-pathy.service';

describe('Tel3PathyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Tel3PathyService = TestBed.get(Tel3PathyService);
    expect(service).toBeTruthy();
  });
});
