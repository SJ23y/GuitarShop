import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Dispatch, State } from '../../types/state';
import { ApiRoute, AppRoute } from '../../consts';
import { DetailedOffer, Offers } from '../../types/offers';
import { redirectToRoute } from '../actions';
import { Review, Reviews } from '../../types/reviews';
import { toast } from 'react-toastify';


const uploadOfferById = createAsyncThunk<
  DetailedOffer | void,
  string,
  { dispatch: Dispatch; state: State; extra: AxiosInstance }
>('uploadOfferInfoById', async (offerId, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<DetailedOffer>(
      `${ApiRoute.Offers}/${offerId}`,
    );
    return data;
  } catch {
    dispatch(redirectToRoute(AppRoute.Page404));
  }
});

const uploadNearbyOffers = createAsyncThunk<
  Offers,
  string,
  { dispatch: Dispatch; state: State; extra: AxiosInstance }
>('uploadOfferById', async (offerId, { extra: api }) => {
  const { data } = await api.get<Offers>(
    `${ApiRoute.Offers}/${offerId}/nearby`,
  );
  return data;
});

const uploadReviews = createAsyncThunk<
  Reviews,
  string,
  { dispatch: Dispatch; state: State; extra: AxiosInstance }
>('uploadReviews', async (offerId, { extra: api }) => {
  const { data } = await api.get<Reviews>(`${ApiRoute.Comments}/${offerId}`);
  return data;
});

const uploadNewReview = createAsyncThunk<
  Review | undefined,
  {
    offerId: string;
    comment: string;
    rating: number;
    disableForm: (status: boolean) => void;
      },
  { dispatch: Dispatch; state: State; extra: AxiosInstance }
      >(
      'loginUser',
      async ({ offerId, comment, rating, disableForm }, { extra: api }) => {
        try {
          const { data } = await api.post<Review>(
            `${ApiRoute.Comments}/${offerId}`,
            { comment, rating },
          );
          disableForm(true);
          return data;
        } catch {
          toast.warn('Возникла ошибка при отправке отзыва');
          disableForm(false);
        }
      },
      );

export {
  uploadOfferById,
  uploadNearbyOffers,
  uploadReviews,
  uploadNewReview
};
