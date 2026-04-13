import { useState } from "react";
import frameworkData from "./framework.json";

export default function FrameworkListSearchFilter() {

    /** State **/
    // const [searchTerm, setSearchTerm] = useState("");
    // const [selectedTag, setSelectedTag] = useState("");

	/*Inisialisasi DataForm*/
	const [dataForm, setDataForm] = useState({
		searchTerm: "",
		selectedTag: "",
		/*Tambah state lain beserta default value*/
		});
		
	/*Inisialisasi Handle perubahan nilai input form*/
	const handleChange = (evt) => {
		const { name, value } = evt.target;
		setDataForm({
			...dataForm,
			[name]: value,
		});
	};

    /** Search & Filter **/
    dataForm.searchTerm = dataForm.searchTerm.toLowerCase();

    const filteredFrameworks = frameworkData.filter((framework) => {
        const matchesSearch =
            framework.name.toLowerCase().includes(dataForm.searchTerm) ||
            framework.description.toLowerCase().includes(dataForm.searchTerm) ||
            framework.details.developer.toLowerCase().includes(dataForm.searchTerm);

        const matchesTag = dataForm.selectedTag
            ? framework.tags.includes(dataForm.selectedTag)
            : true;

        return matchesSearch && matchesTag;
    });

    /** Unique Tags **/
    const allTags = [
        ...new Set(
            frameworkData.flatMap((framework) => framework.tags)
        ),
    ];

    return (
        <div className="p-8 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
            
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                🚀 Framework P4
            </h1>

            {/* Search */}
            <input type="text" name="searchTerm" placeholder="Search framework..."
                value={dataForm.searchTerm} onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mb-4"
            />

            {/* Filter */}
            <select name="selectedTag" value={dataForm.selectedTag}
                onChange={handleChange} className="w-full p-2 border border-gray-300 rounded mb-4"
            >
                <option value="">All Tags</option>
                {allTags.map((tag, index) => (
                    <option key={index} value={tag}>
                        {tag}
                    </option>
                ))}
            </select>

            {/* Card */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFrameworks.map((item) => (
                    <div
                        key={item.id}
                        className="group border border-gray-200 p-5 rounded-2xl 
                        bg-white shadow-md hover:shadow-2xl 
                        hover:-translate-y-2 transition-all duration-300"
                    >
                        <h2 className="text-xl font-bold text-gray-800 group-hover:text-pink-300 transition">
                            {item.name}
                        </h2>

                        <p className="text-gray-600 mt-2 text-sm">
                            {item.description}
                        </p>

                        <p className="text-sm mt-3 text-pink-800 font-medium">
                            👨‍💻 {item.details.developer}
                        </p>

                        <a href={item.details.officialWebsite} target="_blank"
                            rel="noreferrer" className="inline-block mt-3 px-4 py-2 
                            bg-pink-500 text-white text-sm rounded-lg 
                            hover:bg-pink-800 hover:scale-105 
                            transition-all duration-200"
                        >
                            Visit Website
                        </a>

                        <div className="mt-4 flex flex-wrap">
                            {item.tags.map((tag, index) => (
                                <span key={index} className="bg-gray-100 text-gray-700 
                                    px-3 py-1 text-xs rounded-full mr-2 mb-2
                                    hover:bg-pink-800 hover:text-white 
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