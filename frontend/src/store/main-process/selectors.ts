import { NameSpace } from '../../consts';
import { State } from '../../types/state';
import { sortAndFilterOffers } from '../../utils';
import { createSelector } from '@reduxjs/toolkit';

const getInitialOffers = (state: Pick<State, NameSpace.OFFERS>) =>
  state[NameSpace.OFFERS].initialOffers;
const getOffers = createSelector(
  [
    (state: Pick<State, NameSpace.OFFERS>) =>
      state[NameSpace.OFFERS].initialOffers,
    (state: Pick<State, NameSpace.OFFERS>) => state[NameSpace.OFFERS].city,
    (state: Pick<State, NameSpace.OFFERS>) => state[NameSpace.OFFERS].sortBy,
  ],
  (initialOffers, city, sortBy) => {
    if (initialOffers) {
      return sortAndFilterOffers(city, sortBy, initialOffers);
    }
  },
);
const getLoadingStatus = (state: Pick<State, NameSpace.OFFERS>) =>
  state[NameSpace.OFFERS].isLoading;
const getSortBy = (state: Pick<State, NameSpace.OFFERS>) =>
  state[NameSpace.OFFERS].sortBy;
const getCurrentCity = (state: Pick<State, NameSpace.OFFERS>) =>
  state[NameSpace.OFFERS].city;
const getErrorStatus = (state: Pick<State, NameSpace.OFFERS>) =>
  state[NameSpace.OFFERS].errorStatus;
const getFavoriteOffers = (state: Pick<State, NameSpace.OFFERS>) =>
  state[NameSpace.OFFERS].favoriteOffers;

export {
  getInitialOffers,
  getOffers,
  getLoadingStatus,
  getSortBy,
  getCurrentCity,
  getErrorStatus,
  getFavoriteOffers,
};
