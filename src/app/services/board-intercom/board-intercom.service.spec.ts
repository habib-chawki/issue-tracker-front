import { TestBed } from '@angular/core/testing';

import { BoardIntercomService } from './board-intercom.service';

describe('BoardIntercomService', () => {
  let service: BoardIntercomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardIntercomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
