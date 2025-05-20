import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openSidebar = () => setIsOpen(true);
    const closeSidebar = () => setIsOpen(false);

    return (
        <>
            <button
                className="text-white cursor-pointer bg-red-700 p-3 m-4 rounded-full fixed bottom-4 left-2 z-50"
                onClick={openSidebar}
            >
                <FaBars size={25} />
            </button>
            <div
                className={`fixed top-0 left-0 h-full bg-black/90 text-gray-300 transition-transform duration-700 z-40 ${isOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"
                    }`}

            >
                <button
                    onClick={closeSidebar}
                    className="absolute cursor-pointer top-4 right-4 font-extrabold text-4xl text-white"
                >
                    <FaTimes size={25} />
                </button>
                <nav className="mt-16 text-lg">
                    <ul className="space-y-2 px-6">
                        <li>
                            <Link
                                to="/addmedicine"
                                className="block py-2 px-4 rounded hover:text-white"
                                onClick={closeSidebar}
                            >
                                Add Medicine
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/patientrecords"
                                className="block py-2 px-4 rounded hover:text-white"
                                onClick={closeSidebar}
                            >
                                Patient All Records
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/login"
                                className="block py-2 px-4 rounded hover:text-red-700"
                                onClick={closeSidebar}
                            >
                                Logout
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default Sidebar;
