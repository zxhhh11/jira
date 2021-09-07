import { Button, Form, Input, Select } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import React, { FormEvent } from "react";

import { LongButton } from "screens/common-style";
import { useAsync } from "util/use-async";
import { useAuth } from "context/auth-context";

interface User {
  username: string;
  password: string;
  cPassword: string;
}
const apiUrl = process.env.REACT_APP_API_URL;

export const RegisterPage = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { register, user } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwNewError: true });
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
  const handelSubmit = async ({ cPassword, ...values }: User) => {
    if (cPassword !== values.password) {
      onError(new Error("请确认两次输入的密码相同"));
      return;
    }
    try {
      await run(register(values));
    } catch (e) {
      onError(e);
    }
  };
  const value: any = undefined;
  // const handelSubmit = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const username = (event.currentTarget.elements[0] as HTMLFormElement).value;
  //   const password = (event.currentTarget.elements[1] as HTMLFormElement).value;
  //   register({ username, password });
  // };
  return (
    <Form
      name="basic"
      // initialValues={{ remember: true }}
      onFinish={handelSubmit}
    >
      {/* {value.notExit} */}
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
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
      <Form.Item
        name="cPassword"
        rules={[{ required: true, message: "Please confirm your password!" }]}
      >
        <Input
          type="password"
          placeholder="Confirm Password"
          autoComplete="off"
          prefix={<LockOutlined className="site-form-item-icon" />}
        />
      </Form.Item>
      <LongButton loading={isLoading} type="primary" htmlType="submit">
        注册
      </LongButton>
    </Form>
  );
};
