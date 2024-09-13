import { ThunkDispatch } from '@reduxjs/toolkit';
import { AuthorizationStatus, SortBy, SortDirection } from '../consts';
import { store } from '../store';
import { createAPI } from '../services/api';
import { Action } from 'redux';
import { UserData } from './auth';
import { Guitar, Guitars } from './guitars';

export type MainProcess = {
  initialGuitars: null | Guitars;
  sortBy: SortBy;
  sortDirection: SortDirection;
  errorStatus: boolean;
};

export type GuitarProcess = {
  currentGuitar: null | Guitar;
};

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  user: UserData | null;
};

export type State = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
export type AppThunkDispatch = ThunkDispatch<
  State,
  ReturnType<typeof createAPI>,
  Action
>;
