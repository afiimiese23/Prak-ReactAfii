import { useState } from "react"; // 1. Import useState
import PageHeader from "../../components/PageHeader";
import customerData from "../../data/Customers.json";

export default function Customers() {
  // 2. Buat state untuk kontrol modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-4">
      <PageHeader title="Customers" breadcrumb="Customer List">
        {/* 3. Pasang fungsi onClick untuk buka modal */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-hijau text-white px-4 py-2 rounded-lg font-bold hover:bg-green-600 transition-all"
        >
          + Add New Customer
        </button>
      </PageHeader>

      {/* 4. Logika Pop-up Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Customer</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Full Name</label>
                <input type="text" className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-green-200 outline-none" placeholder="Enter name" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Email Address</label>
                <input type="email" className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-green-200 outline-none" placeholder="email@example.com" />
              </div>
              <div className="flex justify-end space-x-3 mt-8">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-500 font-medium">Cancel</button>
                <button type="submit" className="bg-hijau text-white px-6 py-2 rounded-xl font-bold">Save Data</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tampilan Tabel Data Tetap Ada Di Sini */}
      <div className="mt-6 bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 uppercase text-[10px] text-gray-400 font-bold">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Loyalty</th>
            </tr>
          </thead>
          <tbody>
            {customerData.map((cust) => (
              <tr key={cust.id} className="border-t border-gray-50">
                <td className="p-4 font-bold text-gray-700">{cust.id}</td>
                <td className="p-4">{cust.name}</td>
                <td className="p-4 text-hijau font-bold">{cust.loyalty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}