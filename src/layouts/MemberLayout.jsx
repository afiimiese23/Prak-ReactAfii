import { NavLink, Outlet } from "react-router-dom";
import { MdSpaceDashboard, MdShoppingCart, MdHistory } from "react-icons/md";
import { useAuth } from "@/contexts/AuthContext";

export default function MemberLayout() {
    const { profile, logout } = useAuth();

    const menuClass = ({ isActive }) =>
        `flex cursor-pointer items-center rounded-xl p-4 space-x-2 transition-all ${
            isActive
                ? "text-hijau bg-green-200 font-extrabold"
                : "text-gray-600 hover:text-hijau hover:bg-green-200 hover:font-extrabold"
        }`;

    return (
        <div id="app-container" className="bg-gray-100 min-h-screen flex">
            <div id="layout-wrapper" className="flex flex-row flex-1">
                {/* Sidebar Member */}
                <div id="sidebar" className="flex min-h-screen w-90 flex-col bg-white p-10 shadow-lg">
                    <div id="sidebar-logo" className="flex flex-col">
                        <span id="logo-title" className="font-poppins text-[48px] text-gray-900">
                            Sedap <b id="logo-dot" className="text-hijau">.</b>
                        </span>
                        <span id="logo-subtitle" className="font-semibold text-gray-400">Member Area</span>
                    </div>

                    {/* Profile Card */}
                    <div className="mt-6 bg-green-50 rounded-xl p-4">
                        <p className="font-bold text-gray-800">{profile?.full_name || "Member"}</p>
                        <p className="text-sm text-gray-500">{profile?.email || ""}</p>
                        <div className="flex items-center gap-2 mt-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                profile?.tier === "Platinum" ? "bg-purple-100 text-purple-600" :
                                profile?.tier === "Gold" ? "bg-yellow-100 text-yellow-600" :
                                profile?.tier === "Silver" ? "bg-gray-200 text-gray-600" :
                                "bg-orange-100 text-orange-500"
                            }`}>
                                {profile?.tier || "Bronze"}
                            </span>
                            <span className="text-sm text-gray-600">{profile?.points || 0} pts</span>
                        </div>
                    </div>

                    <div id="sidebar-menu" className="mt-8">
                        <ul id="menu-list" className="space-y-3">
                            <li>
                                <NavLink to="/member/dashboard" className={menuClass}>
                                    <MdSpaceDashboard className="mr-4 text-xl" />
                                    Dashboard
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/member/order" className={menuClass}>
                                    <MdShoppingCart className="mr-4 text-xl" />
                                    Buat Pesanan
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/member/history" className={menuClass}>
                                    <MdHistory className="mr-4 text-xl" />
                                    Riwayat Pesanan
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    <div id="sidebar-footer" className="mt-auto">
                        <button
                            onClick={logout}
                            className="w-full flex items-center justify-center p-3 bg-red-100 text-red-600 rounded-xl font-semibold hover:bg-red-200 transition-all"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div id="main-content" className="flex-1 p-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
