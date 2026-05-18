import { useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import customerData from "../../data/Customers.json";

export default function CustomerDetail() {
  const { id } = useParams();

  // Mencari data customer berdasarkan ID dari URL
  const cust = customerData.find((c) => c.id === id);

  return (
    <div className="p-4">
      <PageHeader
        title="Customer Detail"
        breadcrumb={["Customers", cust?.name || "Not Found"]}
      />

      <div className="bg-white rounded-2xl shadow-sm p-8">
        
        {/* TOP SECTION */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={`https://i.pravatar.cc/150?u=${cust?.id}`}
            alt={cust?.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-green-100"
          />

          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-800">
              {cust?.name || "Customer Tidak Ditemukan"}
            </h1>

            <p className="text-gray-400 mt-1">
              Customer ID: {cust?.id || id}
            </p>

            {cust && (
              <span className={`inline-block mt-4 px-4 py-2 rounded-full text-sm font-semibold ${
                cust.loyalty === "Gold"
                  ? "bg-yellow-100 text-yellow-600"
                  : cust.loyalty === "Silver"
                  ? "bg-gray-200 text-gray-600"
                  : "bg-orange-100 text-orange-500"
              }`}>
                {cust.loyalty} Member
              </span>
            )}
          </div>
        </div>

        {/* DETAILS */}
        <div className="grid md:grid-cols-2 gap-6 mt-10">
          
          {/* EMAIL */}
          <div className="bg-gray-50 p-5 rounded-xl">
            <p className="text-sm text-gray-400 mb-1">Email Address</p>
            <h3 className="font-semibold text-gray-700">
              {cust?.email || "-"}
            </h3>
          </div>

          {/* PHONE */}
          <div className="bg-gray-50 p-5 rounded-xl">
            <p className="text-sm text-gray-400 mb-1">Phone Number</p>
            <h3 className="font-semibold text-gray-700">
              {cust?.phone || "-"}
            </h3>
          </div>

          {/* STATUS */}
          <div className="bg-gray-50 p-5 rounded-xl">
            <p className="text-sm text-gray-400 mb-1">Status</p>
            <h3 className="font-semibold text-hijau">
              Active Customer
            </h3>
          </div>

          {/* TOTAL ORDERS / ADDITIONAL INFO */}
          <div className="bg-gray-50 p-5 rounded-xl">
            <p className="text-sm text-gray-400 mb-1">Customer Type</p>
            <h3 className="font-semibold text-gray-700">
              Regular Member
            </h3>
          </div>

        </div>

      </div>
    </div>
  );
}