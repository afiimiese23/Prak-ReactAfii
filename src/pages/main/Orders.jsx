import { useState, useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import { ordersAPI } from "@/services/supabaseAPI";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => { loadOrders(); }, []);

    const loadOrders = async () => {
        try {
            setLoading(true);
            const data = await ordersAPI.fetchAll();
            setOrders(data);
        } catch (err) { setError("Gagal memuat data pesanan."); }
        finally { setLoading(false); }
    };

    const statusBadge = (status) => {
        const styles = { completed: "bg-green-100 text-green-600", pending: "bg-yellow-100 text-yellow-600", cancelled: "bg-red-100 text-red-600" };
        return <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status] || styles.pending}`}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>;
    };

    return (
        <div className="p-4">
            <PageHeader title="Orders" breadcrumb="All Orders" />
            {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>}
            <div className="mt-6 bg-white rounded-xl shadow-sm border overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-gray-500">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-2"></div>Memuat data...
                    </div>
                ) : orders.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">Belum ada pesanan.</div>
                ) : (
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 uppercase text-[10px] text-gray-400 font-bold">
                            <tr><th className="p-4">No</th><th className="p-4">Tanggal</th><th className="p-4">Member</th><th className="p-4">Total Bayar</th><th className="p-4">Diskon</th><th className="p-4">Poin</th><th className="p-4">Status</th></tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={order.id} className="border-t border-gray-50 hover:bg-gray-50">
                                    <td className="p-4 font-bold text-gray-700">{index + 1}</td>
                                    <td className="p-4 text-gray-600">{new Date(order.created_at).toLocaleDateString("id-ID", { year: "numeric", month: "short", day: "numeric" })}</td>
                                    <td className="p-4">
                                        <p className="font-medium text-gray-800">{order.profiles?.full_name || "-"}</p>
                                        <p className="text-xs text-gray-400">{order.profiles?.email || ""}</p>
                                    </td>
                                    <td className="p-4 font-bold text-hijau">Rp {Number(order.total_price).toLocaleString("id-ID")}</td>
                                    <td className="p-4 text-red-500 font-semibold">- Rp {Number(order.discount_applied).toLocaleString("id-ID")}</td>
                                    <td className="p-4 text-gray-600">+{order.points_earned}</td>
                                    <td className="p-4">{statusBadge(order.status)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
