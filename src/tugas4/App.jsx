import React, { useState } from "react";
import destinationData from "./destinations.json";

export default function DestinationApp() {
  // 1. State untuk mengatur tampilan layar (Guest / Admin)
  const [viewMode, setViewMode] = useState("guest");

  // 2. State brankas untuk Form Pencarian dan Filter (1 Search, 2 Filters)
  const [dataForm, setDataForm] = useState({
    searchTerm: "",
    categoryFilter: "",
    regionFilter: "",
  });

  // Fungsi dinamis untuk mengubah state form
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  // 3. Mengambil opsi unik untuk 2 Select Filters
  const allCategories = [...new Set(destinationData.map((item) => item.category))];
  const allRegions = [...new Set(destinationData.map((item) => item.region))];

  // 4. Logika Filter (Menggabungkan Search, Kategori, dan Region)
  const _searchTerm = dataForm.searchTerm.toLowerCase();
  
  const filteredData = destinationData.filter((item) => {
    // Cari berdasarkan nama atau deskripsi
    const matchesSearch =
      item.name.toLowerCase().includes(_searchTerm) ||
      item.description.toLowerCase().includes(_searchTerm);

    // Cocokkan Filter Kategori (Filter 1)
    const matchesCategory = dataForm.categoryFilter
      ? item.category === dataForm.categoryFilter
      : true;

    // Cocokkan Filter Region (Filter 2)
    const matchesRegion = dataForm.regionFilter
      ? item.region === dataForm.regionFilter
      : true;

    return matchesSearch && matchesCategory && matchesRegion;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header & Toggle Views */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
            Eksplorasi Nusantara 🇮🇩
          </h1>
          <p className="text-slate-600 mb-8">Temukan destinasi wisata terbaik di Indonesia</p>
          
          <div className="inline-flex bg-slate-200 p-1 rounded-lg">
            <button
              onClick={() => setViewMode("guest")}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                viewMode === "guest"
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-slate-600 hover:text-slate-800"
              }`}
            >
              Guest View (Cards)
            </button>
            <button
              onClick={() => setViewMode("admin")}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                viewMode === "admin"
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-slate-600 hover:text-slate-800"
              }`}
            >
              Admin View (Table)
            </button>
          </div>
        </div>

        {/* AREA SEARCH & FILTER (Grid Layout: 1 kolom di HP, 3 kolom di PC) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          {/* Input Search */}
          <input
            type="text"
            name="searchTerm"
            placeholder="Cari wisata atau lokasi..."
            value={dataForm.searchTerm}
            onChange={handleChange}
            className="w-full p-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />

          {/* Filter 1: Kategori */}
          <select
            name="categoryFilter"
            value={dataForm.categoryFilter}
            onChange={handleChange}
            className="w-full p-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 bg-white cursor-pointer"
          >
            <option value="">Semua Kategori</option>
            {allCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>

          {/* Filter 2: Region */}
          <select
            name="regionFilter"
            value={dataForm.regionFilter}
            onChange={handleChange}
            className="w-full p-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 bg-white cursor-pointer"
          >
            <option value="">Semua Wilayah</option>
            {allRegions.map((region, index) => (
              <option key={index} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>

        {/* TAMPILAN KONDISIONAL BERDASARKAN VIEW MODE */}
        
        {/* --- GUEST VIEW (Cards Grid) --- */}
        {viewMode === "guest" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredData.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-slate-200 flex flex-col"
              >
                {/* Gambar */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-indigo-700 text-xs font-bold px-3 py-1 rounded-full shadow">
                    {item.category}
                  </div>
                </div>

                {/* Konten Utama */}
                <div className="p-5 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-slate-800 mb-2 leading-tight">
                    {item.name}
                  </h3>
                  <p className="text-slate-500 text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Atribut Nested Tampil Disini */}
                  <div className="mt-auto space-y-3">
                    <div className="flex items-center text-sm text-slate-600">
                      <span>📍 {item.location.city}, {item.location.province}</span>
                    </div>
                    <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                      <span className="text-xs text-slate-500 font-medium bg-slate-100 px-2 py-1 rounded">
                        {item.region}
                      </span>
                      <span className="font-bold text-indigo-600">
                        Rp{item.pricing.weekend.toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredData.length === 0 && (
              <div className="col-span-full text-center py-10 text-slate-500">
                Wisata tidak ditemukan. Coba kata kunci atau filter lain.
              </div>
            )}
          </div>
        )}

        {/* --- ADMIN VIEW (Table) --- */}
        {viewMode === "admin" && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Wrapper table untuk responsive scroll horizontal di HP */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-600 text-sm uppercase tracking-wider">
                    <th className="p-4 border-b">ID</th>
                    <th className="p-4 border-b">Nama Destinasi</th>
                    <th className="p-4 border-b">Kategori & Wilayah</th>
                    <th className="p-4 border-b">Lokasi (Nested)</th>
                    <th className="p-4 border-b">Harga Weekend (Nested)</th>
                    <th className="p-4 border-b">Fasilitas (Nested)</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-700">
                  {filteredData.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 border-b last:border-0 transition-colors">
                      <td className="p-4 font-medium text-slate-500">#{item.id}</td>
                      <td className="p-4">
                        <div className="font-bold text-slate-800">{item.name}</div>
                      </td>
                      <td className="p-4">
                        <span className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded text-xs font-semibold mr-2">
                          {item.category}
                        </span>
                        <span className="text-slate-500 text-xs">{item.region}</span>
                      </td>
                      <td className="p-4">
                        {item.location.city}, <br/>
                        <span className="text-slate-400">{item.location.province}</span>
                      </td>
                      <td className="p-4 font-mono text-indigo-600 font-medium">
                        Rp{item.pricing.weekend.toLocaleString("id-ID")}
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {item.facilities.slice(0, 2).map((fac, i) => (
                            <span key={i} className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px]">
                              {fac}
                            </span>
                          ))}
                          {item.facilities.length > 2 && (
                            <span className="text-xs text-slate-400">+{item.facilities.length - 2}</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  
                  {filteredData.length === 0 && (
                    <tr>
                      <td colSpan="6" className="p-8 text-center text-slate-500">
                        Data tidak ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}