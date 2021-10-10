import { TestBed } from '@angular/core/testing';

import { ProjectSharedService } from './project-shared.service';

describe('ProjectCommunicationService', () => {
  let service: ProjectSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
