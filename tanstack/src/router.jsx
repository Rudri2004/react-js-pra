import {
    createRootRoute,
    createRoute,
    createRouter
} from "@tanstack/react-router";

import Home from "./pages/home";
import About from "./pages/about";
import Users from "./pages/user";


const rootRoute = createRootRoute();


const homeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: Home
});


const aboutRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/about",
    component: About
});


const usersRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/users",
    component: Users
});


const routeTree = rootRoute.addChildren([
    homeRoute,
    aboutRoute,
    usersRoute
]);


export const router = createRouter({
    routeTree
});