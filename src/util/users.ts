import { cleanObject, useDebounce } from "util/index";

import { User } from "screens/project-list/search-panel";
import { useAsync } from "util/use-async";
import { useEffect } from "react";
import { useHttp } from "util/http";

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();
  // const debouncedParam = useDebounce(param, 200);
  const { run, ...result } = useAsync<User[]>(); // 这里的list 是data 的别名
  useEffect(() => {
    run(client("users", { data: cleanObject(param || {}) }));
  }, [param]);
  return result;
};
