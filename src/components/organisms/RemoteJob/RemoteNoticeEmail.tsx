import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Col, Collapse, Input, Row, Space } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { EmailOptionState, EmailOptionStateKey } from '../../../reducers/slices/remoteJob';
import MarkUpTags from '../../atoms/MarkupTags';
import { PlusCircleOutlined } from '@ant-design/icons';

export type RemoteNoticeEmailProps = {
  title: string;
  email: EmailOptionState;
  setEmail: (vlaue: EmailOptionState) => void;
};

export default function RemoteNoticeEmail({ title, email, setEmail }: RemoteNoticeEmailProps): JSX.Element {
  const { enable, to } = email;
  const [subject, setSubject] = useState(email.subject);
  const [contents, setContents] = useState(email.contents);
  const [toInput, setToInput] = useState('');
  const [active, setActive] = useState(email.enable);

  useEffect(() => {
    console.log('RemoteNoticeEmail_useEffect', title);
  }, []);

  const debounce = useDebouncedCallback(
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
      } else if (key === 'subject') {
        setSubject(value as string);
        debounce(key, value);
      } else if (key === 'contents') {
        setContents(value as string);
        debounce(key, value);
      }
    },
    [email]
  );

  const onChangeEnable = useCallback((e) => {
    setActive(e.target.checked);
    onChangeEmail('enable', e.target.checked);
  }, []);

  const onAddTo = useCallback(() => {
    if (toInput) {
      if (to.findIndex((item) => item === toInput) === -1) onChangeEmail('to', [...to, toInput]);
      setToInput('');
    }
  }, [to, toInput]);

  const onChangeTo = useCallback((value: string[]) => onChangeEmail('to', value), []);

  const onChangeSubject = useCallback((e) => onChangeEmail('subject', e.target.value), []);

  const onChangeContents = useCallback((e) => onChangeEmail('contents', e.target.value), []);

  const onChangeToInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setToInput(e.target.value);
  }, []);

  const header = useMemo(() => <div onClick={() => setActive(!active)}>{title}</div>, [active, setActive]);
  const addToIcon = useMemo(
    () => (
      <PlusCircleOutlined
        css={css`
          margin-left: 0.5rem;
        `}
        onClick={onAddTo}
      />
    ),
    [onAddTo]
  );

  return (
    <EmailSetting>
      <Space align="start">
        <CheckBoxSection>
          <Checkbox checked={enable} onChange={onChangeEnable} />
        </CheckBoxSection>
        <Collapse
          css={collapseStyle(enable)}
          collapsible={enable ? 'header' : 'disabled'}
          activeKey={active ? title : ''}
        >
          <Collapse.Panel header={header} key={title}>
            <ToSection>
              <Title>To :</Title>
              <InputValue>
                <Input
                  value={toInput}
                  onChange={onChangeToInput}
                  onPressEnter={onAddTo}
                  placeholder="Input email address then press a enter."
                  allowClear
                  suffix={addToIcon}
                />
              </InputValue>
              <InputTags>
                <MarkUpTags
                  tags={to}
                  setTags={onChangeTo}
                  tagsStyle={css`
                    margin-top: 0.5rem;
                  `}
                />
              </InputTags>
            </ToSection>
            <SubjectSection>
              <Title>Subject :</Title>
              <InputValue>
                <Input value={subject} onChange={onChangeSubject} placeholder="Input a subject." allowClear />
              </InputValue>
            </SubjectSection>
            <ContentsSection
              css={css`
                align-items: flex-start;
              `}
            >
              <Title>Contents :</Title>
              <InputValue>
                <Input.TextArea
                  autoSize={{ minRows: 3, maxRows: 5 }}
                  value={contents}
                  onChange={onChangeContents}
                  placeholder="Input a subject."
                  allowClear
                />
              </InputValue>
            </ContentsSection>
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

const ToSection = styled(Row)`
  flex-direction: row;
  align-items: center;
`;

const SubjectSection = styled(Row)`
  flex-direction: row;
  align-items: center;
  margin-top: 1rem;
`;

const ContentsSection = styled(Row)`
  flex-direction: row;
  align-items: center;
  margin-top: 1rem;
`;

const Title = styled(Col)`
  width: 5rem;
  text-align: right;
  margin-top: 0.5rem;
`;
const InputValue = styled(Col)`
  margin-left: 2rem;
  width: 52.25rem;
`;

const InputTags = styled(Col)`
  margin-left: 7.125rem;
  width: 52.25rem;
`;

const collapseStyle = (enable: boolean) => css`
  width: 61.5rem;
  cursor: ${!enable && 'not-allowed'};
  .ant-collapse-header {
    pointer-events: ${!enable && 'none'};
  }
`;
