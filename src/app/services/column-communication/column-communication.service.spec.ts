import { TestBed } from '@angular/core/testing';

import { ColumnCommunicationService } from './column-communication.service';

describe('ColumnCommunicationService', () => {
  let service: ColumnCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColumnCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
