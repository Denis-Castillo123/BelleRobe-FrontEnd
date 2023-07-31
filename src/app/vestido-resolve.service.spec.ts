import { TestBed } from '@angular/core/testing';

import { VestidoResolveService } from './vestido-resolve.service';

describe('VestidoResolveService', () => {
  let service: VestidoResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VestidoResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
