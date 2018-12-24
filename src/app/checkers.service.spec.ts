import { TestBed } from '@angular/core/testing';

import { CheckersService } from './checkers.service';

describe('CheckersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckersService = TestBed.get(CheckersService);
    expect(service).toBeTruthy();
  });
});
