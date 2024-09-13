import detailedOffers from '../../mocks/detailedOffers';
import offers from '../../mocks/offers';
import reviews from '../../mocks/reviews';
import {
  uploadNearbyOffers,
  uploadNewReview,
  uploadOfferById,
  uploadReviews,
} from './thunk-actions';
import { offerProcess } from './offer-process';
import { toggleFavoriteStatus } from '../main-process/thunk-actions';

describe('Offer-process slice', () => {
  const initialState = {
    nearbyOffers: null,
    currentOffer: null,
    reviews: null,
  };

  const state = {
    nearbyOffers: offers,
    currentOffer: detailedOffers[1],
    reviews: reviews,
  };

  it('Should return initial state with empty action', () => {
    const emptyAction = { type: '' };

    const result = offerProcess.reducer(state, emptyAction);

    expect(result).toEqual(state);
  });

  it('Should return initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };

    const result = offerProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('Should set currentOffer to detailedOffers[3] uploadOfferById.fulfilled', () => {
    const currentOffer = detailedOffers[3];

    const result = offerProcess.reducer(
      state,
      uploadOfferById.fulfilled(currentOffer, '', '1'),
    );

    expect(result.currentOffer).toEqual(currentOffer);
  });

  it('Should set nearbyOffers to offers.slice(3) with uploadNearbyOffers.fulfilled', () => {
    const newOffers = offers.slice(3);

    const result = offerProcess.reducer(
      state,
      uploadNearbyOffers.fulfilled(newOffers, '', '1'),
    );

    expect(result.nearbyOffers).toEqual(newOffers);
  });

  it('Should set rewviews to reviews.slice(2) with uploadReviews.fulfilled', () => {
    const newReviews = reviews.slice(2);

    const result = offerProcess.reducer(
      state,
      uploadReviews.fulfilled(newReviews, '', '1'),
    );

    expect(result.reviews).toEqual(newReviews);
  });

  it('Should add newReview with uploadNewReview.fulfilled', () => {
    const newReview = {
      id: '9c-886e-4234-b508-0bfeef58b423',
      comment: 'Some comment',
      date: '2024-12-13T21:00:00.030Z',
      rating: 2,
      user: {
        name: 'Sergey',
        avatarUrl: 'https://15.design.htmlacademy.pro/static/avatar/5.jpg',
        isPro: false,
      },
    };

    const result = offerProcess.reducer(
      state,
      uploadNewReview.fulfilled(newReview, '', {
        offerId: '1',
        comment: '',
        rating: 5,
        disableForm: (status) => status,
      }),
    );

    expect(
      result.reviews?.find((review) => review.id === newReview.id),
    ).toEqual(newReview);
  });

  it('Should not replace currentOffer with toggleFavoriteStatus.fulfilled', () => {
    const newOffer = {
      id: 'bb24c641-a20b-4bfd-8731-2db7fa55f5a7',
      title: 'Beautiful studio at great location',
      type: 'apartment',
      price: 120,
      city: {
        name: 'Amsterdam',
        location: {
          latitude: 52.35514938496378,
          longitude: 4.673877537499948,
          zoom: 8,
        },
      },
      location: {
        latitude: 52.3809553943508,
        longitude: 4.939309666406198,
        zoom: 8,
      },
      isFavorite: false,
      isPremium: false,
      rating: 4,
      previewImage: 'img/apartment-01.jpg',
    };

    const result = offerProcess.reducer(
      state,
      toggleFavoriteStatus.fulfilled(newOffer, '', { offerId: '1', status: 0 }),
    );

    expect(result.currentOffer?.isFavorite).not.toEqual(newOffer.isFavorite);
  });

  it('Should replace currentOffer with toggleFavoriteStatus.fulfilled', () => {
    const newOffer = {
      id: 'a65fed04-5db4-4fbb-936b-c699e56269c8',
      title: 'Beautiful studio at great location',
      type: 'apartment',
      price: 120,
      city: {
        name: 'Amsterdam',
        location: {
          latitude: 52.35514938496378,
          longitude: 4.673877537499948,
          zoom: 8,
        },
      },
      location: {
        latitude: 52.3809553943508,
        longitude: 4.939309666406198,
        zoom: 8,
      },
      isFavorite: false,
      isPremium: false,
      rating: 4,
      previewImage: 'img/apartment-01.jpg',
    };

    const result = offerProcess.reducer(
      state,
      toggleFavoriteStatus.fulfilled(newOffer, '', { offerId: '1', status: 0 }),
    );

    expect(result.currentOffer?.isFavorite).toEqual(newOffer.isFavorite);
  });

  it('Should replace newOffer in nearbyOffers with toggleFavoriteStatus.fulfilled', () => {
    const newOffer = {
      id: '6af6f711-c28d-4121-82cd-e0b462a27f00',
      title: 'Beautiful studio at great location',
      type: 'apartment',
      price: 120,
      city: {
        name: 'Amsterdam',
        location: {
          latitude: 52.35514938496378,
          longitude: 4.673877537499948,
          zoom: 8,
        },
      },
      location: {
        latitude: 52.3809553943508,
        longitude: 4.939309666406198,
        zoom: 8,
      },
      isFavorite: false,
      isPremium: false,
      rating: 4,
      previewImage: 'img/apartment-01.jpg',
    };
    const result = offerProcess.reducer(
      state,
      toggleFavoriteStatus.fulfilled(newOffer, '', { offerId: '1', status: 0 }),
    );

    expect(
      result.nearbyOffers?.find((offer) => offer.id === newOffer.id),
    ).toEqual(newOffer);
  });
});
