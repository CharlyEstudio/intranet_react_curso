import React from 'react';
import { Layout, Tabs } from 'antd';
import { Redirect } from 'react-router-dom';
import Logo from '../../../assets/images/png/logo-min.png';
import LoginForm from '../../../components/admin/LoginForm';
import RegisterForm from '../../../components/admin/RegisterForm/';
import { getAccessToken } from '../../../api/auth';

import './SignIn.scss';

export default function SignIn() {
    const { Content } = Layout;
    const { TabPane } = Tabs;

    if (getAccessToken()) {
        return <Redirect to="/admin" />;
    }
    
    return (
        <Layout className="sign_in">
            <Content className="sign_in__content">
                <h1 className="sign_in__content-logo">
                    <img src={Logo} alt="Grupo Ferremayoristas del Bajío" />
                </h1>
                <div className="sign_in__content-tabs">
                    <Tabs type="card">
                        <TabPane tab={<span>Entrar</span>} key="1">
                            <LoginForm />
                        </TabPane>
                        <TabPane tab={<span>Nuevo Usuario</span>} key="2">
                            <RegisterForm />
                        </TabPane>
                    </Tabs>
                </div>
            </Content>
        </Layout>
    );
}