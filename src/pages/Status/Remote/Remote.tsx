import { css } from '@emotion/react';
import React from 'react';
import RemoteJob from '../../../components/modules/RemoteJob';
import RemoteStatusTable from '../../../components/modules/RemoteStatusTable';

export type RemoteJobType = 'new' | 'edit';

export type RemoteProps = {
  children?: React.ReactNode;
};

function Remote({ children }: RemoteProps) {
  return (
    <div>
      <RemoteStatusTable />
    </div>
  );
}

type NewJobProps = {
  children?: React.ReactNode;
};

function NewJob({ children }: NewJobProps) {
  return (
    <div>
      <RemoteJob type={'new'} />
    </div>
  );
}

type EditJobProps = {
  children?: React.ReactNode;
};

function EditJob({ children }: EditJobProps) {
  return (
    <div>
      <RemoteJob type={'edit'} />
    </div>
  );
}
Remote.NewJob = NewJob;
Remote.EditJob = EditJob;
export default Remote;
