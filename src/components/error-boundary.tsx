import React, { ReactNode } from "react";

// react 官方有自己定义的错误边界的用法 我们这里参考官方方法做了简单封装
type FallBackRender = (props: { error: Error | null }) => React.ReactElement;

//children:ReactNode  如果正常定义children
export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallbackRender: FallBackRender }>,
  { error: Error | null }
> {
  state = { error: null };

  //当子组件发生异常，这里就会接收到并调用
  static getDerivedStateFromError(error: Error) {
    return { error }; //{error} 这个值会被赋值给上面的 state
  }

  render() {
    const { error } = this.state;
    const { fallbackRender, children } = this.props;

    if (error) {
      return fallbackRender({ error });
    }
    return children;
  }
}

// 但是这个并不会处理 在事件处理中报出来的异常并不会，比如 一个按钮 点击事件出发后抛出异常这种不会处理

// 但是当页面渲染过程中发生的异常 这个组件会拦截处理

// https://github.com/bavughn/react-error-boundry  react 官方的错误边界使用方法 如果需求不复杂 可以用我们自己的

// 如果需求复杂推荐官方的
