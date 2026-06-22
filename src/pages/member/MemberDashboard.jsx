import { useAuth } from "@/contexts/AuthContext";
import { profilesAPI } from "@/services/supabaseAPI";

export default function MemberDashboard() {
    const { profile } = useAuth();

    const discountPercent = Math.round(profilesAPI.getDiscount(profile?.tier) * 100);

    const tierColor = {
        Bronze: "bg-orange-100 text-orange-500",
        Silver: "bg-gray-200 text-gray-600",
        Gold: "bg-yellow-100 text-yellow-600",
        Platinum: "bg-purple-100 text-purple-600",
    };

    const tierProgress = {
        Bronze: Math.min((profile?.points || 0) / 500 * 100, 100),
        Silver: Math.min(((profile?.points || 0) - 500) / 500 * 100, 100),
        Gold: Math.min(((profile?.points || 0) - 1000) / 1000 * 100, 100),
        Platinum: Math.min(((profile?.points || 0) - 2000) / 1000 * 100, 100),
    };

    const nextTier = {
        Bronze: "Silver (500 pts)",
        Silver: "Gold (1000 pts)",
        Gold: "Platinum (2000 pts)",
        Platinum: "Max Tier 🎉",
    };

    return (
        <div id="member-dashboard" className="p-4">
            {/* Welcome Section */}
            <div className="mb-6">
                <h1 className="text-3xl font-semibold text-gray-800">
                    Selamat Datang, {profile?.full_name || "Member"}! 👋
                </h1>
                <p className="text-gray-400 mt-1">Berikut ringkasan akun member Anda.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {/* Points Card */}
                <div className="bg-green-100 rounded-lg p-6 flex items-center space-x-4">
                    <div className="bg-hijau rounded-full p-4 text-3xl text-white">
                        ⭐
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-2xl">{profile?.points || 0}</span>
                        <span className="text-gray-500">Total Poin</span>
                    </div>
                </div>

                {/* Tier Card */}
                <div className="bg-blue-100 rounded-lg p-6 flex items-center space-x-4">
                    <div className="bg-blue-500 rounded-full p-4 text-3xl text-white">
                        🏆
                    </div>
                    <div className="flex flex-col">
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${tierColor[profile?.tier] || tierColor.Bronze}`}>
                            {profile?.tier || "Bronze"}
                        </span>
                        <span className="text-gray-500 mt-1">Tier Saat Ini</span>
                    </div>
                </div>

                {/* Discount Card */}
                <div className="bg-yellow-100 rounded-lg p-6 flex items-center space-x-4">
                    <div className="bg-yellow-500 rounded-full p-4 text-3xl text-white">
                        🎁
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-2xl">{discountPercent}%</span>
                        <span className="text-gray-500">Diskon Anda</span>
                    </div>
                </div>
            </div>

            {/* Tier Progress */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Progress Tier</h2>
                <div className="mb-2 flex justify-between text-sm">
                    <span className="text-gray-500">
                        {profile?.tier === "Platinum" ? "Anda sudah di tier tertinggi!" : `Menuju ${nextTier[profile?.tier]}`}
                    </span>
                    <span className="font-bold text-gray-700">{profile?.points || 0} pts</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                        className="bg-hijau h-3 rounded-full transition-all duration-500"
                        style={{ width: `${Math.max(tierProgress[profile?.tier] || 0, 5)}%` }}
                    />
                </div>

                {/* Tier Info */}
                <div className="grid grid-cols-4 gap-4 mt-8">
                    {[
                        { name: "Bronze", range: "0-499", discount: "5%" },
                        { name: "Silver", range: "500-999", discount: "10%" },
                        { name: "Gold", range: "1000-1999", discount: "15%" },
                        { name: "Platinum", range: "2000+", discount: "20%" },
                    ].map((t) => (
                        <div key={t.name} className={`p-4 rounded-xl text-center ${
                            profile?.tier === t.name ? "bg-green-100 border-2 border-hijau" : "bg-gray-50"
                        }`}>
                            <p className={`font-bold ${profile?.tier === t.name ? "text-hijau" : "text-gray-600"}`}>{t.name}</p>
                            <p className="text-xs text-gray-400">{t.range} pts</p>
                            <p className="text-sm font-semibold mt-1">Diskon {t.discount}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
