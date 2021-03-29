import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LabeledValue } from 'antd/lib/select';
import React from 'react';
import { RootState } from '../rootReducer';

export interface RemoteJobState {
  selectSite: LabeledValue | undefined;
  selectPlans: React.Key[];
  sendingTimes: string[];
  before: BeforeState;
  errorSummary: EmailOptionState;
  crasData: EmailOptionState;
  mpaVersion: EmailOptionState;
}

export type BeforeUnitType = 'minute' | 'hour' | 'day';

export interface BeforeState {
  time: number;
  unit: BeforeUnitType;
}

export interface EmailOptionState {
  enable: boolean;
  recipients: string[];
  subject: string;
  body: string;
}

export type EmailOptionStateKey = 'enable' | 'recipients' | 'subject' | 'body';

const initialState: RemoteJobState = {
  selectSite: undefined,
  selectPlans: [],
  sendingTimes: [],
  before: {
    time: 1,
    unit: 'day',
  },
  errorSummary: {
    enable: false,
    recipients: [],
    subject: '',
    body: '',
  },
  crasData: {
    enable: false,
    recipients: [],
    subject: '',
    body: '',
  },
  mpaVersion: {
    enable: false,
    recipients: [],
    subject: '',
    body: '',
  },
};

const remoteJob = createSlice({
  name: 'remoteJob',
  initialState,
  reducers: {
    initRemoteJobReducer: () => initialState,
    selectSiteReducer(state, action: PayloadAction<LabeledValue>) {
      state.selectSite = action.payload;
    },
    selectPlansReducer(state, action: PayloadAction<React.Key[]>) {
      state.selectPlans = action.payload;
    },
    sendingTimesReducer(state, action: PayloadAction<string[]>) {
      state.sendingTimes = action.payload;
    },
    beforeReducer(state, action: PayloadAction<BeforeState>) {
      state.before = action.payload;
    },
    errorSummaryReducer(state, action: PayloadAction<EmailOptionState>) {
      state.errorSummary = action.payload;
    },
    crasDataReducer(state, action: PayloadAction<EmailOptionState>) {
      state.crasData = action.payload;
    },
    mpaVersionReducer(state, action: PayloadAction<EmailOptionState>) {
      state.mpaVersion = action.payload;
    },
  },
});

export const {
  initRemoteJobReducer,
  selectSiteReducer,
  selectPlansReducer,
  sendingTimesReducer,
  beforeReducer,
  errorSummaryReducer,
  crasDataReducer,
  mpaVersionReducer,
} = remoteJob.actions;

export const remoteJobSiteSelector = (state: RootState) => state.remoteJob.selectSite;
export const remoteJobPlansSelector = (state: RootState) => state.remoteJob.selectPlans;
export const remoteJobSendingTimesSelector = (state: RootState) => state.remoteJob.sendingTimes;
export const remoteJobBeforeSelector = (state: RootState) => state.remoteJob.before;
export const remoteJobErrorSummarySelector = (state: RootState) => state.remoteJob.errorSummary;
export const remoteJobCrasDataSelector = (state: RootState) => state.remoteJob.crasData;
export const remoteJobMpaVersionSelector = (state: RootState) => state.remoteJob.mpaVersion;

export default remoteJob.reducer;
