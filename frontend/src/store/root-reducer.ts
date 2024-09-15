import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../consts';
import { mainProcess } from './main-process/main-process';
import { guitarProcess } from './guitar-process/guitar-process';
import { userProcess } from './user-process/user-process';

const rootReducer = combineReducers({
  [NameSpace.GUITARS]: mainProcess.reducer,
  [NameSpace.GUITAR]: guitarProcess.reducer,
  [NameSpace.USER]: userProcess.reducer,
});

export { rootReducer };
