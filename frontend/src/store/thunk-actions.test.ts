import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { AppThunkDispatch, State } from '../types/state';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from 'redux';
import offers from '../mocks/offers';
import { ApiRoute } from '../consts';
import { checkAuthorization, loginUser, logoutUser, toggleFavoriteStatus, uploadFavoriteOffers, uploadNearbyOffers, uploadNewReview, uploadOfferById, uploadOffers, uploadReviews } from './thunk-actions';
import { extactActionsType } from '../utils';
import { AuthData, } from '../types/auth';
import { redirectToRoute } from './actions';
import * as tokenStorage from '../services/token';
import detailedOffers from '../mocks/detailedOffers';
import reviews from '../mocks/reviews';


describe('Async actions', () => {
  const axios = createAPI();

  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);

  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({OFFERS: { initialOffers: null }});
  });

  it('should dispatch "uploadOffers.pending" and "uploadOffers.fulfilled" with thunk uploadOffers and code 200', async () => {
    const returnedData = offers.slice(2);
    mockAxiosAdapter.onGet(ApiRoute.Offers).reply(200, returnedData);

    await store.dispatch(uploadOffers());

    const emittedActions = store.getActions();
    const actions = extactActionsType(emittedActions);
    const receivedData = emittedActions.at(1) as ReturnType<typeof uploadOffers.fulfilled>;

    expect(actions).toEqual([uploadOffers.pending.type, uploadOffers.fulfilled.type]);
    expect(receivedData.payload).toEqual(returnedData);
  });

  it('should dispatch "checkAuthorization.pending" and "checkAuthorization.fulfilled" with thunk checkAuthorization and code 200', async () => {
    mockAxiosAdapter.onGet(ApiRoute.Login).reply(200);

    await store.dispatch(checkAuthorization());

    const actions = extactActionsType(store.getActions());

    expect(actions).toEqual([checkAuthorization.pending.type, checkAuthorization.fulfilled.type]);
  });

  it('should dispatch "checkAuthorization.pending" and "checkAuthorization.rejected" with thunk checkAuthorization and code 401', async () => {
    mockAxiosAdapter.onGet(ApiRoute.Login).reply(401);

    await store.dispatch(checkAuthorization());

    const actions = extactActionsType(store.getActions());

    expect(actions).toEqual([checkAuthorization.pending.type, checkAuthorization.rejected.type]);
  });

  it('should dispatch "loginUser.pending", "redirectToRoute" and "loginUser.fulfilled" with thunk loginUser and code 200', async () => {
    const returnedData = { token: 'token' };
    const userData: AuthData = {password: '121121', email: 'aaaa@aaaa.com'};
    mockAxiosAdapter.onPost(ApiRoute.Login).reply(200, returnedData);

    await store.dispatch(loginUser(userData));

    const actions = extactActionsType(store.getActions());

    expect(actions).toEqual([loginUser.pending.type, redirectToRoute.type, loginUser.fulfilled.type]);
  });

  it('should dispatch "loginUser.pending" and "loginUser.rejected" with thunk loginUser and code 400', async () => {
    const userData: AuthData = {password: '121121', email: 'aaaa@aaaa.com'};
    mockAxiosAdapter.onPost(ApiRoute.Login).reply(400);

    await store.dispatch(loginUser(userData));

    const actions = extactActionsType(store.getActions());

    expect(actions).toEqual([loginUser.pending.type, loginUser.rejected.type]);
  });

  it('should call saveToken function one time with token with thunk loginUser and code 200', async () => {
    const returnedData = { token: 'token' };
    const userData: AuthData = {password: '121121', email: 'aaaa@aaaa.com'};
    mockAxiosAdapter.onPost(ApiRoute.Login).reply(200, returnedData);

    const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

    await store.dispatch(loginUser(userData));

    expect(mockSaveToken).toBeCalledTimes(1);
    expect(mockSaveToken).toBeCalledWith(returnedData.token);
  });

  it('should dispatch "logoutUser.pending" and "logoutUser.fulfilled" with thunk logoutUser and code 204', async () => {
    mockAxiosAdapter.onDelete(ApiRoute.Logout).reply(204);

    await store.dispatch(logoutUser());

    const actions = extactActionsType(store.getActions());

    expect(actions).toEqual([logoutUser.pending.type, logoutUser.fulfilled.type]);
  });

  it('should call dropToken one time with thunk logotUser', async () => {
    mockAxiosAdapter.onDelete(ApiRoute.Logout).reply(204);

    const mockSaveToken = vi.spyOn(tokenStorage, 'dropToken');

    await store.dispatch(logoutUser());

    expect(mockSaveToken).toBeCalledTimes(1);
  });

  it('should dispatch "uploadOfferById.pending" and "uploadOfferById.fulfilled" with thunk uploadOfferById and code 200', async () => {
    const returnedData = detailedOffers[2];
    mockAxiosAdapter.onGet(`${ApiRoute.Offers}/${returnedData.id}`).reply(200, returnedData);

    await store.dispatch(uploadOfferById(returnedData.id));

    const emittedActions = store.getActions();
    const actions = extactActionsType(emittedActions);
    const receivedData = emittedActions.at(1) as ReturnType<typeof uploadOfferById.fulfilled>;

    expect(actions).toEqual([uploadOfferById.pending.type, uploadOfferById.fulfilled.type]);
    expect(receivedData.payload).toEqual(returnedData);
  });

  it('should dispatch "uploadOfferById.pending", "redirectToRoute" and "uploadOfferById.fulfilled" with thunk uploadOfferById and code 404', async () => {
    const returnedData = detailedOffers[2];
    mockAxiosAdapter.onGet(`${ApiRoute.Offers}/${returnedData.id}`).reply(404, []);

    await store.dispatch(uploadOfferById(returnedData.id));

    const emittedActions = store.getActions();
    const actions = extactActionsType(emittedActions);

    expect(actions).toEqual([uploadOfferById.pending.type, redirectToRoute.type, uploadOfferById.fulfilled.type]);
  });

  it('should dispatch "uploadNearbyOffers.pending" and "uploadNearbyOffers.fulfilled" with thunk uploadNearbyOffers and code 200', async () => {
    const offerId = detailedOffers[0].id;
    const returnedData = offers.slice(2);
    mockAxiosAdapter.onGet(`${ApiRoute.Offers}/${offerId}/nearby`).reply(200, returnedData);

    await store.dispatch(uploadNearbyOffers(offerId));

    const emittedActions = store.getActions();
    const actions = extactActionsType(emittedActions);
    const receivedData = emittedActions.at(1) as ReturnType<typeof uploadNearbyOffers.fulfilled>;

    expect(actions).toEqual([uploadNearbyOffers.pending.type, uploadNearbyOffers.fulfilled.type]);
    expect(receivedData.payload).toEqual(returnedData);
  });

  it('should dispatch "uploadNearbyOffers.pending" and "uploadNearbyOffers.rejected" with thunk uploadNearbyOffers and code 404', async () => {
    const offerId = detailedOffers[0].id;
    mockAxiosAdapter.onGet(`${ApiRoute.Offers}/${offerId}/nearby`).reply(404, []);

    await store.dispatch(uploadNearbyOffers(offerId));

    const emittedActions = store.getActions();
    const actions = extactActionsType(emittedActions);

    expect(actions).toEqual([uploadNearbyOffers.pending.type, uploadNearbyOffers.rejected.type]);
  });

  it('should dispatch "uploadReviews.pending" and "uploadReviews.fulfilled" with thunk uploadReviews and code 200', async () => {
    const offerId = detailedOffers[0].id;
    const returnedData = reviews.slice(2);
    mockAxiosAdapter.onGet(`${ApiRoute.Comments}/${offerId}`).reply(200, returnedData);

    await store.dispatch(uploadReviews(offerId));

    const emittedActions = store.getActions();
    const actions = extactActionsType(emittedActions);
    const receivedData = emittedActions.at(1) as ReturnType<typeof uploadReviews.fulfilled>;

    expect(actions).toEqual([uploadReviews.pending.type, uploadReviews.fulfilled.type]);
    expect(receivedData.payload).toEqual(returnedData);
  });

  it('should dispatch "uploadReviews.pending" and "uploadReviews.rejected" with thunk uploadReviews and code 404', async () => {
    const offerId = detailedOffers[0].id;
    mockAxiosAdapter.onGet(`${ApiRoute.Comments}/${offerId}`).reply(404, []);

    await store.dispatch(uploadReviews(offerId));

    const emittedActions = store.getActions();
    const actions = extactActionsType(emittedActions);

    expect(actions).toEqual([uploadReviews.pending.type, uploadReviews.rejected.type]);
  });

  it('should dispatch "uploadNewReview.pending" and "uploadNewReview.fulfilled" with thunk uploadNewReview and code 200', async () => {
    const offerId = detailedOffers[0].id;
    const returnedData = reviews[1];
    mockAxiosAdapter.onPost(`${ApiRoute.Comments}/${offerId}`).reply(200, returnedData);

    const mockDisableForm = (status: boolean) => {
      Number(status);
    };

    await store.dispatch(uploadNewReview({
      offerId: offerId,
      comment: returnedData.comment,
      rating: returnedData.rating,
      disableForm: mockDisableForm
    }));

    const emittedActions = store.getActions();
    const actions = extactActionsType(emittedActions);
    const receivedData = emittedActions.at(1) as ReturnType<typeof uploadNewReview.fulfilled>;

    expect(actions).toEqual([uploadNewReview.pending.type, uploadNewReview.fulfilled.type]);
    expect(receivedData.payload).toEqual(returnedData);
  });

  it('should call disableForm one time with status "true" with thunk uploadNewReview and code 200', async () => {
    const offerId = detailedOffers[0].id;
    const returnedData = reviews[1];
    mockAxiosAdapter.onPost(`${ApiRoute.Comments}/${offerId}`).reply(200, returnedData);

    const fakeModule = {
      mockDisableForm(status: boolean) {
        Number(status);
      }
    };

    vi.spyOn(fakeModule, 'mockDisableForm');

    await store.dispatch(uploadNewReview({
      offerId: offerId,
      comment: returnedData.comment,
      rating: returnedData.rating,
      disableForm: fakeModule.mockDisableForm
    }));

    expect(fakeModule.mockDisableForm).toBeCalledTimes(1);
    expect(fakeModule.mockDisableForm).toBeCalledWith(true);
  });

  it('should call disableForm one time with status "false" with thunk uploadNewReview and code 404', async () => {
    const offerId = detailedOffers[0].id;
    const returnedData = reviews[1];
    mockAxiosAdapter.onPost(`${ApiRoute.Comments}/${offerId}`).reply(404, []);

    const fakeModule = {
      mockDisableForm(status: boolean) {
        Number(status);
      }
    };

    vi.spyOn(fakeModule, 'mockDisableForm');

    await store.dispatch(uploadNewReview({
      offerId: offerId,
      comment: returnedData.comment,
      rating: returnedData.rating,
      disableForm: fakeModule.mockDisableForm
    }));

    expect(fakeModule.mockDisableForm).toBeCalledTimes(1);
    expect(fakeModule.mockDisableForm).toBeCalledWith(false);
  });

  it('should dispatch "uploadFavoriteOffers.pending" and "uploadFavoriteOffers.fulfilled" with thunk uploadFavoriteOffers and code 200', async () => {
    const returnedData = offers.slice(1);
    mockAxiosAdapter.onGet(ApiRoute.Favorites).reply(200, returnedData);

    await store.dispatch(uploadFavoriteOffers());

    const emittedActions = store.getActions();
    const actions = extactActionsType(emittedActions);
    const receivedData = emittedActions.at(1) as ReturnType<typeof uploadFavoriteOffers.fulfilled>;

    expect(actions).toEqual([uploadFavoriteOffers.pending.type, uploadFavoriteOffers.fulfilled.type]);
    expect(receivedData.payload).toEqual(returnedData);
  });

  it('should dispatch "uploadFavoriteOffers.pending" and "uploadFavoriteOffers.rejected" with thunk uploadFavoriteOffers and code 404', async () => {
    mockAxiosAdapter.onGet(ApiRoute.Favorites).reply(404, []);

    await store.dispatch(uploadFavoriteOffers());

    const emittedActions = store.getActions();
    const actions = extactActionsType(emittedActions);

    expect(actions).toEqual([uploadFavoriteOffers.pending.type, uploadFavoriteOffers.rejected.type]);
  });

  it('should dispatch "toggleFavoriteStatus.pending" and "toggleFavoriteStatus.fulfilled" with thunk toggleFavoriteStatus and code 200', async () => {
    const returnedData = offers[0];
    mockAxiosAdapter.onPost(`${ApiRoute.Favorites}/${returnedData.id}/1`).reply(200, returnedData);

    await store.dispatch(toggleFavoriteStatus({offerId: returnedData.id, status: 1}));

    const emittedActions = store.getActions();
    const actions = extactActionsType(emittedActions);
    const receivedData = emittedActions.at(1) as ReturnType<typeof toggleFavoriteStatus.fulfilled>;

    expect(actions).toEqual([toggleFavoriteStatus.pending.type, toggleFavoriteStatus.fulfilled.type]);
    expect(receivedData.payload).toEqual(returnedData);
  });

  it('should dispatch "toggleFavoriteStatus.pending" and "toggleFavoriteStatus.rejected" with thunk toggleFavoriteStatus and code 400', async () => {
    const returnedData = offers[0];
    mockAxiosAdapter.onPost(`${ApiRoute.Favorites}/${returnedData.id}/1`).reply(400, returnedData);

    await store.dispatch(toggleFavoriteStatus({offerId: returnedData.id, status: 1}));

    const emittedActions = store.getActions();
    const actions = extactActionsType(emittedActions);

    expect(actions).toEqual([toggleFavoriteStatus.pending.type, toggleFavoriteStatus.rejected.type]);
  });

});
