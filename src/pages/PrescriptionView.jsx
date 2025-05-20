import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';

const PrescriptionView = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const printRef = useRef();

    const prescription = state?.prescription || {
        symptoms: 'Fatigue, Headaches, Joint pain',
        tests: 'TSH, CBC, Urine',
        advice: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit...',
        patientId: '987654',
        patientName: 'John Smith',
        phone: '',
        age: '35',
        sex: 'Male',
        dob: '2025-02-08',
        medicines: Array(6).fill({
            name: 'Paracetamol 500mg',
            frequency: '1 + 0 + 1',
            meal: 'After Meal',
            duration: '5 days'
        }),
        files: []
    };

    return (
        <div className="max-w-[1200px] mx-auto my-4 md:mt-[50px] px-4" ref={printRef}>
            <div className="flex flex-col md:flex-row gap-6">
                {/* Left Sidebar */}
                <div className="w-full md:w-1/3 bg-white rounded-lg shadow p-5">
                    <div className="mb-6">
                        <label className="block font-medium text-gray-700 mb-2">Symptoms:</label>
                        <div className="border border-gray-200 rounded p-3">
                            <ul className="list-decimal pl-5 text-gray-800">
                                {prescription.symptoms
                                    ? prescription.symptoms.split(',').map((item, index) => (
                                        <li key={index}>{item.trim()}</li>
                                    ))
                                    : <li>No symptoms entered</li>
                                }
                            </ul>

                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block font-medium text-gray-700 mb-2">Tests:</label>
                        <div className="border border-gray-200 rounded p-3">
                            <ul className="list-decimal pl-5 text-gray-800">
                                {prescription.tests
                                    ? prescription.tests.split(',').map((item, index) => (
                                        <li key={index}>{item.trim()}</li>
                                    ))
                                    : <li>No tests entered</li>
                                }
                            </ul>
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block font-medium text-gray-700 mb-2">Advice:</label>
                        <div className="border border-gray-200 rounded p-3 ">
                            <p className="text-gray-800 whitespace-pre-line">{prescription.advice || 'No advice entered'}</p>
                        </div>
                    </div>

                    {prescription.files.length > 0 && (
                        <div>
                            <label className="block font-bold text-gray-700 mb-2">Attached Reports:</label>
                            <div className="flex flex-wrap gap-3">
                                {prescription.files.map((file, index) => (
                                    <div key={index} className="relative bg-gray-100 rounded-lg p-3 text-center shadow">
                                        {file.preview ? (
                                            <img src={file.preview} alt="Preview" className="w-24 h-24 object-cover rounded" />
                                        ) : (
                                            <div className="w-24 h-24 flex items-center justify-center bg-gray-200 rounded">
                                                <span className="text-xs">PDF</span>
                                            </div>
                                        )}
                                        <div className="file-name text-xs mt-2 truncate w-24">{file.name}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                {/* Right Content */}
                <div className="w-full md:w-2/3 bg-white rounded-lg shadow p-5">
                    <div className="mb-6">
                        <div className="flex flex-wrap items-center justify-center mb-4">
                            <div className="text-gray-700">
                                <strong>Patient Id:</strong> <span className='text-blue-700'>{prescription.patientId || 'Not provided'}</span> | <strong>Pr No:</strong> <span className='text-blue-700'>123456</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4 mb-6 bg-gray-50 p-3 rounded">
                            <div>
                                <p className="text-gray-700"><strong>Name:</strong> {prescription.patientName || 'Not provided'}</p>
                            </div>
                            <div>
                                <p className="text-gray-700"><strong>Age:</strong> {prescription.age || 'Not provided'}</p>
                            </div>
                            <div>
                                <p className="text-gray-700"><strong>Gender:</strong> {prescription.sex || 'Not provided'}</p>
                            </div>
                            <div>
                                <p className="text-gray-700"><strong>Date:</strong> {prescription.dob ? new Date(prescription.dob).toLocaleDateString() : 'Not provided'}</p>
                            </div>
                            <div>
                                <p className="text-gray-700"><strong>Phone:</strong> {prescription.phone || 'Not provided'}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center mb-6">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/1455/1455597.png"
                            alt="Rx Icon"
                            className="w-6 h-6 mr-2"
                        />
                        <span className="text-xl font-semibold text-blue-500">R<sub>x</sub></span>
                    </div>

                    {prescription.medicines.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full border-collapse">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="py-3 px-4 text-left font-medium text-gray-700">Medicine Name</th>
                                        <th className="py-3 px-4 text-left font-medium text-gray-700">Dosages</th>
                                        <th className="py-3 px-4 text-left font-medium text-gray-700">Meal</th>
                                        <th className="py-3 px-4 text-left font-medium text-gray-700">Duration</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {prescription.medicines.map((medicine, index) => (
                                        <tr key={index}>
                                            <td className="py-3 px-4 text-gray-700">{medicine.name}</td>
                                            <td className="py-3 px-4 text-gray-700">{medicine.frequency}</td>
                                            <td className="py-3 px-4 text-gray-700">{medicine.meal}</td>
                                            <td className="py-3 px-4 text-gray-700">{medicine.duration}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-gray-500 italic">No medicines prescribed</p>
                    )}

                    <div className="flex justify-center mt-8">
                        <button
                            onClick={() => {
                                navigate("/prescriptionpdfview");
                            }}
                            className="cursor-pointer bg-gray-800 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded flex items-center"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                            </svg>
                            Print
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrescriptionView;
