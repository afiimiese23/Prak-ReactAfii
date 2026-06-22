import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import { profilesAPI } from "@/services/supabaseAPI";

export default function CustomerDetail() {
    const { id } = useParams();
    const [cust, setCust] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => { loadCustomer(); }, [id]);

    const loadCustomer = async () => {
        try {
            const data = await profilesAPI.fetchById(id);
            setCust(data);
        } catch (err) { console.error("Gagal memuat detail member:", err); }
        finally { setLoading(false); }
    };

    if (loading) return (
        <div className="p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-2"></div>
            <p className="text-center text-gray-500">Memuat data...</p>
        </div>
    );

    return (
        <div className="p-4">
            <PageHeader title="Customer Detail" breadcrumb={["Customers", cust?.full_name || "Not Found"]} />
            <div className="bg-white rounded-2xl shadow-sm p-8">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <img src={`https://i.pravatar.cc/150?u=${cust?.id}`} alt={cust?.full_name} className="w-32 h-32 rounded-full object-cover border-4 border-green-100" />
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl font-bold text-gray-800">{cust?.full_name || "Member Tidak Ditemukan"}</h1>
                        <p className="text-gray-400 mt-1">{cust?.email || "-"}</p>
                        {cust && (
                            <span className={`inline-block mt-4 px-4 py-2 rounded-full text-sm font-semibold ${
                                cust.tier === "Platinum" ? "bg-purple-100 text-purple-600" :
                                cust.tier === "Gold" ? "bg-yellow-100 text-yellow-600" :
                                cust.tier === "Silver" ? "bg-gray-200 text-gray-600" : "bg-orange-100 text-orange-500"
                            }`}>{cust.tier} Member • {cust.points} Poin</span>
                        )}
                    </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6 mt-10">
                    <div className="bg-gray-50 p-5 rounded-xl">
                        <p className="text-sm text-gray-400 mb-1">Email Address</p>
                        <h3 className="font-semibold text-gray-700">{cust?.email || "-"}</h3>
                    </div>
                    <div className="bg-gray-50 p-5 rounded-xl">
                        <p className="text-sm text-gray-400 mb-1">Role</p>
                        <h3 className="font-semibold text-gray-700 capitalize">{cust?.role || "-"}</h3>
                    </div>
                    <div className="bg-gray-50 p-5 rounded-xl">
                        <p className="text-sm text-gray-400 mb-1">Total Poin</p>
                        <h3 className="font-semibold text-hijau">{cust?.points ?? 0} Poin</h3>
                    </div>
                    <div className="bg-gray-50 p-5 rounded-xl">
                        <p className="text-sm text-gray-400 mb-1">Member Tier</p>
                        <h3 className="font-semibold text-gray-700">
                            {cust?.tier || "Bronze"} ({cust?.tier === "Platinum" ? "20%" : cust?.tier === "Gold" ? "15%" : cust?.tier === "Silver" ? "10%" : "5%"} Diskon)
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
}
