import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../consts';
import { UserProcess } from '../../types/state';
import { checkAuthorization, loginUser, logoutUser } from './thunk-actions';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
};

const userProcess = createSlice({
  name: NameSpace.USER,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthorization.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;

        state.user = action.payload;
      })
      .addCase(checkAuthorization.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  },
});

export { userProcess };
