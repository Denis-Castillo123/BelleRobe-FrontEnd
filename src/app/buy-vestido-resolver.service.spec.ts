import { TestBed } from '@angular/core/testing';

import { BuyVestidoResolverService } from './buy-vestido-resolver.service';

describe('BuyVestidoResolverService', () => {
  let service: BuyVestidoResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuyVestidoResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
