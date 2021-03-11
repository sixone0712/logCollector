import React, { Key } from 'react';
import { AlignType, DataIndex } from 'rc-table/lib/interface';
import { CompareFn } from 'antd/lib/table/interface';

export type BuildStatus = 'success' | 'failure' | 'notbuild' | 'processing';

export interface RemoteStatus {
  no: number;
  siteName: string;
  collectStatus: BuildStatus;
  errorStatus: BuildStatus;
  crasStatus: BuildStatus;
  versionStatus: BuildStatus;
  isRunning: boolean;
}

export type RemoteStatusType = 'collect' | 'error' | 'cras' | 'version';

export type RemoteColumnName =
  | 'no'
  | 'siteName'
  | 'collectStatus'
  | 'errorStatus'
  | 'crasStatus'
  | 'versionStatus'
  | 'isRunning'
  | 'edit'
  | 'delete';

export type RemoteColumnPropsType = {
  [name in RemoteColumnName]: {
    key?: Key;
    title?: React.ReactNode;
    dataIndex?: DataIndex;
    align?: AlignType;
    sorter?:
      | boolean
      | CompareFn<RemoteStatus>
      | {
          compare?: CompareFn<RemoteStatus>;
          /** Config multiple sorter order priority */
          multiple?: number;
        };
  };
};

export interface LocalStatus {
  no: number;
  siteName: string;
  status: BuildStatus;
}

export type LocalColumnName = 'no' | 'siteName' | 'status' | 'delete';

export type LocalColumnPropsType = {
  [name in LocalColumnName]: {
    key?: Key;
    title?: React.ReactNode;
    dataIndex?: DataIndex;
    align?: AlignType;
    sorter?:
      | boolean
      | CompareFn<LocalStatus>
      | {
          compare?: CompareFn<LocalStatus>;
          /** Config multiple sorter order priority */
          multiple?: number;
        };
  };
};
