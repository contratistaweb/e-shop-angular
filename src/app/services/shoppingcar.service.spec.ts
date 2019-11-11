import { TestBed } from '@angular/core/testing';

import { ShoppingcarService } from './shoppingcar.service';

describe('ShoppingcarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShoppingcarService = TestBed.get(ShoppingcarService);
    expect(service).toBeTruthy();
  });
});
