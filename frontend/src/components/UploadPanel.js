import { useState } from "react";
import API from "../services/api";

export default function UploadPanel() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const upload = async () => {
        setLoading(true);

        const formData = new FormData();
        formData.append("file", file);

        await API.post("/upload", formData);

        setTimeout(() => {
            setLoading(false);
            alert("Data Ready!");
        }, 2000);
    };

    return (
        <>
            <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="mb-3 text-sm"
            />

            <button
                onClick={upload}
                className="w-full bg-green-400 text-black py-2 rounded-lg font-semibold hover:bg-green-300"
            >
                Upload 🚀
            </button>

            {/* 🔥 CHEF MODAL */}
            {loading && (
                <div className="fixed inset-0 bg-black/80 flex flex-col items-center justify-center z-50">

                    {/* Chef Animation */}
                    <div className="text-6xl animate-bounce">👨‍🍳</div>

                    <h2 className="text-green-400 mt-4 text-xl">
                        We are curating your data...
                    </h2>

                    <p className="text-gray-400 mt-2">
                        Preparing insights for you 🍲
                    </p>

                </div>
            )}
        </>
    );
}