import { useEffect, useState } from "react";
import API from "../services/api";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [drawResult, setDrawResult] = useState(null);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(res.data);
    } catch (err) {
      alert("Not authorized ❌");
    }
  };

  const runDraw = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.post(
        "/draw/run",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDrawResult(res.data);
    } catch (err) {
      alert("Draw failed ❌");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen p-6">

      <h1 className="text-3xl font-bold mb-6">Admin Panel 👑</h1>

      {/* USERS */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">All Users</h2>

        <div className="grid gap-4">
          {users.map((u) => (
            <div
              key={u._id}
              className="p-4 bg-white/5 border border-white/10 rounded-lg"
            >
              <p><b>{u.name}</b> ({u.email})</p>
              <p>Plan: {u.plan}</p>
              <p>Role: {u.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* DRAW */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Run Monthly Draw</h2>

        <button
          onClick={runDraw}
          className="px-6 py-3 bg-purple-600 rounded-lg"
        >
          Run Draw 🎲
        </button>

        {drawResult && (
          <div className="mt-6 p-4 bg-white/5 rounded-lg">
            <p>Draw Numbers: {drawResult.drawNumbers.join(", ")}</p>

            <h3 className="mt-4 font-semibold">Winners:</h3>

            {drawResult.results.length === 0 ? (
              <p>No winners</p>
            ) : (
              drawResult.results.map((r, i) => (
                <p key={i}>
                  {r.user} — {r.matches} matches
                </p>
              ))
            )}
          </div>
        )}
      </div>

    </div>
  );
}