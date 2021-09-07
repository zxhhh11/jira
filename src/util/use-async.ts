import { useState } from "react";

interface State<D> {
  error: Error | null;
  data: D | null;
  status: "idle" | "loading" | "error" | "success";
}

const defaultInitialState: State<null> = {
  status: "idle",
  data: null,
  error: null,
};
const defaultConfig = {
  throwNewError: false,
};
export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  });
  const config = { ...defaultConfig, ...initialConfig };
  const setData = (data: D) =>
    setState({
      data,
      status: "success",
      error: null,
    });
  const setError = (error: Error) =>
    setState({
      error,
      status: "error",
      data: null,
    });
  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new Error("请传入 Promise 类型数据");
    }

    setState({ ...state, status: "loading" });

    return promise
      .then((data) => {
        setData(data);
        return data;
      })
      .catch((error) => {
        // .catch 这里会消化异常，如果不主动抛出，外面是接受不到异常的
        setError(error);
        console.log(
          config.throwNewError,
          "config.throwNewError",
          initialConfig
        );
        if (config.throwNewError) {
          return Promise.reject(error);
        } else {
          return error;
        }
      });
  };

  return {
    isIdle: state.status === "idle",
    isLoading: state.status === "loading",
    isError: state.status === "error",
    isSuccess: state.status === "success",
    run,
    setData,
    setError,
    ...state,
  };
};
