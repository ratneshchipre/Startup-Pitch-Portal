// src/layouts/DashboardLayout.jsx
import Dashboard from "../pages/Dashboard";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-nav-white">
            <Dashboard />
            <main className="flex-grow">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;
