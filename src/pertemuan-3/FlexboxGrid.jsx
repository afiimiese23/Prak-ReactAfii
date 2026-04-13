export default function FlexboxGrid(){
    return (
        <nav className="flex justify-between bg-gray-800 p-4 text-white hover:bg-red-500">
            <h1 className="text-lg font-bold">MyWebsite</h1>
            <ul className="flex space-x-4">
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contacts</a></li>
            </ul>
        </nav>
    )
}