import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../libs/axios";
import { jwtDecode } from "jwt-decode";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [token, setToken] = useState("");
    const [user, setUser] = useState("");
    const [profileImage, setProfileImage] = useState("/fotop1.webp");

    async function loginUser(email, password) {
        try {
            const resposta = await api.post('/login', {
                email: email,
                password: password
            });
            const decoded = jwtDecode(resposta.data.token);

            console.log(decoded);

            if (decoded.type !== "ONG") {
                toast.error("Acesso restrito. Apenas usuários cadastrados como ONG podem acessar.");
                return; 
            }
    

            setUser(decoded);
            setToken(resposta.data.token);
            localStorage.setItem('@greenhubONG:token', resposta.data.token);

            toast.success("Login efetuado com sucesso, seja bem vindo!");
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Erro interno no servidor");
            }
        }
    }

    const decodedToken = (token) => {
        const userData = jwtDecode(token);
        const baseUrl = import.meta.env.VITE_API_URL;
        setProfileImage(`${baseUrl}/${userData.imagePath}`);
        setUser(userData);
    };


    async function registerUser(body) {
        await api.post('/ong', body);
    }

    useEffect(() => {
        const token = localStorage.getItem('@greenhubONG:token');
        if (token) {
            setToken(token);
            decodedToken(token);
        }
    }, []);

    function logout() {
        setToken(null);
        setUser(null);
        localStorage.removeItem('@greenhubONG:token');
    }

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                profileImage,
                loginUser,
                registerUser,
                logout,
                setUser,
                setToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
