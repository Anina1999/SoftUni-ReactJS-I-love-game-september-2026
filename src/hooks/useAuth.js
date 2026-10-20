import { useContext } from "react";
import AuthContext from "../contexts/auth-context";

//read the logged in user and auth actions from AuthContext
export default function useAuth() {
    return useContext(AuthContext);
}
