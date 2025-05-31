import { useState } from "react";

interface Donor {
  id: number;
  name: string;
  initiative: "Scholarships" | "Development" | "Research";
  amount: string;
  date: string;
}

const mockData: Donor[] = Array.from({ length: 42 }, (__, i) => ({
  id: i + 1,
  name: `Donor ${i + 1}`,
  initiative: ["Scholarships", "Development", "Research"][i % 3] as Donor["initiative"],
  amount: (1000 + i * 100).toLocaleString(),
  date: new Date(2024, 8, (i % 30) + 1).toLocaleDateString(),
}));

const Dashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;

  const totalPages = Math.ceil(mockData.length / pageSize);
  const pageData = mockData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="p-6 bg-gray-50 min-h-full md:h-screen">
      <h1 className="text-3xl font-semibold mb-4 text-center text-gray-800">Donor Dashboard</h1>

      {/* Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-sm text-gray-500 mb-1">Total Donations</h2>
          <p className="text-2xl font-bold text-gray-800">₦{(mockData.length * 1500).toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-sm text-gray-500 mb-1">Total Donors</h2>
          <p className="text-2xl font-bold text-gray-800">{mockData.length}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-sm text-gray-500 mb-1">Avg. Donation</h2>
          <p className="text-2xl font-bold text-gray-800">₦1,500</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-100 text-gray-700 font-medium">
            <tr>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Initiative</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {pageData.map((donor) => (
              <tr key={donor.id} className="border-b">
                <td className="px-6 py-4">{donor.id}</td>
                <td className="px-6 py-4">{donor.name}</td>
                <td className="px-6 py-4">{donor.initiative}</td>
                <td className="px-6 py-4">₦{donor.amount}</td>
                <td className="px-6 py-4">{donor.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 space-x-2">
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} className="px-3 py-1 rounded-full border text-sm hover:bg-gray-100" type="button">
          Prev
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded-full text-sm border ${currentPage === i + 1 ? "bg-gray-800 text-white" : "hover:bg-gray-100"}`}
            type="button">
            {i + 1}
          </button>
        ))}
        <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} className="px-3 py-1 rounded-full border text-sm hover:bg-gray-100" type="button">
          Next
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
