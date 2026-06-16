import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const statCards = [
  { key: "revenue", label: "Revenue", prefix: "TK " },
  { key: "orders", label: "Orders" },
  { key: "products", label: "Products" },
  { key: "vendors", label: "Vendors" },
  { key: "pendingVendors", label: "Pending Vendors" },
  { key: "users", label: "Customers" },
  { key: "reviews", label: "Reviews" },
];

const Home = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "https://cosmetic-backend-e6ia.onrender.com/dashboard-stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setStats(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  return (
    <main className="p-6 bg-gray-50 dark:bg-black dark:text-white min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-500">
            Marketplace performance and pending work.
          </p>
        </div>
        <Link
          to="/VendorList"
          className="bg-black text-white px-4 py-2 rounded">
          Review Vendors
        </Link>
      </div>

      {loading ? (
        <p>Loading dashboard...</p>
      ) : (
        <section className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {statCards.map((card) => (
            <div
              key={card.key}
              className="bg-white dark:bg-zinc-900 border rounded p-5 shadow-sm">
              <p className="text-sm text-gray-500">{card.label}</p>
              <p className="text-3xl font-bold mt-2">
                {card.prefix || ""}
                {stats?.[card.key] ?? 0}
              </p>
            </div>
          ))}
        </section>
      )}
    </main>
  );
};

export default Home;
