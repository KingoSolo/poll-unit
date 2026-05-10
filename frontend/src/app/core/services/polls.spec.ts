import { TestBed } from '@angular/core/testing';

import { Polls } from './polls';

describe('Polls', () => {
  let service: Polls;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Polls);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
