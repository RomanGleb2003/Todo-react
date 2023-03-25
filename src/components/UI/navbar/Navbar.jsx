import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import Button from "../button/Button";
import {AuthContext} from "../../../context";

const Navbar = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)

    const logOut = () => {
        setIsAuth(false)
        localStorage.removeItem('auth')
    }
    return (
        <div className="navbar">
            <Button onClick={logOut}>
                Exit
            </Button>
            <div className="navbar_links">
                <Link to="/about">About</Link>
                <Link to="/posts">Posts</Link>
            </div>
        </div>
    );
};

export default Navbar;