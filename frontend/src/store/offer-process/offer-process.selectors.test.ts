import { NameSpace } from '../../consts';
import detailedOffers from '../../mocks/detailedOffers';
import offers from '../../mocks/offers';
import reviews from '../../mocks/reviews';
import { getCurrentOffer, getNearbyOffers, getReviews } from './selectors';

describe('Offer-process selectors', () => {
  const state = {
    [NameSpace.OFFER]: {
      nearbyOffers: offers,
      currentOffer: detailedOffers[0],
      reviews: reviews,
    },
  };

  it('Should return nearbyOffers from the state', () => {
    const nearbyOffers = offers;

    const result = getNearbyOffers(state);

    expect(result).toEqual(nearbyOffers);
  });

  it('Should return currentOffer from the state', () => {
    const currentOffer = detailedOffers[0];

    const result = getCurrentOffer(state);

    expect(result).toEqual(currentOffer);
  });

  it('Should return reviews from the state', () => {
    const reviewsList = reviews;

    const result = getReviews(state);

    expect(result).toEqual(reviewsList);
  });
});
