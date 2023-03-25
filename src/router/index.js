import Posts from "../pages/Posts";
import About from "../pages/About";
import PostIdPages from "../pages/PostIdPages";
import Login from "../pages/Login";

export const privateRoutes = [
    {path: '/about', element: <About/>},
    {path: '/posts', element: <Posts/>},
    {path: '/posts/:id', element: <PostIdPages/>}
    ]

export const publicRoutes = [
    {path: '/login', element: <Login/>}
]