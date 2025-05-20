import { useState, useEffect } from 'react';
import report1 from "../assets/images/reports/1.png";
import report2 from "../assets/images/reports/2.png";
import expand from "../assets/enlarge-o-svgrepo-com.svg";
import shrink from "../assets/shrink-o-svgrepo-com.svg";

const PatientReport = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const reports = [
        { id: 1, title: "TSH", imageUrl: report1 },
        { id: 2, title: "FT4", imageUrl: report2 },
        { id: 3, title: "TSH", imageUrl: report1 },
        { id: 4, title: "FT4", imageUrl: report2 }
    ];

    const openModal = (index) => {
        setCurrentIndex(index);
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        if (document.fullscreenElement) {
            document.exitFullscreen().catch(err => console.log(err));
        }
        setIsModalOpen(false);
        setIsFullscreen(false);
        document.body.style.overflow = 'auto';
    };

    const toggleFullscreen = () => {
        if (!isFullscreen) {
            document.documentElement.requestFullscreen().catch(err => console.log(err));
        } else {
            document.exitFullscreen().catch(err => console.log(err));
        }
    };

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    const navigate = (direction) => {
        let newIndex = currentIndex + direction;
        if (newIndex < 0) newIndex = reports.length - 1;
        if (newIndex >= reports.length) newIndex = 0;
        setCurrentIndex(newIndex);
    };

    return (
        <div className="max-w-[1200px] mx-auto my-6">
            <div className="bg-white rounded-lg p-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Patient Reports</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {reports.map((report, index) => (
                        <div key={report.id} className="flex flex-col items-center">
                            <div className="w-72 h-72 rounded-lg overflow-hidden mb-2">
                                <img
                                    src={report.imageUrl}
                                    alt={report.title}
                                    className="w-full h-full object-contain p-2 cursor-pointer drop-shadow-xl hover:drop-shadow-2xl"
                                    onClick={() => openModal(index)}
                                />
                            </div>
                            <p className="text-sm font-medium text-gray-700 text-center">{report.title}</p>
                        </div>
                    ))}
                </div>
            </div>

            {isModalOpen && (
                <div className={`fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col ${isFullscreen ? 'p-0' : 'p-4'}`}>
                    <div className={`absolute top-4 right-4 flex space-x-2 z-50 ${isFullscreen ? 'hidden' : ''}`}>
                        <button onClick={toggleFullscreen}>
                            <img src={expand} alt="fullscreen" className="cursor-pointer w-6 h-6 invert" />
                        </button>
                        <button onClick={closeModal}>
                            <svg className="w-6 h-6 cursor-pointer text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    {isFullscreen && (
                        <div className="absolute top-4 right-4 flex space-x-2 z-50">
                            <button onClick={toggleFullscreen}>
                                <img src={shrink} alt="exit fullscreen" className="cursor-pointer w-6 h-6 invert" />
                            </button>
                        </div>
                    )}
                    <button
                        className="absolute cursor-pointer left-4 top-1/2 transform -translate-y-1/2 text-white z-50"
                        onClick={() => navigate(-1)}
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        className="absolute cursor-pointer right-4 top-1/2 transform -translate-y-1/2 text-white z-50"
                        onClick={() => navigate(1)}
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                    <div className="flex-grow flex items-center justify-center overflow-hidden">
                        <div className="flex flex-col items-center max-w-full max-h-full overflow-hidden">
                            <img
                                src={reports[currentIndex].imageUrl}
                                alt={reports[currentIndex].title}
                                className="object-contain max-w-[90vw] max-h-[90vh] scale-animation"
                            />
                            <p className="text-white text-lg mt-4">{reports[currentIndex].title}</p>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
};

export default PatientReport;
