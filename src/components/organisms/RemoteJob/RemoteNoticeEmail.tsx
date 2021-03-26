import { grey } from '@ant-design/colors';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Col, Collapse, Form, Input, Row, Space } from 'antd';
import Checkbox, { CheckboxChangeEvent } from 'antd/lib/checkbox/Checkbox';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { EmailOptionState, EmailOptionStateKey } from '../../../reducers/slices/remoteJob';
import MarkUpTags from '../../atoms/MarkupTags';
export type RemoteNoticeEmailProps = {
  title: string;
  email: EmailOptionState;
  setEmail: (vlaue: EmailOptionState) => void;
};

const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 20 },
};

export default function RemoteNoticeEmail({ title, email, setEmail }: RemoteNoticeEmailProps): JSX.Element {
  const { enable, to, subject, contents } = email;
  const [toInput, setToInput] = useState('');

  console.log(title, enable, to, subject, contents);

  useEffect(() => {
    console.log('RemoteNoticeEmail_useEffect', title);
  }, []);

  const onChangeEmailDebounced = useDebouncedCallback(
    (key: EmailOptionStateKey, value: boolean | string | string[]) => {
      setEmail({
        ...email,
        [key]: value,
      });
    },
    // delay in ms
    100
  );

  const onChangeEmail = useCallback(
    (key: EmailOptionStateKey, value: boolean | string | string[]) => {
      if (key === 'enable' || key === 'to') {
        setEmail({
          ...email,
          [key]: value,
        });
      } else {
        onChangeEmailDebounced(key, value);
      }
    },
    [email]
  );

  const onChangeEnable = useCallback((e) => onChangeEmail('enable', e.target.checked), []);

  const onAddTo = useCallback(() => toInput && onChangeEmail('to', [...to, toInput]), [to, toInput]);

  const onChangeTo = useCallback((value: string[]) => onChangeEmail('to', value), []);

  const onChangeSubject = useCallback((e) => onChangeEmail('subject', e.target.value), []);

  const onChangeContents = useCallback((e) => onChangeEmail('contents', e.target.value), []);

  const onChangeToInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setToInput(e.target.value);
  }, []);

  return (
    <EmailSetting>
      <Space align="start">
        <CheckBoxSection>
          <Checkbox checked={enable} onChange={onChangeEnable} />
        </CheckBoxSection>
        {/* <Collapse css={collapseStyle(enable)} activeKey={enable ? title : ''}> */}
        <Collapse css={collapseStyle(enable)} activeKey={title}>
          <Collapse.Panel header={title} key={title}>
            <Form {...layout} name={`email_${title}`}>
              <Form.Item label="To" name="to">
                <Input
                  value={toInput}
                  onChange={onChangeToInput}
                  onPressEnter={onAddTo}
                  placeholder="Add email address."
                  allowClear
                />
                <MarkUpTags
                  tags={to}
                  setTags={onChangeTo}
                  tagsStyle={css`
                    margin-top: 0.5rem;
                  `}
                />
              </Form.Item>
              <Form.Item label="Subject" name="subject" hasFeedback>
                <Input value={subject} onChange={onChangeSubject} placeholder="Input a subject." allowClear />
              </Form.Item>
              <Form.Item label="Contents" name="contents">
                <Input.TextArea
                  autoSize={{ minRows: 3, maxRows: 5 }}
                  value={contents}
                  onChange={onChangeContents}
                  placeholder="Input a subject."
                />
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

const collapseStyle = (enable: boolean) => css`
  width: 61.5rem;
  pointer-events: ${!enable && 'none'};
  .ant-collapse-header {
    color: ${!enable && grey[0]} !important;
  }
`;
