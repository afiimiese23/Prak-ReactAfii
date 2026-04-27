export default function NotFound() {
    return (
        <div className="flex h-screen flex-col items-center justify-center">
            <h1 className="text-9xl font-bold text-gray-200">404</h1>
            <p className="text-2xl font-semibold mt-4">Halaman Tidak Ditemukan</p>
            <p className="text-gray-500 mt-2">Maaf, halaman yang Anda cari tidak tersedia.</p>
            <a href="/" className="mt-6 px-4 py-2 bg-hijau text-white rounded-lg hover:bg-green-600 transition-all">
                Kembali ke Dashboard
            </a>
        </div>
    );
}