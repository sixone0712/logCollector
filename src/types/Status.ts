import React, { Key } from 'react';
import { AlignType, DataIndex } from 'rc-table/lib/interface';
import { CompareFn } from 'antd/lib/table/interface';

export type BuildStatus = 'success' | 'failure' | 'notbuild' | 'processing';

export interface RemoteStatus {
  index: number;
  siteName: string;
  collectStatus: BuildStatus;
  errorStatus: BuildStatus;
  crasStatus: BuildStatus;
  versionStatus: BuildStatus;
  isRunning: boolean;
}

export type RemoteStatusType = 'collect' | 'error' | 'cras' | 'version';

export type RemoteColumnName =
  | 'index'
  | 'siteName'
  | 'collectStatus'
  | 'errorStatus'
  | 'crasStatus'
  | 'versionStatus'
  | 'isStop'
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
  index: number;
  siteName: string;
  status: BuildStatus;
  fileName: string[];
}

export type LocalColumnName = 'index' | 'siteName' | 'status' | 'fileName' | 'delete';

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

export interface ResRemoteStatus {
  idx: number;
  id: number;
  site_name: string;
  collect_status: string;
  error_summary_status: string;
  cras_status: string;
  version_check_status: string;
  stop: boolean;
}

export interface ResLocalStatus {
  idx: number;
  id: number;
  site_name: string;
  collect_status: string;
  file_name: string[];
}

// interface ResRemoteJobInfo {
//   id: number;

//   site_id: ResSiteInfo;

//   collect_status: ResJobStatusInfo;

//   error_summary_status: ResJobStatusInfo;

//   cras_status: ResJobStatusInfo;

//   version_check_status: ResJobStatusInfo;

//   stop: boolean;

//   owner: User;

//   created: Date;

//   last_action: Date;

//   job_type: JobType;

//   history: ResRemoteJobHistoryInfo[];

//   file_path: string;
// }

// export interface ResRemoteJobHistoryInfo {
//   id: number;
//   file_path: string;
//   created: string;
// }

// export interface ResJobStatusInfo {
//   id: number;
//   status: string;
//   full_string: string;
//   represent_string: string;
// }

// export interface ResSiteInfo {
//   id: number;

//   site_name: string;

//   fab_name: string;

//   address: string;

//   port: number;

//   user: string;

//   password: string;

//   db_address: string;

//   db_port: number;

//   db_password: string;
//   mpa_count: number;
// }

// export interface User {
//   id: number;

//   name: string;

//   password: string;

//   created: string;

//   permission: string;

//   last_access: string;
// }
