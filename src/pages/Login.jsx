import React, {useContext} from 'react';
import Input from "../components/UI/input/Input";
import Button from "../components/UI/button/Button";
import {AuthContext} from "../context";

const Login = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    const login = (event) => {
        event.preventDefault()
        setIsAuth(true)
        localStorage.setItem('auth', 'true')
    }
    return (
        <div>
            <h1>Page Login</h1>
            <form onSubmit={login}>
                <Input type="text" placeholder="Login"/>
                <Input type="password" placeholder="Password"/>
                <Button>Open</Button>
            </form>
        </div>
    );
};

export default Login;