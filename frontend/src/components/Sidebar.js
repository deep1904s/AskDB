import UploadPanel from "./UploadPanel";
export default function Sidebar({ open, setOpen }) {
    return (
        <>
            {/* Overlay */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`fixed top-0 left-0 h-full w-72 bg-[#0f141a] border-r border-gray-800 p-6 z-50 transform ${open ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300 ease-in-out shadow-xl`}>

                <h2 className="text-green-400 text-lg mb-4">📤 Upload Dataset</h2>

                <UploadPanel />

            </div>
        </>
    );
}