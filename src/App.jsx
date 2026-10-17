import { Route, Routes, useNavigate } from "react-router"
import Footer from "./components/Footer/Footer"
import Header from "./components/Header/Header"
import Home from "./components/home/Home"
import Catalog from "./components/catalog/Catalog"
import GameDetails from "./components/game-details/GameDetails"
import GameCreate from "./components/game-create/GameCreate"
import Register from "./components/register/Register"
import Login from "./components/login/Login";
import Logout from "./components/logout/Logout";
import GameEdit from "./components/game-edit/GameEdit";
import { authApi } from "./components/api";
import useAuth from "./hooks/useAuth";
import AuthContext from "./contexts/auth-context"

function App() {

    const navigate = useNavigate();

    const { user, setUser, isAuthReady } = useAuth();

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

    const logoutAction = async () => {
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
        logout: logoutAction,
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            <Header isAuthenticated={!!user} />

            <Routes>
                <Route index path="/" element={<Home />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/games/:gameId" element={<GameDetails user={user} />} />
                <Route path="/games/create" element={<GameCreate />} />
                <Route path="/games/:gameId/edit" element={<GameEdit />} />
                <Route path="/register" element={<Register onRegister={register}/>} />
                <Route path="/login" element={<Login onLogin={login}/>} />
                <Route path="/logout" element={<Logout />} />
            </Routes>
            
            <Footer />
        </AuthContext.Provider>

    )
}

export default App
