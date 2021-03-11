import React from 'react';
import { css } from '@emotion/react';
import { Button, Checkbox, Col, Form, Input, Row } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { grey } from '@ant-design/colors';

export type UserLoginProps = {
  children?: React.ReactNode;
};

const Container = styled(Row)`
  width: 31.25rem;
  height: 38.125rem;
  flex-direction: column;
  background-color: #838d98;
`;

export default function UserLogin({ children }: UserLoginProps): JSX.Element {
  const onFinish = () => {
    console.log('onFinish');
  };

  return (
    <Row css={style} justify="center" align="middle">
      <Container justify="center" align="middle">
        <Col>Welcome</Col>
        <Col>
          <Form name="normal_login" initialValues={{ remember: true }} onFinish={onFinish}>
            <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!' }]}>
              <Input prefix={<UserOutlined />} placeholder="Username" css={inputStyle} />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
              <Input prefix={<LockOutlined />} type="password" placeholder="Password" css={inputStyle} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" css={inputStyle}>
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Container>
    </Row>
  );
}

const inputStyle = css`
  width: 25rem;
  border-radius: 0.625rem;
`;

const style = css`
  width: inherit;
  height: inherit;
  flex-direction: column;

  //width: 23.125rem;
  //height: 24rem;
`;
