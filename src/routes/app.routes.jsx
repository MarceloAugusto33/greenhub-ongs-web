import { AppPage } from "../pages/app";
import { PostPage } from '../pages/postpage';
import { PerfilPage } from '../pages/perfil';
import { Route, Routes } from "react-router-dom";
import { EditarPost } from '../pages/editarpost';
import { DashboardPage } from "../pages/dashboard";
import { Criacaopost } from "../pages/criacaopost";

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<AppPage />}>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/editar" element={<EditarPost />} />
                <Route path="/projects" element={<PostPage />} />
                <Route path="/perfil" element={<PerfilPage />} />
                <Route path="/criacao" element={<Criacaopost />} />
            </Route>
        </Routes>
    )
}