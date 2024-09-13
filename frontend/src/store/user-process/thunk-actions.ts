import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Dispatch, State } from '../../types/state';
import { ApiRoute, AppRoute } from '../../consts';
import { redirectToRoute } from '../actions';
import { dropToken, saveToken } from '../../services/token';
import { AuthData, UserData } from '../../types/auth';


const checkAuthorization = createAsyncThunk<
  UserData,
  undefined,
  { dispatch: Dispatch; state: State; extra: AxiosInstance }
>('checkAuthorization', async (_arg, { extra: api }) => {
  const { data } = await api.get<UserData>(ApiRoute.Login);
  return data;
});

const loginUser = createAsyncThunk<
  UserData,
  AuthData,
  { dispatch: Dispatch; state: State; extra: AxiosInstance }
>('loginUser', async ({ email, password }, { dispatch, extra: api }) => {
  const { data } = await api.post<UserData>(ApiRoute.Login, {
    email,
    password,
  });
  saveToken(data.token);
  dispatch(redirectToRoute(AppRoute.Main));
  return data;
});

const logoutUser = createAsyncThunk<
  void,
  undefined,
  { dispatch: Dispatch; state: State; extra: AxiosInstance }
>('logoutUser', async (_arg, { extra: api }) => {
  await api.delete(ApiRoute.Logout);
  dropToken();
});

export {
  checkAuthorization,
  loginUser,
  logoutUser
};
