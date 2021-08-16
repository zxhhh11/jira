import React, { useEffect, useState } from "react";

import { Table } from "antd";
import { User } from "./search-panel";
import dayjs from "dayjs";
import { render } from "@testing-library/react";

interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
}
interface ListProps {
  list: Project[];
  users: User[];
}
export const List = ({ list, users }: ListProps) => {
  const columns = [
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "部门",
      dataIndex: "organization",
      key: "organization",
    },
    {
      title: "负责人",
      dataIndex: "personId",
      key: "personId",
      render(value: string, project: Project) {
        // render:(personId:string)=><span>{users.find((user) => user.id === personId)?.name || "未知"}</span>
        return (
          <span>
            {users.find((user: User) => user.id === project.personId)?.name ||
              "未知"}
          </span>
        );
      },
    },
    {
      title: "创建时间",
      dataIndex: "created",
      key: "created",
      render(value: string, project: Project) {
        return <span>{value ? dayjs(value).format("YYYY-MM-DD") : ""}</span>;
      },
    },
  ];
  return <Table rowKey="id" dataSource={list} columns={columns} />;
};
