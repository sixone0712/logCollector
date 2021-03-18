import React, { useCallback, useState } from 'react';
import { LOCAL_STEP } from '../components/organisms/LocalNewJob/LocalNewJob';

export default function useAddLocalJob() {
  const [current, setCurrent] = useState(0);
  const [selectSite, setSelectSite] = useState<string | undefined>();
  const [uploadFiles, setUploadFiles] = useState<any>([]);

  return {
    current,
    setCurrent,
    selectSite,
    setSelectSite,
    uploadFiles,
    setUploadFiles,
  };
}
