import frameworkData from "./framework.json";

export default function FrameworkList() {
    return (
        <div className="p-8 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                🚀 Framework List
            </h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {frameworkData.map((item) => (
                    <div
                        key={item.id}
                        className="group border border-gray-200 p-5 rounded-2xl 
                        bg-white shadow-md hover:shadow-2xl 
                        hover:-translate-y-2 transition-all duration-300"
                    >
                        {/* Title */}
                        <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition">
                            {item.name}
                        </h2>

                        {/* Description */}
                        <p className="text-gray-600 mt-2 text-sm">
                            {item.description}
                        </p>

                        {/* Developer */}
                        <p className="text-sm mt-3 text-red-500 font-medium">
                            👨‍💻 {item.details.developer}
                        </p>

                        {/* Website Button */}
                        <a
                            href={item.details.officialWebsite}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-block mt-3 px-4 py-2 
                            bg-blue-500 text-white text-sm rounded-lg 
                            hover:bg-blue-600 hover:scale-105 
                            transition-all duration-200"
                        >
                            Visit Website
                        </a>

                        {/* Tags */}
                        <div className="mt-4 flex flex-wrap">
                            {item.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="bg-gray-100 text-gray-700 
                                    px-3 py-1 text-xs rounded-full mr-2 mb-2
                                    hover:bg-blue-500 hover:text-white 
                                    hover:scale-110 transition-all duration-200 cursor-pointer"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}