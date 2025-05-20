import { useLocation } from 'react-router-dom';
import headImg from "../assets/images/reports/header.jpg";
import footImg from "../assets/images/reports/footer.jpg";

const PrescriptionpdfView = () => {
    const { state } = useLocation();

    const prescription = state?.prescription || {
        symptoms: 'Fatigue, Headaches, Joint pain',
        tests: 'TSH, CBC, Urine',
        advice: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit...',
        patientId: '987654',
        patientName: 'John Smith',
        age: '35',
        sex: 'Male',
        dob: '2025-02-08',
        medicines: Array(6).fill({
            name: 'Paracetamol 500mg',
            frequency: '1 + 0 + 1',
            meal: 'After Meal',
            duration: '5 days'
        })
    };

    const formattedDate = new Date(prescription.dob).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="max-w-[840px] mx-auto my-4 md:mt-[50px] bg-white border border-gray-200 shadow-lg p-4 print:shadow-none print:border-none">
            <div className="header mb-2">
                <img src={headImg} alt="Clinic Header" className="w-full" />
            </div>
            <hr className="border-t border-gray-300 mb-4" />
            <div className="content flex flex-col md:flex-row gap-6 print:flex-row">      {/* Left Side content */}
                <div className="left-sidebar w-full md:w-1/3 print:w-1/3 pr-4">
                    <div className="section mb-6">
                        <h3 className="font-bold text-md">Symptoms:</h3>
                        <p className="whitespace-pre-line">{prescription.symptoms}</p>
                    </div>
                    <div className="section mb-6">
                        <h3 className="font-bold text-md">Tests:</h3>
                        <p className="whitespace-pre-line">{prescription.tests}</p>
                    </div>
                    <div className="section mb-6">
                        <h3 className="font-bold text-md">Advice:</h3>
                        <p className="whitespace-pre-line">{prescription.advice}</p>
                    </div>
                </div>
                <div className="hidden md:block border-l border-gray-300"></div>  {/* Right side Content */}
                <div className="right-content w-full md:w-2/3 print:w-2/3 pl-4">
                    <div className="section mb-6 text-sm">
                        <p>
                            <strong>Patient Id:</strong> {prescription.patientId}  |
                            <strong> Pr No:</strong> 123456
                        </p>
                        <p>
                            <strong>Name:</strong> {prescription.patientName}  |
                            <strong> Age:</strong> {prescription.age}  |
                            <strong> Gender:</strong> {prescription.sex}
                            <span className="pl-8"><strong>Date:</strong> {formattedDate}</span>
                        </p>
                    </div>

                    <div className="section">
                        <h3 className="prescription-title flex items-center text-3xl text-cyan-700 font-bold">
                            <span className="rx-icon ml-2">R<sub>x</sub></span>
                        </h3>
                        <table className="w-full border-collapse mt-4">
                            <thead>
                                <tr>
                                    <th className="p-2 text-left">Medicine Name</th>
                                    <th className="p-2 text-left">Dosages</th>
                                    <th className="p-2 text-left">Meal</th>
                                    <th className="p-2 text-left">Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                                {prescription.medicines.map((medicine, index) => (
                                    <tr key={index}>
                                        <td className="p-2">{medicine.name}</td>
                                        <td className="p-2">{medicine.frequency}</td>
                                        <td className="p-2">{medicine.meal}</td>
                                        <td className="p-2">{medicine.duration}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="footer mt-12 print:mt-12">
                <img src={footImg} alt="Clinic Footer" className="w-full" />
            </div>
            <div className="flex justify-center mt-8 print:hidden">
                <button
                    onClick={handlePrint}
                    className="cursor-pointer bg-red-800 hover:bg-green-800 text-white font-medium py-2 px-4 rounded flex items-center"
                >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    Print
                </button>
            </div>
        </div>
    );
};

export default PrescriptionpdfView;
