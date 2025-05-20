import { useEffect, useState } from "react";
import img from "../assets/images/dr.png";

const Header = () => {
    const [doctorInfo, setDoctorInfo] = useState(null);

    useEffect(() => {
        fetch("../../public/Doctor.json")
            .then((res) => res.json())
            .then((data) => setDoctorInfo(data))
            .catch((error) => console.error("Failed to fetch doctor info:", error));
    }, []);

    if (!doctorInfo) {
        return <p className="text-center text-white mt-10">Loading doctor info...</p>;
    }

    return (
        <div className="max-w-[1200px] mx-auto my-4 md:my-[50px] lg:mb-2 px-4 sm:px-2">
            <div
                className="flex flex-col sm:flex-row items-center text-white p-5 rounded-lg mb-5"
                style={{
                    background: 'linear-gradient(-45deg, #1a2980, #26d0ce, #2c3e50, #4d62af)',
                    backgroundSize: '400% 400%',
                    animation: 'gradientBG 20s ease infinite'
                }}
            >
                {/* Profile Section - Centered only on mobile */}
                <div className="flex justify-center sm:justify-start w-full sm:flex-1 mb-4 sm:mb-0">
                    <img
                        className="w-[150px] h-[150px] rounded-full border-2 border-white"
                        style={{
                            animation: 'pulseZoom 10s ease-in-out infinite'
                        }}
                        src={img}
                        alt="Doctor Profile"
                    />
                </div>
                <div className="text-center sm:text-left w-full sm:flex-[2] sm:pl-5">
                    <h2 className="text-xl md:text-[2.2rem] font-oswald font-bold mb-2 tracking-wider text-shadow-md shadow-black/30 relative
                        after:content-[''] after:absolute after:bottom-[-3px] after:left-1/2 after:-translate-x-1/2 sm:after:left-0 sm:after:translate-x-0 after:w-[72px] after:h-[3px] after:bg-[#c3bfbf] after:shadow-sm">
                        {doctorInfo.doctors[0]?.name}
                    </h2>
                    <p className="text-[1.1rem] font-normal text-white/90">
                        {doctorInfo.doctors[0]?.title}
                    </p>
                </div>

                {/* Embedded CSS for animations */}
                <style >{`
                    @keyframes gradientBG {
                        0% { background-position: 0% 50% }
                        50% { background-position: 100% 50% }
                        100% { background-position: 0% 50% }
                    }
                    @keyframes pulseZoom {
                        0%, 100% { transform: scale(1) }
                        50% { transform: scale(1.1) }
                    }
                `}</style>
            </div>
        </div>
    );
};

export default Header;