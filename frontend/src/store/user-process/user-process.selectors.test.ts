import { AuthorizationStatus, NameSpace } from '../../consts';
import { checkAuthentication, getAuthorizationStatus } from './selectors';

describe('User-process selectors', () => {
  const state = {
    [NameSpace.USER]: {
      authorizationStatus: AuthorizationStatus.Auth,
      user: null,
    },
  };

  it('Should return  authorizationStatus from state', () => {
    const { authorizationStatus } = state[NameSpace.USER];

    const result = getAuthorizationStatus(state);

    expect(result).toBe(authorizationStatus);
  });

  it('Should return  true when checkAuthorization', () => {
    const result = checkAuthentication(state);

    expect(result).toBe(true);
  });
});
