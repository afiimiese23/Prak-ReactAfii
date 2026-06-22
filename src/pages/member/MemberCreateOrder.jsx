import { useState, useEffect } from "react";
import { productsAPI, ordersAPI, profilesAPI } from "@/services/supabaseAPI";
import { useAuth } from "@/contexts/AuthContext";

export default function MemberCreateOrder() {
    const { user, profile, refreshProfile } = useAuth();
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const data = await productsAPI.fetchAll();
            setProducts(data);
        } catch (err) {
            setError("Gagal memuat produk.");
        }
    };

    const addToCart = (product) => {
        if (product.stock <= 0) return;

        const existing = cart.find((item) => item.product_id === product.id);
        if (existing) {
            if (existing.quantity >= product.stock) return;
            setCart(
                cart.map((item) =>
                    item.product_id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
        } else {
            setCart([
                ...cart,
                {
                    product_id: product.id,
                    name: product.name,
                    price_at_purchase: product.price,
                    quantity: 1,
                    stock: product.stock,
                },
            ]);
        }
    };

    const removeFromCart = (productId) => {
        setCart(cart.filter((item) => item.product_id !== productId));
    };

    const updateQuantity = (productId, newQty) => {
        if (newQty <= 0) {
            removeFromCart(productId);
            return;
        }
        const item = cart.find((i) => i.product_id === productId);
        if (item && newQty <= item.stock) {
            setCart(
                cart.map((i) =>
                    i.product_id === productId ? { ...i, quantity: newQty } : i
                )
            );
        }
    };

    const subtotal = cart.reduce((sum, item) => sum + item.price_at_purchase * item.quantity, 0);
    const discountRate = profilesAPI.getDiscount(profile?.tier);
    const discountAmount = Math.round(subtotal * discountRate);
    const totalPrice = subtotal - discountAmount;
    const pointsToEarn = profilesAPI.calculatePoints(totalPrice);

    const handleSubmit = async () => {
        if (cart.length === 0) {
            setError("Keranjang masih kosong. Pilih produk terlebih dahulu.");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const orderItems = cart.map((item) => ({
                product_id: item.product_id,
                quantity: item.quantity,
                price_at_purchase: item.price_at_purchase,
            }));

            await ordersAPI.create(user.id, orderItems, profile.tier);

            setSuccess(`Pesanan berhasil dibuat! Total: Rp ${totalPrice.toLocaleString("id-ID")} | Poin didapat: ${pointsToEarn}`);
            setCart([]);

            // Refresh profile untuk update poin & tier
            await refreshProfile();

            // Reload products (stock berubah)
            await loadProducts();

            setTimeout(() => setSuccess(""), 5000);
        } catch (err) {
            setError("Gagal membuat pesanan: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4">
            <div className="mb-6">
                <h1 className="text-3xl font-semibold text-gray-800">Buat Pesanan</h1>
                <p className="text-gray-400 mt-1">
                    Pilih produk yang ingin Anda pesan. Diskon{" "}
                    <span className="text-hijau font-bold">{Math.round(discountRate * 100)}%</span>{" "}
                    ({profile?.tier}) otomatis diterapkan.
                </p>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>
            )}
            {success && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm">{success}</div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
                {/* Product List */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Daftar Produk</h2>
                    <div className="space-y-3 max-h-[500px] overflow-y-auto">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-green-50 transition-all"
                            >
                                <div>
                                    <p className="font-semibold text-gray-800">{product.name}</p>
                                    <p className="text-sm text-gray-400">
                                        Rp {Number(product.price).toLocaleString("id-ID")} • Stock: {product.stock}
                                    </p>
                                </div>
                                <button
                                    onClick={() => addToCart(product)}
                                    disabled={product.stock <= 0}
                                    className="bg-hijau text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                                >
                                    + Tambah
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Cart */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                        Keranjang ({cart.length} item)
                    </h2>

                    {cart.length === 0 ? (
                        <p className="text-gray-400 text-center py-8">Keranjang masih kosong</p>
                    ) : (
                        <>
                            <div className="space-y-3 max-h-[300px] overflow-y-auto">
                                {cart.map((item) => (
                                    <div key={item.product_id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                        <div>
                                            <p className="font-semibold text-gray-800 text-sm">{item.name}</p>
                                            <p className="text-xs text-gray-400">
                                                Rp {Number(item.price_at_purchase).toLocaleString("id-ID")} x {item.quantity}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                                                className="w-7 h-7 bg-gray-200 rounded-full text-gray-600 font-bold"
                                            >
                                                -
                                            </button>
                                            <span className="font-bold text-sm w-6 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                                                className="w-7 h-7 bg-gray-200 rounded-full text-gray-600 font-bold"
                                            >
                                                +
                                            </button>
                                            <button
                                                onClick={() => removeFromCart(item.product_id)}
                                                className="text-red-500 text-xs ml-2"
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Summary */}
                            <div className="border-t mt-4 pt-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Subtotal</span>
                                    <span className="font-semibold">Rp {subtotal.toLocaleString("id-ID")}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Diskon ({Math.round(discountRate * 100)}%)</span>
                                    <span className="font-semibold text-red-500">- Rp {discountAmount.toLocaleString("id-ID")}</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold border-t pt-2">
                                    <span>Total</span>
                                    <span className="text-hijau">Rp {totalPrice.toLocaleString("id-ID")}</span>
                                </div>
                                <p className="text-xs text-gray-400 text-right">
                                    Poin yang didapat: +{pointsToEarn} poin
                                </p>
                            </div>

                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="w-full mt-4 bg-hijau text-white py-3 rounded-xl font-bold hover:bg-green-600 disabled:opacity-50 transition-all"
                            >
                                {loading ? "Memproses..." : "Konfirmasi Pesanan"}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
