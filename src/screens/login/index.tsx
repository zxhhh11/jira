import React, { FormEvent } from "react";

import { useAuth } from "context/auth-context";

interface User {
  username: string;
  password: string;
}
const apiUrl = process.env.REACT_APP_API_URL;

export const LoginPage = () => {
  const { login, user } = useAuth();
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
    login({ username, password });
  };
  return (
    <form action="" onSubmit={handelSubmit}>
      {user ? <div>登录成功 用户名{user?.name}</div> : null}
      <div>
        <label htmlFor="">用户名</label>
        <input type="text" />
      </div>
      <div>
        <label htmlFor="">密码</label>
        <input type="password" />
      </div>
      <button type="submit">登录</button>
    </form>
  );
};
