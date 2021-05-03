import { ColumnsType, ColumnType, CompareFn } from 'antd/lib/table/interface';
import { DataIndex, AlignType } from 'rc-table/lib/interface';
import { Key } from 'react';
import { ResGetSiteDBInfo, ResGetSiteName } from '../lib/api/axios/types';

export interface SiteFabName extends ResGetSiteName {
  siteFabName: string;
}

export type SiteDBInfoColumnName =
  | 'rapidCollector'
  | 'index'
  | 'siteName'
  | 'fabName'
  | 'address'
  | 'port'
  | 'user'
  | 'dbServer'
  | 'dbAddress'
  | 'dbPort'
  | 'dbUser'
  | 'edit'
  | 'delete';

// export type SiteInfoColumnPropsType = {
//   [name in SiteInfoColumnName]: {
//     key?: Key;
//     title?: React.ReactNode;
//     dataIndex?: DataIndex;
//     align?: AlignType;
//     sorter?:
//       | boolean
//       | CompareFn<SiteInfo>
//       | {
//           compare?: CompareFn<SiteInfo>;
//           /** Config multiple sorter order priority */
//           multiple?: number;
//         };
//   };
// };

export type SiteDBInfoColumnPropsType = {
  [name in SiteDBInfoColumnName]: ColumnType<ResGetSiteDBInfo>;
};

export interface SiteDBInfo extends ResGetSiteDBInfo {
  index: number;
}
