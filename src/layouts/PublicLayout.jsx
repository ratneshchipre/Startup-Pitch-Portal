// src/layouts/PublicLayout.jsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-nav-white">
            <header><Navbar /></header>
            <main className="flex-grow">
                <Outlet />
            </main>
            <footer><Footer /></footer>
        </div>
    );
};

export default PublicLayout;
