// Layout
import LayoutAdmin from '../layouts/LayoutAdmin';
import LayoutBasic from '../layouts/LayoutBasic';

// Admin Pages
import AdminHome from '../pages/admin';
import AdminSignIn from '../pages/admin/SignIn/';

// Basic Pages
import Home from '../pages/Home';
import Contact from '../pages/Contact';

// Error 404
import Error404 from '../pages/Error404';

const routes = [
    {
        path: "/admin",
        component: LayoutAdmin,
        exact: false,
        routes: [
            {
                path: '/admin',
                component: AdminHome,
                exact: true
            },
            {
                path: '/admin/login',
                component: AdminSignIn,
                exact: true
            },
            // Siempre en la última posición el Error 404
            {
                component: Error404
            }
        ]
    },
    {
        path: "/",
        component: LayoutBasic,
        exact: false,
        routes: [
            {
                path: '/',
                component: Home,
                exact: true
            },
            {
                path: '/contact',
                component: Contact,
                exact: true
            },
            // Siempre en la última posición el Error 404
            {
                component: Error404
            }
        ]
    }
];

export default routes;