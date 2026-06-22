import { useState, useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import { productsAPI } from "@/services/supabaseAPI";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [dataForm, setDataForm] = useState({ name: "", category: "Food", price: "", stock: "" });

    useEffect(() => { loadProducts(); }, []);

    const loadProducts = async () => {
        try {
            setLoading(true);
            const data = await productsAPI.fetchAll();
            setProducts(data);
        } catch (err) { setError("Gagal memuat produk."); }
        finally { setLoading(false); }
    };

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setDataForm({ ...dataForm, [name]: value });
    };

    const openAddModal = () => {
        setEditingId(null);
        setDataForm({ name: "", category: "Food", price: "", stock: "" });
        setIsModalOpen(true);
    };

    const openEditModal = (product) => {
        setEditingId(product.id);
        setDataForm({ name: product.name, category: product.category, price: product.price, stock: product.stock });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); setSuccess("");
        const payload = { name: dataForm.name, category: dataForm.category, price: Number(dataForm.price), stock: Number(dataForm.stock) };
        try {
            if (editingId) { await productsAPI.update(editingId, payload); setSuccess("Produk berhasil diupdate!"); }
            else { await productsAPI.create(payload); setSuccess("Produk berhasil ditambahkan!"); }
            setIsModalOpen(false);
            loadProducts();
            setTimeout(() => setSuccess(""), 3000);
        } catch (err) { setError("Gagal menyimpan produk: " + err.message); }
    };

    const handleDelete = async (id) => {
        if (!confirm("Yakin ingin menghapus produk ini?")) return;
        try {
            await productsAPI.remove(id);
            setSuccess("Produk berhasil dihapus!");
            loadProducts();
            setTimeout(() => setSuccess(""), 3000);
        } catch (err) { setError("Gagal menghapus produk: " + err.message); }
    };

    return (
        <div id="products-container" className="p-4">
            <PageHeader title="Products" breadcrumb="Product List">
                <button onClick={openAddModal} className="bg-hijau text-white px-4 py-2 rounded-lg font-bold hover:bg-green-600 transition-all">+ Add New Product</button>
            </PageHeader>

            {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>}
            {success && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm">{success}</div>}

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">{editingId ? "Edit Product" : "Add New Product"}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold mb-1">Product Name</label>
                                <input type="text" name="name" value={dataForm.name} onChange={handleChange} className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-green-200 outline-none" placeholder="Enter product name" required />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1">Category</label>
                                <select name="category" value={dataForm.category} onChange={handleChange} className="w-full border rounded-xl p-3 bg-white outline-none">
                                    <option value="Food">Food</option>
                                    <option value="Beverage">Beverage</option>
                                    <option value="Snack">Snack</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1">Price (Rp)</label>
                                <input type="number" name="price" value={dataForm.price} onChange={handleChange} className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-green-200 outline-none" placeholder="0" required />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1">Stock</label>
                                <input type="number" name="stock" value={dataForm.stock} onChange={handleChange} className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-green-200 outline-none" placeholder="0" required />
                            </div>
                            <div className="flex justify-end space-x-3 mt-8">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-500 font-medium">Cancel</button>
                                <button type="submit" className="bg-hijau text-white px-6 py-2 rounded-xl font-bold">{editingId ? "Update" : "Save Data"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="mt-6 bg-white rounded-xl shadow-sm border overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-gray-500">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-2"></div>Memuat data...
                    </div>
                ) : products.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">Belum ada produk.</div>
                ) : (
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 uppercase text-[10px] text-gray-400 font-bold">
                            <tr><th className="p-4">Nama</th><th className="p-4">Kategori</th><th className="p-4">Harga</th><th className="p-4">Stock</th><th className="p-4">Aksi</th></tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id} className="border-t border-gray-50 hover:bg-gray-50">
                                    <td className="p-4 font-bold text-gray-700">{product.name}</td>
                                    <td className="p-4"><span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-600">{product.category}</span></td>
                                    <td className="p-4 text-hijau font-bold">Rp {Number(product.price).toLocaleString("id-ID")}</td>
                                    <td className="p-4 text-gray-600">{product.stock}</td>
                                    <td className="p-4 flex gap-2">
                                        <button onClick={() => openEditModal(product)} className="bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm font-semibold hover:bg-yellow-600">Edit</button>
                                        <button onClick={() => handleDelete(product.id)} className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-semibold hover:bg-red-600">Hapus</button>
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
