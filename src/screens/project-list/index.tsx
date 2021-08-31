import * as qs from "qs";

import { List, Project } from "./list";
import React, { useEffect, useState } from "react";
import { SearchPanel, SearchPanelProps } from "./search-panel";
import { cleanObject, useDebounce, useMount } from "../../util";

import { Typography } from "antd";
import styled from "@emotion/styled";
import { useAsync } from "util/use-async";
// import { useHttp } from "util/http";
import { useProjects } from "util/project";
import { useUsers } from "util/users";

const apiUrl = process.env.REACT_APP_API_URL;
console.log(apiUrl);
export const ProjectListScreen = () => {
  const [param, setParam] = useState({ name: "", personId: "" });
  // const [list, setList] = useState([]);
  // const [users, setUsers] = useState([]);
  // const [loading,setLoading] = useState(false);
  // const [error,setError] = useState<null|Error>(null);
  const debouncedParam = useDebounce(param, 200); //用自定义debounce hook 设置debouncedParam的值
  // const {run,isLoading,error,data:list} = useAsync<Project[]>() // 这里的list 是data 的别名
  const { isLoading, error, data: list } = useProjects(debouncedParam); // 这里的list 是data 的别名
  const { data: users } = useUsers();
  // const client = useHttp();
  // useEffect(() => {
  // console.log(cleanObject(param));
  // setLoading(true)
  // run(client("projects", { data: cleanObject(debouncedParam) }))

  // .catch(error=>{
  //   setList([])
  //   setError(error)
  // })
  // .then(setList)
  // .finally(()=>setLoading(false));
  // fetch 方法 获取数据
  // fetch(
  //   `${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`
  // ).then(async (response) => {
  //   console.log({ response });
  //   if (response.ok) {
  //     setList(await response.json());
  //   }
  // });
  //eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [debouncedParam]);
  // useEffect(()=>{
  //     // fetch 方法 获取数据
  //     fetch(`${apiUrl}/users`).then(async response=>{
  //         console.log({response})
  //         if(response.ok){
  //             setUsers(await response.json())
  //         }
  //     })
  // },[])
  // useMount(() => {
  //   // fetch 方法 获取数据
  //   client("users").then(setUsers);
  //   // fetch(`${apiUrl}/users`).then(async (response) => {
  //   //   console.log({ response });
  //   //   if (response.ok) {
  //   //     setUsers(await response.json());
  //   //   }
  //   // });
  // });
  return (
    <Container>
      <SearchPanel
        users={users || []}
        param={param}
        setParam={setParam}
      ></SearchPanel>
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <List
        loading={isLoading}
        users={users || []}
        dataSource={list || []}
      ></List>
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
