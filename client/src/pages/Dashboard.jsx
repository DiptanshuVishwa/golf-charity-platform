import { useEffect, useState } from "react";
import API from "../services/api";

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [newScore, setNewScore] = useState(""); // ✅ FIXED (inside component)

    const fetchUser = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await API.get("/protected", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setUser(res.data.user);
        } catch (err) {
            alert("Not authorized ❌");
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const handleAddScore = async () => {
        try {
            const token = localStorage.getItem("token");

            await API.post(
                "/scores/add",
                { value: Number(newScore) },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Score added ✅");

            setNewScore("");
            fetchUser(); // refresh data
        } catch (err) {
            alert("Error adding score ❌");
        }
    };

    if (!user) return <div className="text-white p-10">Loading...</div>;

    return (
        <div className="bg-black text-white min-h-screen p-6">

            <h1 className="text-3xl font-bold mb-6">
                Welcome, {user.name} 👋
            </h1>

            <div className="grid md:grid-cols-2 gap-6">

                {/* SUBSCRIPTION */}
                <div className="p-6 bg-white/5 backdrop-blur rounded-xl border border-white/10">
                    <h2 className="text-xl font-semibold mb-2">Subscription</h2>
                    <p>Status: {user.isSubscribed ? "Active ✅" : "Inactive ❌"}</p>
                    <p>Plan: {user.plan}</p>
                </div>

                {/* CHARITY */}
                <div className="p-6 bg-white/5 backdrop-blur rounded-xl border border-white/10">
                    <h2 className="text-xl font-semibold mb-2">Charity</h2>
                    {user.charity ? (
                        <>
                            <p>{user.charity.name}</p>
                            <p>{user.charity.percentage}% contribution</p>
                        </>
                    ) : (
                        <p>No charity selected</p>
                    )}
                </div>

                {/* SCORES */}
                <div className="p-6 bg-white/5 backdrop-blur rounded-xl border border-white/10 col-span-2">
                    <h2 className="text-xl font-semibold mb-2">Recent Scores</h2>

                    <div className="mt-6 flex gap-4">
                        <input
                            type="number"
                            placeholder="Enter score"
                            className="p-2 rounded bg-black border border-gray-700"
                            value={newScore}
                            onChange={(e) => setNewScore(e.target.value)}
                        />

                        <button
                            onClick={handleAddScore}
                            className="px-4 py-2 bg-purple-600 rounded"
                        >
                            Add Score
                        </button>
                    </div>

                    <div className="flex gap-4 flex-wrap mt-4">
                        {user.scores.map((s, i) => (
                            <div
                                key={i}
                                className="px-4 py-2 bg-purple-600/20 rounded-lg"
                            >
                                {s.value}
                            </div>
                        ))}
                    </div>

                </div>

            </div>
        </div>
    );
}