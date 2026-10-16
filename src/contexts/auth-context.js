import { createContext } from "react";

const AuthContext = createContext({
    user: null,
    isAuthenticated: false,
    register() {},
    login() {},
    logout () {},
});

export default AuthContext;
