import { TestBed } from '@angular/core/testing';

import { TimeActivityService } from './time-activity-service';

describe('TimeActivityService', () => {
  let service: TimeActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeActivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
