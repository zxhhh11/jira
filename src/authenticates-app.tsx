import React, { useState } from "react";

import { Button } from "antd";
import { Footer } from "antd/lib/layout/layout";
import { ProjectListScreen } from "./screens/project-list";
import styled from "@emotion/styled";
import { useAuth } from "context/auth-context";

export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <Container>
      <PageHeader>
        <HeaderLeft>
          <div>logo</div>
          <div>项目</div>
          <div>用户</div>
        </HeaderLeft>
        <HeaderRight>
          <Button type="primary" onClick={logout}>
            登出
          </Button>
        </HeaderRight>
      </PageHeader>
      <Nav>nav</Nav>
      <Main>
        <ProjectListScreen></ProjectListScreen>
      </Main>
      <Aside>aside</Aside>
      <NewFooter>footer</NewFooter>
    </Container>
  );
};

/**Grid 和flex 各自的应用场景
 * 1. 要考虑，是一维布局，还是二维布局
 * 一般来说，一维布局用flex布局，二维布局用grid ( 有横向有竖向的分布时)
 * 2. 是从内容出发还是从布局出发
 * 从内容出发：你先有一组内容（数量一般不固定），然后希望他们均匀的分布在容器中，有内容自己的大小决定占据的空间
 * 从布局出发：先规划网格，然后再把元素往里填充
 * 从内容出发用flex ，从布局出发用Grid
 * **/
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  grid-template-columns: 20rem 1fr 20rem;
  grid-template-areas:
    "header header header"
    "nav main aside"
    "footer footer footer";
  height: 100vh;
  grid-gap: 10rem; //用来设置块与块之间的间距
`;
const PageHeader = styled.header`
  grid-area: header;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;
const HeaderRight = styled.div``;
const Main = styled.main`
  grid-area: main;
`;

const Nav = styled.nav`
  grid-area: nav;
`;
const Aside = styled.aside`
  grid-area: aside;
`;
const NewFooter = styled.footer`
  grid-area: footer;
`;
