import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import { Button, Layout, Menu, theme } from "antd";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import AdminCategory from "./AdminCategory";
import AdminProduct from "./AdminProduct";
import AdminUser from "./AdminUser";
import { useCookies } from "react-cookie";
import { useStore } from "../store/zustand";

const { Header, Sider, Content } = Layout;
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const navigate = useNavigate()
  const setIsLogin = useStore((state) => state.setIsLogin);
  return (
    <Layout className="h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: <Link to={"/"}>Category</Link>,
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: <Link to={"/product"}>Product</Link>,
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: <Link to={"/user"}>User</Link>,
            },
            {
              key: "4",
              icon: <LogoutOutlined />,
              label: (
                <button
                  onClick={() => {
                    removeCookie("token", { path: "/" });
                    setIsLogin(false)
                    navigate("/")
                  }}
                >
                  Log out
                </button>
              ),
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Routes>
            <Route path="/" element={<AdminCategory />} />
            <Route path="/product" element={<AdminProduct />} />
            <Route path="/user" element={<AdminUser />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;
