import { Button, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
  token?: string;
}
interface SearchPanelProps {
  users: User[];
  param: {
    name: string;
    personId: string;
  };
  setParam: (param: SearchPanelProps["param"]) => void;
}
export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
  return (
    <Form layout={"inline"} style={{ marginBottom: "2rem" }}>
      {/*setParam(Object.assign({},param,{name:evt.target.value}))  */}
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input
          placeholder="项目名"
          // onChange={(value) => setParam({ ...param, name:value })}
        />
      </Form.Item>
      <Form.Item name="personId" rules={[{ required: true }]}>
        <Select
          placeholder="负责人"
          // onChange={(value) => setParam({ ...param, personId: value })}
        >
          <Select.Option value="">负责人</Select.Option>
          {users.map((user) => (
            <Select.Option value={user.id} key={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};
