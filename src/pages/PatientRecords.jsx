import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PatientRecords = () => {
    const navigate = useNavigate();

    const initialPatients = [
        {
            id: 1,
            patientId: '10001',
            date: '2025-03-05',
            name: 'Abdur Rahman',
            phone: '01815-121325',
            age: '35',
            gender: 'Male'
        },
        {
            id: 2,
            patientId: '10002',
            date: '2024-09-10',
            name: 'Zahid Hasan',
            phone: '01710-987654',
            age: '42',
            gender: 'Male'
        },
        {
            id: 3,
            patientId: '10003',
            date: '2024-03-05',
            name: 'Utpol Nondi',
            phone: '01911-112233',
            age: '28',
            gender: 'Male'
        }
    ];

    const [patients, setPatients] = useState(initialPatients);
    const [filters, setFilters] = useState({
        patientId: '',
        name: '',
        phone: '',
        startDate: '',
        endDate: ''
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const filterPatients = () => {
        return initialPatients.filter(patient => {
            const matchesId = !filters.patientId || patient.patientId.includes(filters.patientId);
            const matchesName = !filters.name || patient.name.toLowerCase().includes(filters.name.toLowerCase());
            const matchesPhone = !filters.phone || patient.phone.includes(filters.phone);

            let matchesDate = true;
            if (filters.startDate || filters.endDate) {
                const patientDate = new Date(patient.date);
                const startDate = filters.startDate ? new Date(filters.startDate) : null;
                const endDate = filters.endDate ? new Date(filters.endDate) : null;

                if (startDate && patientDate < startDate) matchesDate = false;
                if (endDate && patientDate > endDate) matchesDate = false;
            }

            return matchesId && matchesName && matchesPhone && matchesDate;
        });
    };

    const handleSearch = () => {
        const filteredPatients = filterPatients();
        setPatients(filteredPatients);
    };

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <div className="max-w-[1200px] mx-auto my-6">
            <div className="bg-white rounded-lg p-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Patient Records</h2>

                <div className="flex flex-col lg:flex-row lg:items-end gap-3 mb-4">
                    <div className="flex-1">
                        <label htmlFor="searchId" className="block text-sm font-medium text-gray-700 mb-1">Patient ID</label>
                        <input
                            type="text"
                            id="searchId"
                            name="patientId"
                            className="w-full p-2 bg-white rounded border outline-none border-black/10 focus:ring-1 focus:ring-offset-2 focus:border-blue-300 focus:ring-offset-blue-300 focus:ring-blue-300"
                            placeholder="Patient ID"
                            value={filters.patientId}
                            onChange={handleFilterChange}
                            list="patientIdList"
                        />
                        <datalist id="patientIdList">
                            <option value="10001" />
                            <option value="10002" />
                            <option value="10003" />
                        </datalist>
                    </div>
                    <div className="flex-1">
                        <label htmlFor="searchName" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            id="searchName"
                            name="name"
                            className="w-full p-2 bg-white rounded border outline-none border-black/10 focus:ring-1 focus:ring-offset-2 focus:border-blue-300 focus:ring-offset-blue-300 focus:ring-blue-300"
                            placeholder="Patient Name"
                            value={filters.name}
                            onChange={handleFilterChange}
                            list="patientNameList"
                        />
                        <datalist id="patientNameList">
                            <option value="Abdur Rahman" />
                            <option value="Zahid Hasan" />
                            <option value="Utpol Nondi" />
                        </datalist>
                    </div>
                    <div className="flex-1">
                        <label htmlFor="searchPhone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input
                            type="text"
                            id="searchPhone"
                            name="phone"
                            className="w-full p-2 bg-white rounded border outline-none border-black/10 focus:ring-1 focus:ring-offset-2 focus:border-blue-300 focus:ring-offset-blue-300 focus:ring-blue-300"
                            placeholder="Phone Number"
                            value={filters.phone}
                            onChange={handleFilterChange}
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
                        <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            className="w-full p-2 bg-white rounded border outline-none border-black/10 focus:ring-1 focus:ring-offset-2 focus:border-blue-300 focus:ring-offset-blue-300 focus:ring-blue-300"
                            value={filters.startDate}
                            onChange={handleFilterChange}
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                        <input
                            type="date"
                            id="endDate"
                            name="endDate"
                            className="w-full p-2 bg-white rounded border outline-none border-black/10 focus:ring-1 focus:ring-offset-2 focus:border-blue-300 focus:ring-offset-blue-300 focus:ring-blue-300"
                            value={filters.endDate}
                            onChange={handleFilterChange}
                        />
                    </div>
                    <div className="flex items-end">
                        <button
                            onClick={handleSearch}
                            className="cursor-pointer w-full lg:w-auto px-4 py-2 h-[42px] border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 flex items-center justify-center"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            Search
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300">
                        <thead>
                            <tr className="bg-gray-900 text-white">
                                <th className="border border-gray-300 px-4 py-2 text-sm font-medium">SL</th>
                                <th className="border border-gray-300 px-4 py-2 text-sm font-medium">Patient ID</th>
                                <th className="border border-gray-300 px-4 py-2 text-sm font-medium">Date</th>
                                <th className="border border-gray-300 px-4 py-2 text-sm font-medium">Name</th>
                                <th className="border border-gray-300 px-4 py-2 text-sm font-medium">Phone</th>
                                <th className="border border-gray-300 px-4 py-2 text-sm font-medium">Age</th>
                                <th className="border border-gray-300 px-4 py-2 text-sm font-medium">Gender</th>
                                <th className="border border-gray-300 px-4 py-2 text-sm font-medium">View</th>
                                <th className="border border-gray-300 px-4 py-2 text-sm font-medium">View Prescription</th>
                            </tr>
                        </thead>
                        <tbody>
                            {patients.map((patient, index) => (
                                <tr key={patient.id} className="border border-gray-300">
                                    <td className="border border-gray-300 px-4 py-2 text-sm text-center">{index + 1}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-sm text-center">{patient.patientId}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-sm text-center">{formatDate(patient.date)}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-sm text-center">{patient.name}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-sm text-center">{patient.phone}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-sm text-center">{patient.age}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-sm text-center">{patient.gender}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-sm text-center">
                                        <button
                                            onClick={() => navigate(`/patienthistory`)}
                                            className="cursor-pointer px-3 py-1 bg-cyan-500 text-white rounded-md text-sm font-medium flex items-center mx-auto"
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
                                            onClick={() => navigate(`/prescriptionpdfview`)}
                                            className="cursor-pointer px-3 py-1 bg-green-600 text-white rounded-md text-sm font-medium flex items-center mx-auto"
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

                {patients.length === 0 && (
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

export default PatientRecords;