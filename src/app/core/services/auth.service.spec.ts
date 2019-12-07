import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    service = new AuthService();
  });

  it('isLoggedIn should return false by default', () => {
    expect(service.isLoggedIn).toBe(false);
  });

  it('isLoggedIn should return true after login', (done: DoneFn) => {
    service.login().subscribe(value => {
      expect(value).toBe(true);
      expect(service.isLoggedIn).toBe(true);
      done();
    });
  });

  it('isLoggedIn should return false after logout', () => {
    service.logout();
    expect(service.isLoggedIn).toBe(false);
  });
});
