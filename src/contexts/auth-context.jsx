import { createContext } from "react";
import { useNavigate } from "react-router";
import { authApi } from "../components/api";
import useAuthState from "../hooks/useAuthState";

const AuthContext = createContext({
    user: null,
    isAuthenticated: false,
    register() {},
    login() {},
    logout () {},
});

export function AuthProvider({ children }) {

    const navigate = useNavigate();

    const { user, setUser, isAuthReady } = useAuthState();

    const register = async (userData) => {
        try {
            const result = await authApi.register(userData);

            setUser(result);

            navigate("/");
        } catch (error) {
            alert(error.message);
        }
    }

    const login = async (userData) => {
        try {
            const result = await authApi.login(userData);

            setUser(result);

            navigate("/");
        } catch (error) {
            alert(error.message);
        }
    }

    const logout = async () => {
        try {
            await authApi.logout();
        } catch (error) {
            alert(error.message);
        }
    }

    //wait until Firebase checks if there is a logged in user
    if (!isAuthReady) {
        return null;
    }

    const authContextValue = {
        user,
        isAuthenticated: !!user,
        register,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
