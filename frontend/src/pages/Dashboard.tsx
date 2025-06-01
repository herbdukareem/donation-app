import { useState, useEffect } from "react";
import axios from "axios";
import Preloader from "@/components/ui/preloader";

interface Donor {
  id: string;
  name: string;
  amount: string;
  date: string;
}

const Dashboard: React.FC = () => {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const pageSize = 10;

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const res = await axios.get("http://localhost:8000/donations/paid");
        const data = res.data;

        const mapped: Donor[] = data.map((item: any) => ({
          id: item._id,
          name: item.fullName,
          amount: (item.amount / 100).toLocaleString(),
          date: new Date(item.paidAt).toLocaleDateString(),
        }));

        setDonors(mapped);
      } catch (err) {
        console.error("Failed to fetch donors", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDonors();
  }, []);

  const totalPages = Math.ceil(donors.length / pageSize);
  const pageData = donors.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  if (loading) return <Preloader />;

  return (
    <div className="p-6 bg-gray-50 min-h-full md:h-screen">
      <h1 className="text-3xl font-semibold mb-4 text-center text-gray-800">Donor Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-sm text-gray-500 mb-1">Total Donations</h2>
          <p className="text-2xl font-bold text-gray-800">₦{donors.reduce((sum, d) => sum + Number(d.amount.replace(/,/g, "")), 0).toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-sm text-gray-500 mb-1">Total Donors</h2>
          <p className="text-2xl font-bold text-gray-800">{donors.length}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-sm text-gray-500 mb-1">Avg. Donation</h2>
          <p className="text-2xl font-bold text-gray-800">₦{donors.length ? (donors.reduce((sum, d) => sum + Number(d.amount.replace(/,/g, "")), 0) / donors.length).toFixed(2) : "0.00"}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow overflow-x-auto">
        {donors.length === 0 ? (
          <div className="text-center py-10 text-gray-500 text-sm">No donations found.</div>
        ) : (
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-100 text-gray-700 font-medium">
              <tr>
                <th className="px-6 py-3">#</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {pageData.map((donor, i) => (
                <tr key={donor.id} className="border-b">
                  <td className="px-6 py-4">{(currentPage - 1) * pageSize + i + 1}</td>
                  <td className="px-6 py-4">{donor.name}</td>
                  <td className="px-6 py-4">₦{donor.amount}</td>
                  <td className="px-6 py-4">{donor.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {donors.length > 0 && (
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
      )}
    </div>
  );
};

export default Dashboard;
