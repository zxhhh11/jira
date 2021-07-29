import { useEffect, useState } from "react";

// 如果一个值存在 或者为0都认为是true
const isFalse = (value: unknown): boolean => (value === 0 ? false : !value); //!!value  是指求value得布尔值

// 清理对象中得空值
export const cleanObject = (obj: object) => {
  const result = { ...obj };
  Object.keys(result).forEach((key) => {
    //@ts-ignore
    const value = result[key];
    if (isFalse(value)) {
      //@ts-ignore
      delete result[key];
    }
  });
  return result;
};

//自定义hook 组件 相当于componentDidMount
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
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
  }, [value, delay]);

  return debounceValue;
};
