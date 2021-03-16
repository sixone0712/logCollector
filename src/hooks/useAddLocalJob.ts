import React, { useCallback, useState } from 'react';
import { localStatusData } from './useLocalStatus';

export default function useAddLocalJob() {
  const [getSiteList] = useState(localStatusData);

  return {
    getSiteList,
  };
}
