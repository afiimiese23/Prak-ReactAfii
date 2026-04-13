import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

export default function Dashboard() {
    return (
        <div id="dashboard-container">
            <PageHeader />
            <div id="dashboard-grid" className="p-5 grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div id="dashboard-orders" className="bg-green-200 rounded-lg p-4 flex items-center space-x-4">
                    <div id="orders-icon" className="bg-hijau rounded-full p-4 text-3xl text-white ">
                        <FaShoppingCart />
                    </div>
                    <div id="orders-info" className="flex flex-col">
                        <span id="orders-count" className="font-bold">175</span>
                        <span id="orders-text" className="text-gray-400">Total Orders</span>
                    </div>
                </div>

                <div id="dashboard-delivered" className="bg-blue-100 rounded-lg p-4 flex items-center space-x-4">
                    <div id="delivered-icon" className="bg-blue-500 rounded-full p-4 text-3xl text-white ">
                        <FaTruck />
                    </div>
                    <div id="delivered-info" className="flex flex-col">
                        <span id="delivered-count" className="font-bold">175</span>
                        <span id="delivered-text" className="text-gray-400">Total Delivered</span>
                    </div>
                </div>

                <div id="dashboard-canceled" className="bg-red-100 rounded-lg p-4 flex items-center space-x-4">
                    <div id="canceled-icon" className="bg-red-500 rounded-full p-4 text-3xl text-white">
                        <FaBan />
                    </div>
                    <div id="canceled-info" className="flex flex-col">
                        <span id="canceled-count" className="font-bold">40</span>
                        <span id="canceled-text" className="text-gray-400">Total Canceled</span>
                    </div>
                </div>

                <div id="dashboard-revenue" className="bg-yellow-100 rounded-lg p-4 flex items-center space-x-4">
                    <div id="revenue-icon" className="bg-yellow-500 rounded-full p-4 text-3xl text-white">
                        <FaDollarSign />
                    </div>
                    <div id="revenue-info" className="flex flex-col">
                        <span id="revenue-amount" className="font-bold">Rp.128</span>
                        <span id="revenue-text" className="text-gray-400">Total Revenue</span>
                    </div>
                </div>
            </div>
        </div>
    );
}