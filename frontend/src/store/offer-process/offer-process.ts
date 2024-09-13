import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, Setting } from '../../consts';
import {
  uploadNearbyOffers,
  uploadNewReview,
  uploadOfferById,
  uploadReviews,
} from './thunk-actions';
import { OfferProcess } from '../../types/state';
import { getRandomSubArray } from '../../utils';
import { toggleFavoriteStatus } from '../main-process/thunk-actions';

const initialState: OfferProcess = {
  nearbyOffers: null,
  currentOffer: null,
  reviews: null,
};

const offerProcess = createSlice({
  name: NameSpace.OFFER,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(uploadOfferById.fulfilled, (state, action) => {
        if (action.payload) {
          state.currentOffer = action.payload;
        }
      })
      .addCase(uploadNearbyOffers.fulfilled, (state, action) => {
        state.nearbyOffers = getRandomSubArray(
          action.payload,
          Setting.NearbyOffersCount,
        );
      })
      .addCase(uploadReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(uploadNewReview.fulfilled, (state, action) => {
        if (action.payload) {
          if (state.reviews) {
            state.reviews = [...state.reviews, action.payload];
          } else {
            state.reviews = [action.payload];
          }
        }
      })
      .addCase(toggleFavoriteStatus.fulfilled, (state, action) => {
        if (state.currentOffer?.id === action.payload.id) {
          state.currentOffer = {
            ...state.currentOffer,
            isFavorite: action.payload.isFavorite,
          };
        }
        if (state.nearbyOffers) {
          const index = state.nearbyOffers.findIndex(
            (offer) => offer.id === action.payload.id,
          );
          if (index > -1) {
            state.nearbyOffers = [
              ...state.nearbyOffers.slice(0, index),
              action.payload,
              ...state.nearbyOffers.slice(index + 1),
            ];
          }
        }
      });
  },
});

export { offerProcess };
