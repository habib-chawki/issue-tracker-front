import { TestBed } from '@angular/core/testing';

import { ProjectCommunicationService } from './project-intercom.service';

describe('ProjectCommunicationService', () => {
  let service: ProjectCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
