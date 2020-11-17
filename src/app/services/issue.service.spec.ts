import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';

import { IssueService } from './issue.service';

describe('IssueService', () => {
  let service: IssueService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IssueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
