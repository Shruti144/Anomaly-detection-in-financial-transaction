import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Card, CardContent } from "@/components/ui/card";

const COLORS = ["#FF6384", "#36A2EB"];

export default function LiveFraudDetection() {
  const [data, setData] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [flaggedTransactions, setFlaggedTransactions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confusionMatrix, setConfusionMatrix] = useState({ TP: 0, FP: 0, TN: 0, FN: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Using mock fraud data...");
        
        // Simulating API response with random data
        const result = {
          fraudulent: Math.floor(Math.random() * 100),
          legitimate: Math.floor(Math.random() * 100),
        };

        setData([
          { name: "Fraudulent", value: result.fraudulent },
          { name: "Legitimate", value: result.legitimate },
        ]);

        // Simulating transaction data
        const mockTransactions = Array.from({ length: 5 }, (_, i) => {
          const isFraudulent = Math.random() > 0.5;
          return {
            id: TXN${1000 + i},
            amount: (Math.random() * 1000).toFixed(2),
            status: isFraudulent ? "Fraudulent" : "Legitimate",
            action: isFraudulent ? "Flag" : "Allow",
          };
        });

        setTransactions(mockTransactions);
        
        // Flag transactions predicted as fraudulent
        const flagged = mockTransactions.filter(txn => txn.status === "Fraudulent");
        setFlaggedTransactions(flagged);

        // Simulating a confusion matrix
        setConfusionMatrix({
          TP: Math.floor(Math.random() * 50),
          FP: Math.floor(Math.random() * 50),
          TN: Math.floor(Math.random() * 50),
          FN: Math.floor(Math.random() * 50),
        });

        setError(null);
      } catch (error) {
        console.error("Error fetching fraud data:", error);
        setError("Failed to fetch fraud data.");
        setData([
          { name: "Fraudulent", value: 0 },
          { name: "Legitimate", value: 0 },
        ]);
        setTransactions([]);
        setFlaggedTransactions([]);
        setConfusionMatrix({ TP: 0, FP: 0, TN: 0, FN: 0 });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="p-4 max-w-md mx-auto">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">Live Fraud Detection</h2>
        {loading && <p className="text-blue-500">Loading data...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <>
            <PieChart width={400} height={300}>
              <Pie
                data={data}
                cx={200}
                cy={150}
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={cell-${index}} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
            <h3 className="text-lg font-bold mt-4">Flagged Transactions</h3>
            {flaggedTransactions.length > 0 ? (
              <table className="w-full border-collapse border border-gray-300 mt-2">
                <thead>
                  <tr>
                    <th className="border p-2">Transaction ID</th>
                    <th className="border p-2">Amount</th>
                    <th className="border p-2">Status</th>
                    <th className="border p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {flaggedTransactions.map((txn) => (
                    <tr key={txn.id}>
                      <td className="border p-2">{txn.id}</td>
                      <td className="border p-2">${txn.amount}</td>
                      <td className="border p-2 text-red-500">{txn.status}</td>
                      <td className="border p-2 text-red-500">{txn.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500">No flagged transactions.</p>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}