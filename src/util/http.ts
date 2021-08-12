import * as auth from "auth-provider";

import qs from "qs";
import { useAuth } from "context/auth-context";

const apiUrl = process.env.REACT_APP_API_URL;
interface Config extends RequestInit {
  token?: string;
  data?: object;
}
export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  //={}  加默认值 解决调用 只传一个参数时报错的问题
  const config = {
    method: "GET", //这里默认设置成 GET  若出发请求时传递了 method 则会在customConfig 中覆盖掉默认的
    headers: {
      Authorization: token ? `Bear ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };
  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }
  //axios 和fetch 表现不一样  axios 可以正确返回请求状态异常
  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        await auth.logout();
        window.location.reload();
        return Promise.reject({ message: "请重新登录" });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject();
      }
    });
};

// utility type
type Person = {
  name: string;
  age: number;
};

type PersonKeys = keyof Person;

type Age = Exclude<PersonKeys, "name">;
// console.log(PersonKeys,Age)
// const xiaoMing:Partial<Person> = {}

// const xiaoHong:Omit<Person,'name'> = {age:12,name：'12'}
// console.log(xiaoHong)
export const useHttp = () => {
  // 这样当我们的请求都通过useHttp调用的时候  token都会加到请求中了
  const { user } = useAuth(); //[string,Config]  Parameters<typeof http>  这个的意思是 这里的参数类型与http 方法的参数类型一致
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token });
};
