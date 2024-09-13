import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace, SortBy, SortDirection } from '../../consts';
import { MainProcess } from '../../types/state';
import {
  uploadOffers,
} from './thunk-actions';

const initialState: MainProcess = {
  initialGuitars: null,
  sortBy: SortBy.DATE,
  sortDirection: SortDirection.UP,
  errorStatus: false,
};

const mainProcess = createSlice({
  name: NameSpace.GUITARS,
  initialState,
  reducers: {
    changeSortBy: (state, action: PayloadAction<{ sortBy: SortBy }>) => {
      state.sortBy = action.payload.sortBy;
    },
    changeSortDirection: (state, action: PayloadAction<{ sortDirection: SortDirection }>) => {
      state.sortDirection = action.payload.sortDirection;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(uploadOffers.pending, (state) => {
        state.errorStatus = false;
      })
      .addCase(uploadOffers.fulfilled, (state, action) => {
        state.initialGuitars = action.payload;
      })
      .addCase(uploadOffers.rejected, (state) => {
        state.errorStatus = true;
      });
  },
});

const { changeSortBy, changeSortDirection } = mainProcess.actions;

export { changeSortBy, changeSortDirection, mainProcess };
