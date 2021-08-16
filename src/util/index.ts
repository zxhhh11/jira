import { useEffect, useState } from "react";

// 如果一个值存在 或者为0都认为是true
const isFalse = (value: unknown): boolean => (value === 0 ? false : !value); //!!value  是指求value得布尔值
export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";
// 清理对象中得空值
export const cleanObject = (obj: { [key: string]: unknown }) => {
  //obj: object 这种设定 后面 用到result[key]的时候会报错
  const result = { ...obj };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    // if (isFalse(value)) {
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

//自定义hook 组件 相当于componentDidMount
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // TODO: 依赖项里加上callback 会造成无线循环，这个和useCallback和useMemo 有关
    //但是实际上callback 不需要加入到依赖项得数组中  所以接下来我们把下面这行代码的eslint 检查禁用掉就好啦
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

// export const useDebounce=(func,delay)=>{
//     let timeout;
//     return ()=>{  // 闭包  使这个函数运行结束时  timeout 不会被清理掉
//         if(timeout){
//             clearTimeout(timeout)
//         }else{
//             timeout = setTimeout(()=>{
//                 func()
//             },5000)
//         }
//     }

// }

// T 是泛型  即传入的参数是什么类型 返回值debounceValue也是同样类型 或与这个类型相关时可用
//这里函数返回值 没写：T 是因为函数默认已经判断出来了 可以把鼠标移到debounceValue 上方 来查看
export const useDebounce = <T>(value: T, delay?: number) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    console.log("1", debounceValue);
    //每次Value 变化以后 设置一个定时器
    const timeout = setTimeout(() => setDebounceValue(value), delay);
    return () => {
      // 每次在上一个useEffect 处理完成以后再运行
      clearTimeout(timeout);
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, delay]);

  return debounceValue;
};
