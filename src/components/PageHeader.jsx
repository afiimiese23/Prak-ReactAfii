export default function PageHeader({ title, breadcrumb, children }) {
    return (
        <div id="pageheader-container" className="flex items-center justify-between p-4 mb-6">
            <div id="pageheader-left" className="flex flex-col">
                <h1 id="page-title" className="text-3xl font-semibold text-gray-800">
                    {title}
                </h1>
                <nav id="breadcrumb-links" className="flex items-center font-medium space-x-2 mt-2">
                    <span className="text-gray-400">Dashboard</span>
                    <span className="text-gray-400">/</span>
                    {/* Render breadcrumb jika array, atau string biasa */}
                    <span className="text-hijau">
                        {Array.isArray(breadcrumb) ? breadcrumb.join(" / ") : breadcrumb}
                    </span>
                </nav>
            </div>
            <div id="action-button">
                {children}
            </div>
        </div>
    );
}