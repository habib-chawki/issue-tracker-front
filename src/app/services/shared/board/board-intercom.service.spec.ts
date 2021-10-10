import { TestBed } from '@angular/core/testing';

import { BoardSharedService } from './board-intercom.service';

describe('BoardIntercomService', () => {
  let service: BoardSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
