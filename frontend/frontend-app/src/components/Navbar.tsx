import { Link } from "../../node_modules/react-router-dom/dist/index"

const Navbar = () => {
    console.log('Navbar')
    return (
        <div className="border p-2 flex justify-between items-center">
            <Link to ="/blogs">
                <p className="text-xl font-bold">Medium</p>
            </Link>
            <Link to = "/publish">
                <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Publish</button>
            </Link>
        </div>
    )
}

export default Navbar