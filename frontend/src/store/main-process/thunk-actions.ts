import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Dispatch, State } from '../../types/state';
import { ApiRoute } from '../../consts';
import { Offer, Offers } from '../../types/offers';

const uploadOffers = createAsyncThunk<
  Offers,
  undefined,
  { dispatch: Dispatch; state: State; extra: AxiosInstance }
>('uploadOffers', async (_arg, { extra: api }) => {
  const { data } = await api.get<Offers>(ApiRoute.Offers);
  return data;
});

const uploadFavoriteOffers = createAsyncThunk<
  Offers,
  undefined,
  { dispatch: Dispatch; state: State; extra: AxiosInstance }
>('uploadFavoriteOffers', async (_arg, { extra: api }) => {
  const { data } = await api.get<Offers>(ApiRoute.Favorites);
  return data;
});

const toggleFavoriteStatus = createAsyncThunk<
  Offer,
  { offerId: string; status: number },
  { dispatch: Dispatch; state: State; extra: AxiosInstance }
>('toggleFavoriteStatus', async ({ offerId, status }, { extra: api }) => {
  const { data } = await api.post<Offer>(
    `${ApiRoute.Favorites}/${offerId}/${status}`,
  );
  return data;
});

export {
  uploadOffers,
  uploadFavoriteOffers,
  toggleFavoriteStatus,
};
