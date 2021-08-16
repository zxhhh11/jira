import { Button, Dropdown, Menu } from "antd";
import React, { useState } from "react";

import { DownOutlined } from "@ant-design/icons";
import { ProjectListScreen } from "./screens/project-list";
import { Row } from "components/lib";
// import watermeleon from 'assets/watermeleon.svg';
import { ReactComponent as Watermelon } from "assets/watermelon.svg";
import logo from "assets/3651518.gif";
import styled from "@emotion/styled";
import { useAuth } from "context/auth-context";

export const AuthenticatedApp = () => {
  const { logout, user } = useAuth();
  const menu = (
    <Menu>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      </Menu.Item>
      {/* <Menu.Item icon={<DownOutlined />} disabled>
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          2nd menu item (disabled)
        </a>
      </Menu.Item> */}
      <Menu.Item disabled>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd menu item (disabled)
        </a>
      </Menu.Item>
      <Menu.Item danger>a danger item</Menu.Item>
    </Menu>
  );
  return (
    <Container>
      <PageHeader between={true}>
        <HeaderLeft gap={true}>
          <Watermelon width="8rem" color="rgb(38,132,255)"></Watermelon>
          {/* <Img src={watermelon} alt="logo" /> */}
          <h2>项目</h2>
          <h2>用户</h2>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown overlay={menu}>
            <Button type="link" onClick={logout}>
              Hi, {user ? user.name : "huihui"}
            </Button>
          </Dropdown>
        </HeaderRight>
      </PageHeader>
      <Main>
        <ProjectListScreen></ProjectListScreen>
      </Main>
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
const Img = styled.img`
  width: 5rem;
`;
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  /* grid-template-columns: 20rem 1fr 20rem; */
  /* grid-template-areas:
    "header header header"
    "nav main aside"
    "footer footer footer"; */
  height: 100vh;
  /* grid-gap: 10rem; //用来设置块与块之间的间距 */
`;
const PageHeader = styled(Row)`
  /* grid-area: header; */
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  /* z-index:1; */
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;

const Main = styled.main`
  /* grid-area: main; */
`;

// const Nav = styled.nav`
//   grid-area: nav;
// `;
// const Aside = styled.aside`
//   grid-area: aside;
// `;
// const NewFooter = styled.footer`
//   grid-area: footer;
// `;
