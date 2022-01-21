import { TestBed } from '@angular/core/testing';

import { JwtExpiracyInterceptor } from './jwtExpiracy.interceptor';

describe('JwtExpiracyInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [JwtExpiracyInterceptor],
    })
  );

  it('should be created', () => {
    const interceptor: JwtExpiracyInterceptor = TestBed.inject(
      JwtExpiracyInterceptor
    );
    expect(interceptor).toBeTruthy();
  });
});
