import { Link } from "react-router-dom";

export default function ErrorPage({ code, title, description, image }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-5">
            <img 
                src={image || "https://illustrations.popsy.co/gray/status-code-404.svg"} 
                alt="Error Illustration" 
                className="w-80 mb-8"
            />
            <h1 className="text-6xl font-bold text-gray-900">{code}</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mt-2">{title}</h2>
            <p className="text-gray-500 mt-4 max-w-md">{description}</p>
            <Link 
                to="/" 
                className="mt-8 bg-hijau text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
            >
                Back to Dashboard
            </Link>
        </div>
    );
}