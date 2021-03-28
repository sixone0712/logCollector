import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LabeledValue } from 'antd/lib/select';
import React from 'react';
import { RootState } from '../rootReducer';

export interface RemoteJobState {
  selectSite: LabeledValue | undefined;
  selectPlans: React.Key[];
  sendingTimes: string[];
  periodTime: PrevDataPeriodState;
  errorSummary: EmailOptionState;
  crasData: EmailOptionState;
  mpaVersion: EmailOptionState;
}

export type PrevDataPeriodUnitType = 'minute' | 'hour' | 'day';

export interface PrevDataPeriodState {
  time: number;
  unit: PrevDataPeriodUnitType;
}

export interface EmailOptionState {
  enable: boolean;
  to: string[];
  subject: string;
  contents: string;
}

export type EmailOptionStateKey = 'enable' | 'to' | 'subject' | 'contents';

const initialState: RemoteJobState = {
  selectSite: undefined,
  selectPlans: [],
  sendingTimes: [],
  periodTime: {
    time: 1,
    unit: 'day',
  },
  errorSummary: {
    enable: false,
    to: [],
    subject: '',
    contents: '',
  },
  crasData: {
    enable: false,
    to: [],
    subject: '',
    contents: '',
  },
  mpaVersion: {
    enable: false,
    to: [],
    subject: '',
    contents: '',
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
    periodTimeReducer(state, action: PayloadAction<PrevDataPeriodState>) {
      state.periodTime = action.payload;
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
  periodTimeReducer,
  errorSummaryReducer,
  crasDataReducer,
  mpaVersionReducer,
} = remoteJob.actions;

export const remoteJobSiteSelector = (state: RootState) => state.remoteJob.selectSite;
export const remoteJobPlansSelector = (state: RootState) => state.remoteJob.selectPlans;
export const remoteJobSendingTimesSelector = (state: RootState) => state.remoteJob.sendingTimes;
export const remoteJobPeriodTimeSelector = (state: RootState) => state.remoteJob.periodTime;
export const remoteJobErrorSummarySelector = (state: RootState) => state.remoteJob.errorSummary;
export const remoteJobCrasDataSelector = (state: RootState) => state.remoteJob.crasData;
export const remoteJobMpaVersionSelector = (state: RootState) => state.remoteJob.mpaVersion;

export default remoteJob.reducer;
