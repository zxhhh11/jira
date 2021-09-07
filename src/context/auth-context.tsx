import * as auth from "auth-provider";

import { FullPageErrorFallback, FullPageLoading } from "components/lib";
import React, { ReactNode, useState } from "react";

import { User } from "screens/project-list/search-panel";
import { useAsync } from "util/use-async";

interface AuthForm {
  username: string;
  password: string;
}
const AuthContext = React.createContext<
  | {
      user: User | null;
      register: (form: AuthForm) => Promise<void>;
      login: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));
  const { isIdle, isLoading, isError, error } = useAsync();

  // 这里有异步请求时再添加 下面的代码 否则由于默认isIdle 为true 那么它就会一直loading
  // if(isIdle||isLoading){
  //   return <FullPageLoading></FullPageLoading>
  // }
  // if(isError){
  //   return <FullPageErrorFallback error={error}></FullPageErrorFallback>
  // }

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    ></AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth 必须在AuthProvider中使用");
  }
  return context;
};
