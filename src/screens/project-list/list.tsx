import React, { useEffect, useState } from "react";
import { Table, TableProps } from "antd";

import { Link } from "react-router-dom";
import { To } from "history";
import { User } from "./search-panel";
import dayjs from "dayjs";

export interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
}
interface ListProps extends TableProps<Project> {
  // list: Project[];
  users: User[];
}
export const List = ({ users, ...props }: ListProps) => {
  const columns = [
    {
      title: "名称",
      // dataIndex: "name",
      key: "name",
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
      render(
        value: any,
        project: {
          id: To;
          name:
            | boolean
            | React.ReactChild
            | React.ReactFragment
            | React.ReactPortal
            | null
            | undefined;
        }
      ) {
        return <Link to={String(project.id)}>{project.name}</Link>;
      },
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
        console.log(users, project);
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
  return <Table rowKey="id" columns={columns} {...props} />;
};
