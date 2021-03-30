import React, { Key } from 'react';
import { AlignType, DataIndex } from 'rc-table/lib/interface';
import { CompareFn } from 'antd/lib/table/interface';
import { ResGetLocalJobStatus, ResGetRemoteJobStatus, ResGetRemotePlan } from '../lib/api/axios/types';
export type BuildStatus = 'success' | 'failure' | 'notbuild' | 'processing';
export interface RemoteJobStatus extends ResGetRemoteJobStatus {
  index: number;
  siteFabName: string;
}

export type RemoteStatusType = 'collectStatus' | 'errorSummaryStatus' | 'crasDataStatus' | 'mpaVersionStatus';

export type RemoteColumnName =
  | 'index'
  | 'siteFabName'
  | 'collectStatus'
  | 'errorSummaryStatus'
  | 'crasDataStatus'
  | 'mpaVersionStatus'
  | 'stop'
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
      | CompareFn<RemoteJobStatus>
      | {
          compare?: CompareFn<RemoteJobStatus>;
          /** Config multiple sorter order priority */
          multiple?: number;
        };
  };
};

export interface LocalStatus extends ResGetLocalJobStatus {
  index: number;
  siteFabName: string;
  files: number;
}

export type LocalColumnName = 'index' | 'siteFabName' | 'status' | 'files' | 'delete';

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

export interface RemotePlan extends ResGetRemotePlan {
  index: React.Key;
  machineCount: number;
  targetCount: number;
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
