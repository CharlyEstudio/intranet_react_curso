import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import MenuTop from '../components/admin/MenuTop';
import MenuSider from '../components/admin/MenuSider';
import AdminSignIn from '../pages/admin/SignIn/';
import useAuth from '../hooks/useAuth';

import './LayoutAdmin.scss';

export default function LayoutAdmin(props) {
    const { routes } = props;
    const [ menuCollapsed, setMenuCollapsed ] = useState(false);
    const { Header, Content, Footer } = Layout;
    const { user, menu, isLoading } = useAuth();

    if (!user && !isLoading) {
        return (
            <>
                <Route path="/admin/login" component={AdminSignIn} />
                <Redirect to="/admin/login" />
            </>
        );
    }

    if (user && !isLoading) {
        return (
            <Layout>
                <MenuSider menuCollapsed={menuCollapsed} menu={menu} />
                <Layout className="layout-admin" style={{marginLeft: menuCollapsed ? '80px' : '200px'}}>
                    <Header className="layout-admin__header">
                        <MenuTop menuCollapsed={menuCollapsed} setMenuCollapsed={setMenuCollapsed} />
                    </Header>
                    <Content className="layout-admin__content">
                        <LoadRoutes routes={routes}/>
                    </Content>
                    <Footer className="layout-admin__footer">
                        Grupo Ferremayoristas del Bajío
                    </Footer>
                </Layout>
            </Layout>
        );
    }

    return null;
}

function LoadRoutes({routes}) {
    return (
        <Switch>
            {
                routes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        component={route.component}
                    />
                ))
            }
        </Switch>
    );
}