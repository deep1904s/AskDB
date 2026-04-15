import { useLocation, useNavigate } from "react-router-dom";

export default function ResultPage() {
    const { state } = useLocation();
    const navigate = useNavigate();

    console.log("STATE:", state);

    if (!state || !state.results) {
        return (
            <div className="p-8 text-center text-gray-400">
                No data available. Please go back and query again.
                <br />
                <button
                    onClick={() => navigate("/")}
                    className="mt-4 bg-green-400 text-black px-4 py-2 rounded-lg"
                >
                    ← Back to Home
                </button>
            </div>
        );
    }

    const data = state.results;

    if (!data || data.length === 0) {
        return (
            <div className="p-8 text-center text-gray-400">
                No results to display 📭
                <br />
                <button
                    onClick={() => navigate("/")}
                    className="mt-4 bg-green-400 text-black px-4 py-2 rounded-lg"
                >
                    ← Back
                </button>
            </div>
        );
    }

    const keys = Object.keys(data[0] || {});

    return (
        <div className="p-8 max-w-6xl mx-auto">

            {/* 🔙 BACK BUTTON */}
            <button
                onClick={() => navigate("/")}
                className="mb-6 bg-green-400 text-black px-4 py-2 rounded-lg hover:scale-105"
            >
                ← Back
            </button>

            {/* Question */}
            <h2 className="text-green-400 text-lg">Your Question</h2>
            <p className="mb-4 text-gray-300">{state.question}</p>

            {/* SQL */}
            <h2 className="text-green-400 text-lg">Generated SQL</h2>
            <pre className="bg-black text-green-400 p-4 rounded-lg mb-6 shadow-lg shadow-green-400/10">
                {state.sql}
            </pre>

            {/* TABLE */}
            <h2 className="text-green-400 text-lg">Results</h2>
            <div className="overflow-x-auto mb-10">
                <table className="table-auto w-full border border-gray-700">
                    <thead>
                        <tr>
                            {keys.map((key) => (
                                <th key={key} className="border px-2 py-1">{key}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, i) => (
                            <tr key={i}>
                                {keys.map((key, j) => (
                                    <td key={j} className="border px-2 py-1">
                                        {row[key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 📊 CHARTS TEMPORARILY DISABLED */}
            {/*
      <div>
        Charts disabled for debugging
      </div>
      */}

        </div>
    );
}