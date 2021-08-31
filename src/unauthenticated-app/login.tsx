import { Button, Form, Input, Select } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import React, { FormEvent } from "react";

import { LongButton } from "screens/common-style";
import { useAuth } from "context/auth-context";

interface User {
  username: string;
  password: string;
}
const apiUrl = process.env.REACT_APP_API_URL;

export const LoginPage = () => {
  const { login, user } = useAuth();
  // const login=(user:User)=>{
  //     fetch(`${apiUrl}/register`,{
  //             method:'POST',
  //             headers:{
  //                 'Content-Type':'application/json'
  //             },
  //             body:JSON.stringify(user)
  //         }
  //       ).then(async (response) => {
  //         console.log({ response });
  //         if (response.ok) {

  //         }
  //       });
  // }
  const handelSubmit = (value: User) => {
    login(value);
  };
  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={handelSubmit}
    >
      {user ? <div>登录成功 用户名{user?.name}</div> : null}
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input
          placeholder="Username"
          prefix={<UserOutlined className="site-form-item-icon" />}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input
          type="password"
          placeholder="Password"
          prefix={<LockOutlined className="site-form-item-icon" />}
        />
      </Form.Item>
      <LongButton type="primary" htmlType="submit">
        登录
      </LongButton>
    </Form>
  );
};
