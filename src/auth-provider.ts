//在真实环境中，如果使用firebase这种第三方auth 服务的话，本文件不需要开发者开发

import { User } from "./screens/project-list/search-panel";

const apiUrl = process.env.REACT_APP_API_URL;
const LocalStorageKey = "__auth_provider_key__";
export const getToken = () => window.localStorage.getItem(LocalStorageKey);

export const handelUserResponse = ({ user }: { user: User }) => {
  console.log({ user });
  window.localStorage.setItem(LocalStorageKey, user.token || "");
  return user;
};

export const login = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    console.log({ response });
    if (response.ok) {
      return handelUserResponse(await response.json());
    } else {
      return Promise.reject(data);
    }
  });
};
export const register = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    console.log({ response });
    if (response.ok) {
      return handelUserResponse(await response.json());
    } else {
      return Promise.reject(data);
    }
  });
};

export const logout = async () =>
  window.localStorage.removeItem(LocalStorageKey);
