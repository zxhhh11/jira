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

export const RegisterPage = () => {
  const { register, user } = useAuth();
  // const login=(user:User)=>{
  //     // fetch(`${apiUrl}/login`,{
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
  const handelSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLFormElement).value;
    const password = (event.currentTarget.elements[1] as HTMLFormElement).value;
    register({ username, password });
  };
  return (
    <Form
      name="basic"
      // initialValues={{ remember: true }}
      onFinish={handelSubmit}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
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
        注册
      </LongButton>
    </Form>
  );
};
