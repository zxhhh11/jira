import * as qs from "qs";

import React, { useEffect, useState } from "react";
import { cleanObject, useDebounce, useMount } from "../../util";

import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useHttp } from "util/http";

const apiUrl = process.env.REACT_APP_API_URL;
console.log(apiUrl);
export const ProjectListScreen = () => {
  const [param, setParam] = useState({ name: "", personId: "" });
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const debouncedParam = useDebounce(param, 200); //用自定义debounce hook 设置debouncedParam的值

  const client = useHttp();
  useEffect(() => {
    // console.log(cleanObject(param));
    client("projects", { data: cleanObject(debouncedParam) }).then(setList);
    // fetch 方法 获取数据
    // fetch(
    //   `${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`
    // ).then(async (response) => {
    //   console.log({ response });
    //   if (response.ok) {
    //     setList(await response.json());
    //   }
    // });
  }, [debouncedParam]);
  // useEffect(()=>{
  //     // fetch 方法 获取数据
  //     fetch(`${apiUrl}/users`).then(async response=>{
  //         console.log({response})
  //         if(response.ok){
  //             setUsers(await response.json())
  //         }
  //     })
  // },[])
  useMount(() => {
    // fetch 方法 获取数据
    client("users").then(setUsers);
    // fetch(`${apiUrl}/users`).then(async (response) => {
    //   console.log({ response });
    //   if (response.ok) {
    //     setUsers(await response.json());
    //   }
    // });
  });
  return (
    <div>
      <SearchPanel
        users={users}
        param={param}
        setParam={setParam}
      ></SearchPanel>
      <List users={users} list={list}></List>
    </div>
  );
};
