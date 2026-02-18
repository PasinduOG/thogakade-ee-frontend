import { Routes } from '@angular/router';
import { Login } from './page/login/login';
import { Dashboard } from './page/dashboard/dashboard';
import { Customer } from './page/dashboard/customer/customer';
import { Item } from './page/dashboard/item/item';
import { Order } from './page/dashboard/order/order';
import { Overview } from './page/dashboard/overview/overview';

export const routes: Routes = [
    {
        path: "login",
        component: Login
    },
    {
        path: "dashboard",
        component: Dashboard,
        children: [
            {
                path: "",
                component: Overview
            },
            {
                path: "customer",
                component: Customer
            },
            {
                path: "item",
                component: Item
            },
            {
                path: "order",
                component: Order
            }
        ]
    }
];
