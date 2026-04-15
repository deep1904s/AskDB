import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function ChatInput() {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (!input) return;

        setLoading(true);

        const formData = new FormData();
        formData.append("question", input);

        const res = await API.post("/ask", formData);

        setTimeout(() => {
            setLoading(false);
            console.log(res.data);
            navigate("/result", {
                state: {
                    question: input,
                    sql: res.data.sql_query,
                    results: res.data.results,
                },
            });
        }, 2000);
    };

    return (
        <div className="w-full max-w-2xl">

            <div className="flex bg-[#11161c] border border-gray-800 rounded-xl p-2 shadow-lg shadow-green-400/10">

                <input
                    className="flex-1 bg-transparent p-3 outline-none text-white"
                    placeholder="Ask anything about your data..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />

                <button
                    onClick={handleSubmit}
                    className="bg-green-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-green-300"
                >
                    Ask
                </button>

            </div>

            {/* 🔥 Loading Animation */}
            {loading && (
                <div className="fixed inset-0 bg-black/80 flex flex-col items-center justify-center z-50">

                    {/* AI Animation */}
                    <div className="w-16 h-16 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>

                    <h2 className="text-green-400 mt-4 text-xl">
                        AI is analyzing your data...
                    </h2>

                    <p className="text-gray-400 mt-2 animate-pulse">
                        Generating SQL & insights...
                    </p>

                </div>
            )}

        </div>
    );
}