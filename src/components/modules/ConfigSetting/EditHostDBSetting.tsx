import React from 'react';
import { css } from '@emotion/react';
import { Button, Drawer, Form, Input } from 'antd';
import { convertRemToPixels } from '../../../lib/util/remToPixcels';
import { ResGetHostDBInfo } from '../../../lib/api/axios/types';

export type EditHostDBSettingProps = {
  visible: boolean;
  close: () => void;
  data: ResGetHostDBInfo | undefined;
};

export default function EditHostDBSetting({ visible, close, data }: EditHostDBSettingProps) {
  return (
    <Drawer
      title="Edit Settings DataBase Info."
      placement="right"
      width={convertRemToPixels(18.75)}
      closable={true}
      onClose={close}
      visible={visible}
    >
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={() => {}}
        onFinishFailed={() => {}}
        layout="vertical"
      >
        <Form.Item
          label="IP Address"
          name="ipAddress"
          initialValue={data?.address}
          rules={[{ required: true, message: 'Please input ip address!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Port"
          name="port"
          rules={[{ required: true, message: 'Please input a port!', type: 'number' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="User" name="user" rules={[{ required: true, message: 'Please input a user!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input a password!' }]}>
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" css={applyBtnstyle}>
            Apply
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
}

const applyBtnstyle = css`
  width: 100%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  margin-top: 1rem;
`;
