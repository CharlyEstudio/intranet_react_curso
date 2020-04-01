import React, { setState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { HomeOutlined, MenuOutlined } from '@ant-design/icons';

import './MenuSider.scss';

export default function MenuSider(props) {
    const { SubMenu } = Menu;
    const { menuCollapsed, menu } = props;
    const { Sider } = Layout;
    return (
        <Sider className="admin_sider" collapsed={menuCollapsed}>
            <Menu
                mode="vertical"
                defaultSelectedKeys={["men0"]}
            >
                {
                    menu.map((item, index) => (
                        <SubMenu
                            key={'men'+index}
                            title={
                                <span>
                                    <HomeOutlined />
                                    <span className="nav-text">{item.titulo}</span>
                                </span>
                            }
                        >
                            {
                                item.submenu.map((sub, i) => (
                                    <Menu.Item key={'sub'+i}>
                                        <Link to={'/admin/' + sub.url}>
                                            <MenuOutlined />
                                            <span className="nav-text">{sub.titulo}</span>
                                        </Link>
                                    </Menu.Item>
                                ))
                            }
                        </SubMenu>
                    ))
                }
            </Menu>
        </Sider>
    );
}