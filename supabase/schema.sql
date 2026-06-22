-- ============================================================
-- FMI APP - SEDAP RESTAURANT DASHBOARD
-- Supabase SQL DDL + RLS Policies
-- ============================================================

-- ============================================================
-- 1. TABEL: profiles
-- Menyimpan data tambahan user, sinkron dengan auth.users
-- ============================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL DEFAULT '',
    email TEXT NOT NULL DEFAULT '',
    role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('admin', 'member')),
    points INTEGER NOT NULL DEFAULT 0,
    tier TEXT NOT NULL DEFAULT 'Bronze' CHECK (tier IN ('Bronze', 'Silver', 'Gold', 'Platinum')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 2. TABEL: products
-- Katalog produk restoran
-- ============================================================
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'Food',
    price NUMERIC NOT NULL DEFAULT 0,
    stock INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 3. TABEL: orders
-- Data transaksi / pesanan
-- ============================================================
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    total_price NUMERIC NOT NULL DEFAULT 0,
    discount_applied NUMERIC NOT NULL DEFAULT 0,
    points_earned INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'cancelled')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 4. TABEL: order_items
-- Detail item dalam setiap pesanan
-- ============================================================
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id),
    quantity INTEGER NOT NULL DEFAULT 1,
    price_at_purchase NUMERIC NOT NULL DEFAULT 0
);

-- ============================================================
-- 5. AUTO-CREATE PROFILE ON SIGNUP (Trigger)
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, email, role, points, tier)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'role', 'member'),
        0,
        'Bronze'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- 6. ENABLE ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- 7. HELPER FUNCTION: cek role user
-- ============================================================
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================
-- 8. RLS POLICIES: profiles
-- ============================================================
-- SELECT: Admin bisa lihat semua, Member hanya dirinya sendiri
CREATE POLICY "profiles_select_admin"
    ON public.profiles FOR SELECT
    USING (public.is_admin());

CREATE POLICY "profiles_select_own"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

-- UPDATE: Admin bisa update semua (manajemen poin/role), user bisa update dirinya sendiri (nama)
CREATE POLICY "profiles_update_admin"
    ON public.profiles FOR UPDATE
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

CREATE POLICY "profiles_update_own"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- INSERT: Tidak ada (profile dibuat via trigger)
-- DELETE: Hanya admin
CREATE POLICY "profiles_delete_admin"
    ON public.profiles FOR DELETE
    USING (public.is_admin());

-- ============================================================
-- 9. RLS POLICIES: products
-- ============================================================
-- SELECT: Semua authenticated user
CREATE POLICY "products_select_authenticated"
    ON public.products FOR SELECT
    USING (auth.role() = 'authenticated');

-- INSERT: Hanya admin
CREATE POLICY "products_insert_admin"
    ON public.products FOR INSERT
    WITH CHECK (public.is_admin());

-- UPDATE: Hanya admin
CREATE POLICY "products_update_admin"
    ON public.products FOR UPDATE
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- DELETE: Hanya admin
CREATE POLICY "products_delete_admin"
    ON public.products FOR DELETE
    USING (public.is_admin());

-- ============================================================
-- 10. RLS POLICIES: orders
-- ============================================================
-- SELECT: Admin lihat semua, Member lihat miliknya sendiri
CREATE POLICY "orders_select_admin"
    ON public.orders FOR SELECT
    USING (public.is_admin());

CREATE POLICY "orders_select_own"
    ON public.orders FOR SELECT
    USING (auth.uid() = user_id);

-- INSERT: Member bisa buat pesanan sendiri, Admin bisa buat untuk siapa saja
CREATE POLICY "orders_insert_authenticated"
    ON public.orders FOR INSERT
    WITH CHECK (auth.uid() = user_id OR public.is_admin());

-- UPDATE: Admin bisa update status pesanan
CREATE POLICY "orders_update_admin"
    ON public.orders FOR UPDATE
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- ============================================================
-- 11. RLS POLICIES: order_items
-- ============================================================
-- SELECT: Admin lihat semua, Member lihat yang order-nya milik dia
CREATE POLICY "order_items_select_admin"
    ON public.order_items FOR SELECT
    USING (public.is_admin());

CREATE POLICY "order_items_select_own"
    ON public.order_items FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.orders
            WHERE orders.id = order_items.order_id
            AND orders.user_id = auth.uid()
        )
    );

-- INSERT: Authenticated user (member buat pesanan, admin juga bisa)
CREATE POLICY "order_items_insert_authenticated"
    ON public.order_items FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.orders
            WHERE orders.id = order_items.order_id
            AND (orders.user_id = auth.uid() OR public.is_admin())
        )
    );

-- ============================================================
-- 12. SEED DATA: Admin default (opsional - jalankan manual)
-- Ganti email/password sesuai kebutuhan
-- ============================================================
-- Untuk membuat admin pertama, jalankan di Supabase Dashboard:
-- UPDATE public.profiles SET role = 'admin' WHERE email = 'admin@sedap.com';

-- ============================================================
-- 13. SEED DATA: Products (opsional - sample data)
-- ============================================================
INSERT INTO public.products (name, category, price, stock) VALUES
    ('Kopi Susu Gula Aren', 'Beverage', 18000, 50),
    ('Roti Bakar Bandung', 'Food', 15000, 30),
    ('Keripik Singkong Pedas', 'Snack', 12000, 100),
    ('Teh Manis Dingin', 'Beverage', 6000, 200),
    ('Nasi Goreng Spesial', 'Food', 25000, 40),
    ('Mie Instan Goreng', 'Food', 3500, 500),
    ('Air Mineral 600ml', 'Beverage', 4000, 300),
    ('Cokelat Batangan', 'Snack', 15000, 75),
    ('Ayam Goreng Krispi', 'Food', 18000, 60),
    ('Jus Alpukat', 'Beverage', 15000, 25)
ON CONFLICT DO NOTHING;
