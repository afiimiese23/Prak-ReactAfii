import { useState, useEffect } from "react";
import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import PageHeader from "../../components/PageHeader";
import { ordersAPI, productsAPI, profilesAPI } from "@/services/supabaseAPI";

export default function Dashboard() {
    const [stats, setStats] = useState({ totalOrders: 0, completed: 0, cancelled: 0, totalRevenue: 0, totalProducts: 0, totalCustomers: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => { loadStats(); }, []);

    const loadStats = async () => {
        try {
            const [orderStats, products, customers] = await Promise.all([
                ordersAPI.getStats(), productsAPI.fetchAll(), profilesAPI.fetchAll(),
            ]);
            setStats({ ...orderStats, totalProducts: products.length, totalCustomers: customers.length });
        } catch (err) { console.error("Gagal memuat statistik:", err); }
        finally { setLoading(false); }
    };

    const formatRupiah = (num) => {
        if (num >= 1000000) return `Rp ${(num / 1000000).toFixed(1)}jt`;
        if (num >= 1000) return `Rp ${(num / 1000).toFixed(0)}rb`;
        return `Rp ${num}`;
    };

    return (
        <div id="dashboard-container">
            <PageHeader title="Dashboard" breadcrumb="Statistics" buttonText="+ Filter Data" />
            <div id="dashboard-grid" className="p-5 grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div id="dashboard-orders" className="bg-green-200 rounded-lg p-4 flex items-center space-x-4">
                    <div className="bg-hijau rounded-full p-4 text-3xl text-white"><FaShoppingCart /></div>
                    <div className="flex flex-col">
                        <span className="font-bold">{loading ? "..." : stats.totalOrders}</span>
                        <span className="text-gray-400">Total Orders</span>
                    </div>
                </div>
                <div className="bg-blue-100 rounded-lg p-4 flex items-center space-x-4">
                    <div className="bg-blue-500 rounded-full p-4 text-3xl text-white"><FaTruck /></div>
                    <div className="flex flex-col">
                        <span className="font-bold">{loading ? "..." : stats.completed}</span>
                        <span className="text-gray-400">Total Delivered</span>
                    </div>
                </div>
                <div className="bg-red-100 rounded-lg p-4 flex items-center space-x-4">
                    <div className="bg-red-500 rounded-full p-4 text-3xl text-white"><FaBan /></div>
                    <div className="flex flex-col">
                        <span className="font-bold">{loading ? "..." : stats.cancelled}</span>
                        <span className="text-gray-400">Total Canceled</span>
                    </div>
                </div>
                <div className="bg-yellow-100 rounded-lg p-4 flex items-center space-x-4">
                    <div className="bg-yellow-500 rounded-full p-4 text-3xl text-white"><FaDollarSign /></div>
                    <div className="flex flex-col">
                        <span className="font-bold">{loading ? "..." : formatRupiah(stats.totalRevenue)}</span>
                        <span className="text-gray-400">Total Revenue</span>
                    </div>
                </div>
            </div>
            <div className="p-5 grid sm:grid-cols-2 gap-4">
                <div className="bg-purple-100 rounded-lg p-4 flex items-center space-x-4">
                    <div className="bg-purple-500 rounded-full p-4 text-3xl text-white">📦</div>
                    <div className="flex flex-col">
                        <span className="font-bold">{loading ? "..." : stats.totalProducts}</span>
                        <span className="text-gray-400">Total Produk</span>
                    </div>
                </div>
                <div className="bg-indigo-100 rounded-lg p-4 flex items-center space-x-4">
                    <div className="bg-indigo-500 rounded-full p-4 text-3xl text-white">👥</div>
                    <div className="flex flex-col">
                        <span className="font-bold">{loading ? "..." : stats.totalCustomers}</span>
                        <span className="text-gray-400">Total Member</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
