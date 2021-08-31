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
export interface SearchPanelProps {
  users: User[];
  param: {
    name: string;
    personId: string;
  };
  setParam: (param: SearchPanelProps["param"]) => void;
}
export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
  {
    /*setParam(Object.assign({},param,{name:evt.target.value}))  */
  }
  return (
    <Form layout={"inline"} style={{ marginBottom: "2rem" }}>
      <Form.Item
        name="name"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input
          placeholder="项目名"
          onChange={(e) => setParam({ ...param, name: e.target.value })}
        />
      </Form.Item>
      <Form.Item name="personId" rules={[{ required: true }]}>
        <Select
          placeholder="负责人"
          onSelect={(value) =>
            setParam({ ...param, personId: value as string })
          }
        >
          {/* <Select.Option value=''>负责人</Select.Option> */}
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
