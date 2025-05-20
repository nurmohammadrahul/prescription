// src/layout/MainLayout.jsx
import Sidebar from "../component/SideBar";
import Header from "../component/Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <div>
            <Sidebar />
            <Header />
            <Outlet />
        </div>
    );
};

export default MainLayout;
