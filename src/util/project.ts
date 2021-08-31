import { cleanObject, useDebounce } from "util/index";

import { Project } from "screens/project-list/list";
import { useAsync } from "util/use-async";
import { useEffect } from "react";
import { useHttp } from "util/http";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  // const debouncedParam = useDebounce(param, 200);
  const { run, ...result } = useAsync<Project[]>(); // 这里的list 是data 的别名
  useEffect(() => {
    run(client("projects", { data: cleanObject(param || {}) }));
  }, [param]);
  return result;
};
