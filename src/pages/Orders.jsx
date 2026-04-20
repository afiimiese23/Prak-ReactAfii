import { useState } from "react";
import PageHeader from "../components/PageHeader";
import orderData from "../data/Orders.json";

export default function Orders() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-4">
      <PageHeader title="Orders" breadcrumb="Order List">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-hijau text-white px-4 py-2 rounded-lg font-bold hover:bg-green-600 transition-all"
        >
          + Add New Order
        </button>
      </PageHeader>

      {/* MODAL POP UP */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Order</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Order ID</label>
                <input type="text" className="w-full border rounded-xl p-3" placeholder="#ORD-XXX" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Status</label>
                <select className="w-full border rounded-xl p-3 bg-white outline-none">
                  <option>Pending</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 mt-8">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-500 font-medium">Cancel</button>
                <button type="submit" className="bg-hijau text-white px-6 py-2 rounded-xl font-bold">Add Order</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Mapping data JSON tetap berjalan normal di bawah */}
      <div className="mt-6 bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-left">
          <tbody>
            {orderData.map((order) => (
              <tr key={order.id} className="border-t border-gray-50">
                <td className="p-4 font-bold">{order.id}</td>
                <td className="p-4">{order.name}</td>
                <td className="p-4 font-bold text-gray-800">{order.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}