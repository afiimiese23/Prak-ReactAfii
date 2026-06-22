import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import { profilesAPI } from "@/services/supabaseAPI";

export default function Customers() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => { loadCustomers(); }, []);

    const loadCustomers = async () => {
        try {
            setLoading(true);
            const data = await profilesAPI.fetchAll();
            setCustomers(data);
        } catch (err) { setError("Gagal memuat data member."); }
        finally { setLoading(false); }
    };

    const tierBadge = (tier) => {
        const styles = { Bronze: "bg-orange-100 text-orange-500", Silver: "bg-gray-200 text-gray-600", Gold: "bg-yellow-100 text-yellow-600", Platinum: "bg-purple-100 text-purple-600" };
        return <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[tier] || styles.Bronze}`}>{tier}</span>;
    };

    return (
        <div className="p-4">
            <PageHeader title="Customers" breadcrumb="Member List" />
            {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>}
            <div className="mt-6 bg-white rounded-xl shadow-sm border overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-gray-500">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-2"></div>
                        Memuat data...
                    </div>
                ) : customers.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">Belum ada data member.</div>
                ) : (
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 uppercase text-[10px] text-gray-400 font-bold">
                            <tr><th className="p-4">Nama</th><th className="p-4">Email</th><th className="p-4">Poin</th><th className="p-4">Tier</th><th className="p-4">Role</th></tr>
                        </thead>
                        <tbody>
                            {customers.map((cust) => (
                                <tr key={cust.id} className="border-t border-gray-50 hover:bg-gray-50">
                                    <td className="p-4">
                                        <Link to={`/customers/${cust.id}`} className="text-hijau hover:underline font-medium">{cust.full_name || "-"}</Link>
                                    </td>
                                    <td className="p-4 text-gray-600">{cust.email}</td>
                                    <td className="p-4 font-bold text-gray-700">{cust.points}</td>
                                    <td className="p-4">{tierBadge(cust.tier)}</td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${cust.role === "admin" ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"}`}>{cust.role}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
