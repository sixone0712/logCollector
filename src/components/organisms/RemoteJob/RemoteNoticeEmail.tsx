import { grey } from '@ant-design/colors';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Col, Collapse, Form, Input, Row, Space } from 'antd';
import Checkbox, { CheckboxChangeEvent } from 'antd/lib/checkbox/Checkbox';
import React, { ChangeEvent, useState } from 'react';
import { EmailOptionState } from '../../../reducers/slices/remoteJob';
import MarkUpTags from '../../atoms/MarkupTags';

export type RemoteNoticeEmailProps = {
  title: string;
  contents: EmailOptionState;
  setContents: (vlaue: EmailOptionState) => void;
};

const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default function RemoteNoticeEmail({ title, contents, setContents }: RemoteNoticeEmailProps): JSX.Element {
  const [check, setCheck] = useState(true);
  const { enable, to, subject, conetents } = contents;

  const [toInput, setToInput] = useState('');

  const setEnable = (e: CheckboxChangeEvent) => {
    setContents({
      ...contents,
      enable: e.target.checked,
    });
  };

  const setTo = (value: string[]) => {
    setContents({
      ...contents,
      to: value,
    });
  };

  const onChangeToInput = (e: ChangeEvent<HTMLInputElement>) => {
    setToInput(e.target.value);
  };

  const addEmailTags = () => {
    setContents({
      ...contents,
      to: [...to, toInput],
    });
    setToInput('');
  };

  return (
    <EmailSetting>
      <Space align="start">
        <CheckBoxSection>
          <Checkbox onChange={setEnable} />
        </CheckBoxSection>
        <Collapse css={collapseStyle(enable)}>
          <Collapse.Panel header={title} key="1">
            <Form {...layout} name={`email_${title}`}>
              <Form.Item label="To" name="to" rules={[{ required: true, message: 'Please add email!' }]}>
                <Input value={toInput} onChange={onChangeToInput} onPressEnter={addEmailTags} />
                <MarkUpTags
                  tags={to}
                  setTags={setTo}
                  tagsStyle={css`
                    margin-top: 0.5rem;
                  `}
                />
              </Form.Item>
              <Form.Item label="Subject" name="subject" rules={[{ required: true, message: 'Please input subject!' }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Context" name="context">
                <Input.TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
              </Form.Item>
            </Form>
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
  margin-bottom: 1rem;
`;

const EmailToTags = styled(Row)`
  margin-left: 8rem;
  ${emailItemStyle}
`;

const EmailSubject = styled(Row)`
  ${emailItemStyle}
`;

const EmailContext = styled(Row)`
  ${emailItemStyle}
`;

const collapseStyle = (enable: boolean) => css`
  width: 61.5rem;
  pointer-events: ${!enable && 'none'};
  .ant-collapse-header {
    color: ${!enable && grey[0]} !important;
  }
`;
