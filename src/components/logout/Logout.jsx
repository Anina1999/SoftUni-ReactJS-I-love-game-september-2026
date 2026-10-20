import { Navigate } from "react-router";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";

export default function Logout() {
    const { logout } = useAuth();

    useEffect(() => {
        logout();
    }, [logout]);

    return (
        <Navigate to="/" />
    );
}
