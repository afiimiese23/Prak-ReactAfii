import { MdSpaceDashboard, MdListAlt, MdPeople, MdFastfood, MdLogout } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function Sidebar() {
    const { profile, logout } = useAuth();

    const menuClass = ({ isActive }) =>
        `flex cursor-pointer items-center rounded-xl p-4 space-x-2 transition-all ${
            isActive
                ? "text-hijau bg-green-200 font-extrabold"
                : "text-gray-600 hover:text-hijau hover:bg-green-200 hover:font-extrabold"
        }`;

    return (
        <div id="sidebar" className="flex min-h-screen w-90 flex-col bg-white p-10 shadow-lg">
            <div id="sidebar-logo" className="flex flex-col">
                <span id="logo-title" className="font-poppins text-[48px] text-gray-900">
                    Sedap <b id="logo-dot" className="text-hijau">.</b>
                </span>
                <span id="logo-subtitle" className="font-semibold text-gray-400">Modern Admin Dashboard</span>
            </div>

            <div id="sidebar-menu" className="mt-10">
                <ul id="menu-list" className="space-y-3">
                    <li>
                        <NavLink id="menu-1" to="/" className={menuClass}>
                            <MdSpaceDashboard className="mr-4 text-xl" />
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink id="menu-2" to="/orders" className={menuClass}>
                            <MdListAlt className="mr-4 text-xl" />
                            Orders
                        </NavLink>
                    </li>
                    <li>
                        <NavLink id="menu-3" to="/customers" className={menuClass}>
                            <MdPeople className="mr-4 text-xl" />
                            Customers
                        </NavLink>
                    </li>
                    <li>
                        <NavLink id="menu-4" to="/products" className={menuClass}>
                            <MdFastfood className="mr-4 text-xl" />
                            Products
                        </NavLink>
                    </li>
                </ul>
            </div>

            <div id="sidebar-footer" className="mt-auto">
                <div id="footer-card" className="bg-hijau px-4 py-2 rounded-md shadow-lg mb-10 flex items-center justify-between">
                    <div id="footer-text" className="text-white text-sm">
                        <span className="font-semibold">{profile?.full_name || "Admin"}</span>
                        <div className="text-xs opacity-80">{profile?.role || "admin"}</div>
                    </div>
                    <img id="footer-avatar" className="w-20 rounded-full ml-4" src="https://i.pravatar.cc/100" alt="Avatar" />
                </div>
                <button
                    onClick={logout}
                    className="w-full flex items-center justify-center p-3 bg-red-100 text-red-600 rounded-xl font-semibold hover:bg-red-200 transition-all mb-4"
                >
                    <MdLogout className="mr-2" />
                    Logout
                </button>
                <span id="footer-brand" className="font-bold text-gray-400">Sedap Restaurant Admin Dashboard</span>
                <p id="footer-copyright" className="font-light text-gray-400">&copy; 2026 All Right Reserved</p>
            </div>
        </div>
    );
}
