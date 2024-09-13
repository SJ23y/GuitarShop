import { NameSpace } from '../../consts';
import { State } from '../../types/state';

const getCurrentOffer = (state: Pick<State, NameSpace.OFFER>) =>
  state[NameSpace.OFFER].currentOffer;
const getNearbyOffers = (state: Pick<State, NameSpace.OFFER>) =>
  state[NameSpace.OFFER].nearbyOffers;
const getReviews = (state: Pick<State, NameSpace.OFFER>) =>
  state[NameSpace.OFFER].reviews;

export { getCurrentOffer, getNearbyOffers, getReviews };
