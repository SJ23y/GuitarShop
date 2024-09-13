import { AuthorizationStatus } from '../../consts';
import { UserProcess } from '../../types/state';
import { checkAuthorization, loginUser, logoutUser } from './thunk-actions';
import { userProcess } from './user-process';

describe('User-process slice', () => {
  const initialState: UserProcess = {
    authorizationStatus: AuthorizationStatus.Unknown,
    user: null,
  };

  it('Should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const state = { authorizationStatus: AuthorizationStatus.Auth, user: null };

    const result = userProcess.reducer(state, emptyAction);

    expect(result).toEqual(state);
  });

  it('Should return initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };

    const result = userProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('Should set AuthorizationStatus.Auth with checkAuthorization.fulfilled', () => {
    const result = userProcess.reducer(undefined, checkAuthorization.fulfilled);

    expect(result.authorizationStatus).toBe(AuthorizationStatus.Auth);
  });

  it('Should set AuthorizationStatus.NoAuth with checkAuthorization.rejected', () => {
    const result = userProcess.reducer(undefined, checkAuthorization.rejected);

    expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
  });

  it('Should set AuthorizationStatus.Auth with loginUser.fulfilled', () => {
    const result = userProcess.reducer(undefined, loginUser.fulfilled);

    expect(result.authorizationStatus).toBe(AuthorizationStatus.Auth);
  });

  it('Should set AuthorizationStatus.NoAuth with loginUser.rejected', () => {
    const result = userProcess.reducer(undefined, loginUser.rejected);

    expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
  });

  it('Should set AuthorizationStatus.NoAuth with logoutUser.fulfilled', () => {
    const result = userProcess.reducer(undefined, logoutUser.fulfilled);

    expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
  });

  it('Should do nothing with logoutUser.rejected', () => {
    const result = userProcess.reducer(undefined, logoutUser.rejected);

    expect(result.authorizationStatus).toBe(initialState.authorizationStatus);
  });
});
