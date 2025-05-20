import { useLocation, useNavigate } from 'react-router-dom';

const PatientHistory = () => {
    const navigate = useNavigate();
    const { state } = useLocation();

    // Default data if not passed via state
    const patient = [
        {
            id: 1,
            date: '2025-03-05',
            name: 'Abdur Rahman',
            phone: '01815-121325',
        },
        {
            id: 2,
            date: '2025-03-05',
            name: 'Abdur Rahman',
            phone: '01815-121325',
        },
        {
            id: 3,
            date: '2025-03-05',
            name: 'Abdur Rahman',
            phone: '01815-121325',
        },
    ];
    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <div className="max-w-[1200px] mx-auto my-6">
            <div className="bg-white rounded-lg p-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Patient Records</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300">
                        <thead>
                            <tr className="bg-gray-900 text-white">
                                <th className="border border-gray-300 px-4 py-2 text-sm font-medium">SL</th>
                                <th className="border border-gray-300 px-4 py-2 text-sm font-medium">Date</th>
                                <th className="border border-gray-300 px-4 py-2 text-sm font-medium">Name</th>
                                <th className="border border-gray-300 px-4 py-2 text-sm font-medium">Phone</th>
                                <th className="border border-gray-300 px-4 py-2 text-sm font-medium">View Report</th>
                                <th className="border border-gray-300 px-4 py-2 text-sm font-medium">View Prescription</th>
                            </tr>
                        </thead>
                        <tbody>
                            {patient.map((patient, index) => (
                                <tr key={patient.id} className="border border-gray-300">
                                    <td className="border border-gray-300 px-4 py-2 text-sm text-center">{index + 1}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-sm text-center">{formatDate(patient.date)}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-sm text-center">{patient.name}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-sm text-center">{patient.phone}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-sm text-center">
                                        <button
                                            onClick={() => navigate(`/patientreport`)}
                                            className="cursor-pointer px-3 py-1 bg-gray-700 hover:bg-blue-900 text-white rounded-md text-sm font-medium flex items-center mx-auto"
                                        >
                                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            View
                                        </button>
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-sm text-center">
                                        <button
                                            onClick={() => navigate(`/prescriptionview`)}
                                            className="cursor-pointer px-3 py-1 bg-green-600 hover:bg-blue-900 text-white rounded-md text-sm font-medium flex items-center mx-auto"
                                        >
                                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {patient.length === 0 && (
                    <div className="text-center py-12">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No patients found</h3>
                        <p className="mt-1 text-sm text-gray-500">Try adjusting your search filters</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PatientHistory;