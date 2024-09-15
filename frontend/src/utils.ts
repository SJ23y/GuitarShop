import { Action } from 'redux';
import { GuitarQuery } from './types/query';
import { Setting, SortBy, SortDirection } from './consts';
import { Guitar } from './types/guitars';
import dayjs from 'dayjs';

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

const extactActionsType = (actions: Action<string>[]) =>
  actions.map(({ type }) => type);


const createQueryString = ({count, sortBy, sortDirection, page, types, strings}: GuitarQuery) => {
  let queryString = `count=${count}&sortBy=${sortBy}&sortDirection=${sortDirection}&page=${page}`
  if (types && types.length > 0) {
    queryString += types.reduce((result, item): string => {
      return result + `&type[]=${item}`;
    }, '')
  }

  if (strings && strings.length > 0) {
    queryString += strings.reduce((result, item): string => {
      return result +`&strings[]=${item}`;
    }, '')
  }
  return queryString;
}

const sortGuitars = (sortBy: SortBy, sortDirection: SortDirection, guitars: Guitar[]) => {
  const sortedGuitars = [...guitars];
  switch (sortBy) {
    case SortBy.DATE:
      sortedGuitars.sort((firstGuitar, secondGuitar) => dayjs(secondGuitar.date).valueOf() - dayjs(firstGuitar.date).valueOf());
      break;
    case SortBy.PRICE:
      sortedGuitars.sort((firstGuitar, secondGuitar) => secondGuitar.price - firstGuitar.price);
  }

  return (sortDirection === SortDirection.DOWN) ? sortedGuitars : sortedGuitars.reverse();
}

const generatePaginationPages = (currentPage: number, totalPages: number, pages: number[]) => {
  let newPages = [...pages]
  for(let i=currentPage; i < (currentPage + Setting.PaginationPagesCount); i++ ) {
    if (i <= totalPages && !newPages.includes(i)) {
      newPages.push(i);
      if (newPages.length > Setting.PaginationPagesCount) {
        newPages = newPages.slice(1)
      }
    }
  }

  return newPages;
}

export {
  getRandomSubArray,
  extactActionsType,
  getRandomInteger,
  createQueryString,
  sortGuitars,
  generatePaginationPages
};
