import React from 'react';
import globalHook, { Store } from 'use-global-hook';

type UploadFilesState = {
  uploadFiles: any;
};

type UploadFilesActions = {
  setUploadFiles: (value: any) => void;
};

const setUploadFiles = (store: Store<UploadFilesState, UploadFilesActions>, value: any) => {
  store.setState({ uploadFiles: value });
};

const initialState: UploadFilesState = {
  uploadFiles: [],
};

const actions = {
  setUploadFiles,
};

const useGlobal = globalHook<UploadFilesState, UploadFilesActions>(React, initialState, actions);

export default function useUploadFiles() {
  const [state, actions] = useGlobal();

  console.log('state', state);

  return {
    uploadFiles: state.uploadFiles,
    setUploadFiles: actions.setUploadFiles,
  };
}
