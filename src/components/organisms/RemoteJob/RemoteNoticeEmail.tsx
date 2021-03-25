import React, { useState } from 'react';
import { css } from '@emotion/react';
import { Col, Collapse, Input, Row, RowProps, Space } from 'antd';
import styled from '@emotion/styled';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import { grey } from '@ant-design/colors';
import MarkUpTags from '../../atoms/MarkupTags';

export type RemoteNoticeEmailProps = {
  children?: React.ReactNode;
  title: string;
};

interface RowPropsExtra {
  last?: boolean;
}
export default function RemoteNoticeEmail({ title }: RemoteNoticeEmailProps): JSX.Element {
  const [check, setCheck] = useState(true);
  console.log('check', check);

  return (
    <EmailSetting>
      <Space align="start">
        <CheckBoxSection>
          <Checkbox onChange={(e) => setCheck(e.target.checked)} />
        </CheckBoxSection>
        <Collapse css={collapseStyle(check)}>
          <Collapse.Panel header={title} key="1">
            <EmailToInput>
              <InputTitle>To :</InputTitle>
              <Input placeholder="Email Address" />
            </EmailToInput>
            <EmailToTags>
              <MarkUpTags
                tags={['sixone0712@gmail.com']}
                setTags={() => {
                  console.log('');
                }}
              />
            </EmailToTags>
            <EmailSubject>
              <InputTitle>Subject :</InputTitle>
              <Input placeholder="Subject" />
            </EmailSubject>
            <EmailContext>
              <InputTitle>Contents :</InputTitle>
              <Input.TextArea placeholder="Contents" />
            </EmailContext>
          </Collapse.Panel>
        </Collapse>
      </Space>
    </EmailSetting>
  );
}

const EmailSetting = styled(Row)`
  font-size: 1rem;
  flex-wrap: nowrap;
  margin-top: 2rem;
`;

const CheckBoxSection = styled(Col)`
  height: 3rem;
  display: flex;
  align-items: center;
`;

const InputTitle = styled(Row)`
  width: 8rem;
  margin-left: 3rem;
`;

const emailItemStyle = css`
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
`;

const EmailToInput = styled(Row)`
  ${emailItemStyle}
  margin-bottom: 1rem
`;

const EmailToTags = styled(Row)`
  ${emailItemStyle}
`;

const EmailSubject = styled(Row)`
  ${emailItemStyle}
`;

const EmailContext = styled(Row)`
  ${emailItemStyle}
`;

const collapseStyle = (check: boolean) => css`
  width: 61.5rem;
  pointer-events: ${!check && 'none'};
  .ant-collapse-header {
    color: ${!check && grey[0]} !important;
  }
`;
