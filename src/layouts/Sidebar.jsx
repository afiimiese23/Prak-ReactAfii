import { MdSpaceDashboard, MdListAlt, MdPeople, MdFastfood, MdError, MdLock, MdBlock } from "react-icons/md";
import { NavLink } from "react-router-dom"; // Link diganti menjadi NavLink

export default function Sidebar() {
    // Fungsi untuk menentukan class berdasarkan status active
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
                    {/* DASHBOARD */}
                    <li>
                        <NavLink id="menu-1" to="/" className={menuClass}>
                            <MdSpaceDashboard className="mr-4 text-xl" />
                            Dashboard
                        </NavLink>
                    </li>

                    {/* ORDERS */}
                    <li>
                        <NavLink id="menu-2" to="/orders" className={menuClass}>
                            <MdListAlt className="mr-4 text-xl" />
                            Orders
                        </NavLink>
                    </li>

                    {/* CUSTOMERS */}
                    <li>
                        <NavLink id="menu-3" to="/customers" className={menuClass}>
                            <MdPeople className="mr-4 text-xl" />
                            Customers
                        </NavLink>
                    </li>

                    {/* PRODUCTS */}
                    <li>
                        <NavLink id="menu-4" to="/products" className={menuClass}>
                            <MdFastfood className="mr-4 text-xl" />
                            Products
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/error-400" className={menuClass}>
                            <MdError className="mr-4 text-xl text-orange-500" />
                            Error 400
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/error-401" className={menuClass}>
                            <MdLock className="mr-4 text-xl text-red-400" />
                            Error 401
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/error-403" className={menuClass}>
                            <MdBlock className="mr-4 text-xl text-red-600" />
                            Error 403
                        </NavLink>
                    </li>
                </ul>
            </div>

            <div id="sidebar-footer" className="mt-auto">
                <div id="footer-card" className="bg-hijau px-4 py-2 rounded-md shadow-lg mb-10 flex items-center justify-between">
                    <div id="footer-text" className="text-white text-sm">
                        <span>Please organize your menus through button below!</span>
                        <div id="add-menu-button" className="flex justify-center items-center p-2 mt-3 bg-white rounded-md space-x-2 text-black cursor-pointer hover:bg-gray-100">
                            <span> + Add Menus</span>
                        </div>
                    </div>
                    <img id="footer-avatar" className="w-20 rounded-full ml-4" src="https://i.pravatar.cc/100" alt="Avatar" />
                </div>
                <span id="footer-brand" className="font-bold text-gray-400">Furab Restaurant Admin Dashboard</span>
                <p id="footer-copyright" className="font-light text-gray-400">&copy; 2026 All Right Reserved</p>
            </div>
        </div>
    );
}