import React from 'react';
import FmoLogo from '../../../assets/images/png/logo-min.png';
import './MenuTop.scss';
import { Button } from 'antd';
import { MenuOutlined, PoweroffOutlined } from '@ant-design/icons';
import { logout } from '../../../api/auth';

export default function menuTop(props) {
    const { menuCollapsed, setMenuCollapsed } = props;

    const logoutUser = () => {
        logout();
        window.location.reload();
    };

    return (
        <div className="menu_top">
            <div className="menu_top__left">
                <img
                    className="menu_top__left-logo"
                    src={FmoLogo}
                    alt="Grupo Ferremayoristas del Bajío"
                />
                <Button type="link" onClick={() => setMenuCollapsed(!menuCollapsed)}>
                    <MenuOutlined />
                </Button>
            </div>
            <div className="menu_top__right">
                <Button type="link" onClick={logoutUser}>
                    <PoweroffOutlined />
                </Button>
            </div>
        </div>
    );
}