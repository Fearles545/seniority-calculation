import { TestBed } from '@angular/core/testing';

import { ApiWithNestJsService } from './api-with-nest-js.service';

describe('ApiWithNestJsService', () => {
  let service: ApiWithNestJsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiWithNestJsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
