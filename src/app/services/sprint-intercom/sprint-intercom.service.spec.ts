import { TestBed } from '@angular/core/testing';

import { SprintSharedService } from './sprint-intercom.service';

describe('SprintIntercomService', () => {
  let service: SprintSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SprintSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
