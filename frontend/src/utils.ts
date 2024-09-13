import { Setting, SortBy } from './consts';
import dayjs from 'dayjs';
import { Offers } from './types/offers';
import { Reviews } from './types/reviews';
import { Action } from 'redux';

const calculateRatingWidth = (rating: number): string =>
  `${(Math.round(rating) * 100) / Setting.MaxRating}%`;

const capitalizeWord = (word: string): string => {
  const firstLetter = word.substring(0, 1);
  const remainingWord = word.substring(1);
  return `${firstLetter.toUpperCase()}${remainingWord}`;
};

const parseDate = (date: string, dateFormat: string): string =>
  dayjs(date).format(dateFormat);

const sortAndFilterOffers = (
  city: string,
  sortType: SortBy,
  initialOffers: Offers,
) => {
  const offers = [...initialOffers].filter((offer) => offer.city.name === city);
  switch (sortType) {
    case SortBy.Popular:
      break;
    case SortBy.PriceDown:
      offers.sort(
        (firstOffer, secondOffer) => secondOffer.price - firstOffer.price,
      );
      break;
    case SortBy.PriceUp:
      offers.sort(
        (firstOffer, secondOffer) => firstOffer.price - secondOffer.price,
      );
      break;
    case SortBy.Rating:
      offers.sort(
        (firstOffer, secondOffer) => secondOffer.rating - firstOffer.rating,
      );
      break;
  }

  return offers;
};

const getRandomInteger = (a: number, b: number) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const generateRandomIndex = (a: number, b: number) => {
  const indexNumbers: number[] = [];
  return () => {
    let currentIndex = getRandomInteger(a, b);
    if (indexNumbers.length === Math.floor(Math.max(a, b) + 1)) {
      return false;
    }
    while (indexNumbers.includes(currentIndex)) {
      currentIndex = getRandomInteger(a, b);
    }
    indexNumbers.push(currentIndex);
    return currentIndex;
  };
};

const getRandomSubArray = <T>(arr: T[], count: number) => {
  if (arr.length <= count) {
    return arr;
  }
  const newArray: T[] = [];
  const indexGenerator = generateRandomIndex(0, arr.length - 1);
  for (let i = 0; i < count; i++) {
    const index = indexGenerator();
    if (index !== false) {
      newArray.push(arr[index]);
    }
  }
  return newArray;
};

const sortReviewsByDate = (reviews: Reviews) => {
  if (reviews !== null && reviews.length > 1) {
    const newReviews = [...reviews];
    newReviews.sort(
      (firstReview, secondReview) =>
        dayjs(secondReview.date).valueOf() - dayjs(firstReview.date).valueOf(),
    );
    if (newReviews.length > Setting.ReviewsShownCount) {
      return newReviews.slice(0, Setting.ReviewsShownCount);
    }
    return newReviews;
  }
  return reviews;
};

const extactActionsType = (actions: Action<string>[]) =>
  actions.map(({ type }) => type);

export {
  calculateRatingWidth,
  capitalizeWord,
  parseDate,
  sortAndFilterOffers,
  getRandomSubArray,
  sortReviewsByDate,
  extactActionsType,
  getRandomInteger,
};
