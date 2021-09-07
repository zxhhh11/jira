import { Button, Form, Input, Select } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import React, { FormEvent } from "react";

import { LongButton } from "screens/common-style";
import { useAsync } from "util/use-async";
import { useAuth } from "context/auth-context";

interface User {
  username: string;
  password: string;
}
const apiUrl = process.env.REACT_APP_API_URL;

export const LoginPage = ({ onError }: { onError: (error: Error) => void }) => {
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
  const { run, isLoading } = useAsync(undefined, { throwNewError: true });

  const handelSubmit = async (value: User) => {
    try {
      await run(login(value));
    } catch (e) {
      onError(e);
    }
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
          autoComplete="off"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input
          type="password"
          placeholder="Password"
          autoComplete="off"
          prefix={<LockOutlined className="site-form-item-icon" />}
        />
      </Form.Item>
      <LongButton loading={isLoading} type="primary" htmlType="submit">
        登录
      </LongButton>
    </Form>
  );
};
