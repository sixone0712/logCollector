import { combineReducers } from '@reduxjs/toolkit';
import localJob from './slices/localJob';
import remoteJob from './slices/remoteJob';

const rootReducer = combineReducers({
  localJob,
  remoteJob,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
