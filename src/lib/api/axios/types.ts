import { BuildStatus } from '../../../types/status';

export interface ResGetRemoteJobStatus {
  id: number;
  stop: boolean;
  siteName: string;
  fabName: string;
  collectStatus: BuildStatus;
  errorSummaryStatus: BuildStatus;
  crasDataStatus: BuildStatus;
  mpaVersionStatus: BuildStatus;
}

export interface RemoteNotification {
  recipients: string[];
  subject: string;
  content: string;
}
export interface ReqPostRemoteJob {
  siteId: number;
  planIds: number[];
  jobType: string;
  notification: {
    isErrorSummary: boolean;
    isCrasData: boolean;
    isMpaVersion: boolean;
    sendingTimes: string[];
    before: number;
    errorSummaryEmail?: RemoteNotification | undefined;
    crasDataEmail?: RemoteNotification | undefined;
    mpaVersionEmail?: RemoteNotification | undefined;
  };
}

export interface ResPostRemoteJob {
  id: number;
}

export interface ResGetRemoteJob {
  id: number;
  siteName: string;
  fabName: string;
  errorSummary: MailContext;
  crasData: MailContext;
  mpaVersion: MailContext;
  planIds: number[];
  sendingTimes: string[];
  before: number;
}

export interface MailContext {
  enable: boolean;
  recipients: string[];
  subject: string;
  body: string;
}

export interface ResGetLocalJobStatus {
  id: number;
  siteName: string;
  fabName: string;
  collectStatus: BuildStatus;
  fileIds: number[];
  fileNames: string[];
}

export interface ReqPostLocalJob {
  siteId: number;
  filenames: string[];
}

export interface ResPostLocalJob {
  id: number;
}

export interface ResGetSiteName {
  id: number;
  siteName: string;
  fabName: string;
}

export interface ResGetRemotePlan {
  planId: number;
  planName: string;
  planType: string;
  machineNames: string[];
  targetNames: string[];
  description: string;
  status: string;
}

export interface ResGetHostDBInfo {
  address: string;
  port: number;
  user: string;
  password: string;
}

export interface ReqPostHostDBInfo {
  address: string;
  port: number;
  user: string;
  password: string;
}

export interface ResGetSiteDBInfo {
  index?: number; // Create an index after receiving the response.
  id: number;
  siteName: string;
  fabName: string;
  address: string;
  port: number;
  user: string;
  password: string;
  dbAddress: string;
  dbPort: number;
  dbUser: string;
  dbPassword: string;
}

export interface ReqPostSiteDBInfo {
  siteName: string;
  fabName: string;
  address: string;
  port: number;
  user: string;
  password: string;
  dbAddress: string;
  dbPort: number;
  dbUser: string;
  dbPassword: string;
}

export interface ReqPutSiteDBInfoParams {
  reqId: string;
  reqData: ReqPostSiteDBInfo;
}
