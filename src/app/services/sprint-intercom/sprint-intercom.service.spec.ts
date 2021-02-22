import { TestBed } from '@angular/core/testing';

import { SprintIntercomService } from './sprint-intercom.service';

describe('SprintIntercomService', () => {
  let service: SprintIntercomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SprintIntercomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
