import { supabase } from "@/lib/supabase";

// ============================================================
// PROFILES API
// ============================================================
export const profilesAPI = {
    // Ambil semua member (untuk admin - halaman Customers)
    async fetchAll() {
        const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .order("created_at", { ascending: false });
        if (error) throw error;
        return data;
    },

    // Ambil satu profile by id
    async fetchById(id) {
        const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", id)
            .single();
        if (error) throw error;
        return data;
    },

    // Update poin dan tier member (dipanggil sistem setelah order)
    async updatePointsAndTier(id, newPoints) {
        let tier = "Bronze";
        if (newPoints >= 2000) tier = "Platinum";
        else if (newPoints >= 1000) tier = "Gold";
        else if (newPoints >= 500) tier = "Silver";

        const { data, error } = await supabase
            .from("profiles")
            .update({ points: newPoints, tier })
            .eq("id", id)
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    // Get diskon berdasarkan tier
    getDiscount(tier) {
        const discounts = {
            Bronze: 0.05,
            Silver: 0.10,
            Gold: 0.15,
            Platinum: 0.20,
        };
        return discounts[tier] || 0.05;
    },

    // Hitung poin dari total harga (setiap kelipatan Rp 10.000 = 1 poin)
    calculatePoints(totalPrice) {
        return Math.floor(totalPrice / 10000);
    },
};

// ============================================================
// PRODUCTS API
// ============================================================
export const productsAPI = {
    // Ambil semua produk
    async fetchAll() {
        const { data, error } = await supabase
            .from("products")
            .select("*")
            .order("created_at", { ascending: false });
        if (error) throw error;
        return data;
    },

    // Tambah produk baru (admin only)
    async create(product) {
        const { data, error } = await supabase
            .from("products")
            .insert(product)
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    // Update produk (admin only)
    async update(id, product) {
        const { data, error } = await supabase
            .from("products")
            .update(product)
            .eq("id", id)
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    // Hapus produk (admin only)
    async remove(id) {
        const { error } = await supabase
            .from("products")
            .delete()
            .eq("id", id);
        if (error) throw error;
    },
};

// ============================================================
// ORDERS API
// ============================================================
export const ordersAPI = {
    // Ambil semua pesanan (admin: semua, member: miliknya saja)
    async fetchAll(userId = null) {
        let query = supabase
            .from("orders")
            .select("*, profiles(full_name, email, tier)")
            .order("created_at", { ascending: false });

        if (userId) {
            query = query.eq("user_id", userId);
        }

        const { data, error } = await query;
        if (error) throw error;
        return data;
    },

    // Ambil detail order beserta item-itemnya
    async fetchWithItems(orderId) {
        const { data: order, error: orderError } = await supabase
            .from("orders")
            .select("*, profiles(full_name, email)")
            .eq("id", orderId)
            .single();
        if (orderError) throw orderError;

        const { data: items, error: itemsError } = await supabase
            .from("order_items")
            .select("*, products(name, price)")
            .eq("order_id", orderId);
        if (itemsError) throw itemsError;

        return { ...order, items };
    },

    // Buat pesanan baru (member)
    // items: [{ product_id, quantity, price_at_purchase }]
    async create(userId, items, profileTier) {
        // 1. Hitung subtotal
        const subtotal = items.reduce(
            (sum, item) => sum + item.price_at_purchase * item.quantity,
            0
        );

        // 2. Hitung diskon berdasarkan tier
        const discountRate = profilesAPI.getDiscount(profileTier);
        const discountAmount = Math.round(subtotal * discountRate);
        const totalPrice = subtotal - discountAmount;

        // 3. Hitung poin yang didapat
        const pointsEarned = profilesAPI.calculatePoints(totalPrice);

        // 4. Insert ke tabel orders
        const { data: order, error: orderError } = await supabase
            .from("orders")
            .insert({
                user_id: userId,
                total_price: totalPrice,
                discount_applied: discountAmount,
                points_earned: pointsEarned,
                status: "completed",
            })
            .select()
            .single();
        if (orderError) throw orderError;

        // 5. Insert ke tabel order_items
        const itemsWithOrderId = items.map((item) => ({
            ...item,
            order_id: order.id,
        }));
        const { error: itemsError } = await supabase
            .from("order_items")
            .insert(itemsWithOrderId);
        if (itemsError) throw itemsError;

        // 6. Update poin member
        // Ambil poin saat ini
        const { data: currentProfile } = await supabase
            .from("profiles")
            .select("points")
            .eq("id", userId)
            .single();

        if (currentProfile) {
            await profilesAPI.updatePointsAndTier(
                userId,
                currentProfile.points + pointsEarned
            );
        }

        // 7. Kurangi stock produk
        for (const item of items) {
            const { data: product } = await supabase
                .from("products")
                .select("stock")
                .eq("id", item.product_id)
                .single();

            if (product) {
                await supabase
                    .from("products")
                    .update({ stock: product.stock - item.quantity })
                    .eq("id", item.product_id);
            }
        }

        return order;
    },

    // Hitung agregasi untuk dashboard admin
    async getStats() {
        const { data: orders, error } = await supabase
            .from("orders")
            .select("total_price, status");
        if (error) throw error;

        const totalOrders = orders.length;
        const completed = orders.filter((o) => o.status === "completed").length;
        const cancelled = orders.filter((o) => o.status === "cancelled").length;
        const totalRevenue = orders
            .filter((o) => o.status === "completed")
            .reduce((sum, o) => sum + Number(o.total_price), 0);

        return { totalOrders, completed, cancelled, totalRevenue };
    },
};
