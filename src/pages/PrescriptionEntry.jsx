import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const PrescriptionEntry = () => {
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);
    const fileInputRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);
    const [isFocused1, setIsFocused1] = useState(false);
    const [isFocused2, setIsFocused2] = useState(false);

    const [formData, setFormData] = useState({
        symptoms: '',
        tests: '',
        advice: '',
        patientId: '',
        patientName: '',
        phone: '',
        age: '',
        sex: '',
        dob: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileUpload = (e) => {
        const uploaded = Array.from(e.target.files).map(file => ({
            file,
            preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
            name: file.name
        }));
        setFiles([...files, ...uploaded]);
    };

    const removeFile = (index) => {
        const newFiles = [...files];
        URL.revokeObjectURL(newFiles[index].preview);
        newFiles.splice(index, 1);
        setFiles(newFiles);
    };

    const [medicineRows, setMedicineRows] = useState([{ id: 1, name: "", frequency: "", meal: "", duration: "" }]);

    const handleMedicineChange = (index, field, value) => {
        const updated = [...medicineRows];
        updated[index][field] = value;
        setMedicineRows(updated);
    };

    const addMedicineRow = () => {
        setMedicineRows([...medicineRows, { id: Date.now(), name: "", frequency: "", meal: "", duration: "" }]);
    };

    const removeMedicineRow = (id) => {
        setMedicineRows(medicineRows.filter((row) => row.id !== id));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const prescriptionData = {
            ...formData,
            medicines: medicineRows.filter(med => med.name.trim() !== ""),
            files: files
        };

        navigate('/prescriptionview', { state: { prescription: prescriptionData } });
    };

    return (
        <div className="max-w-[1200px] mx-auto my-4 md:mt-[50px] lg:mt-4 px-4 sm:px-2">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Left Sidebar */}
                    <div className="left-sidebar w-full md:w-1/3 lg:w-[30%] bg-white p-4 rounded-lg shadow">
                        <div className="autocomplete mb-2">
                            <label className="form-label text-black/80 block mb-2">Symptoms:</label>
                            <textarea
                                name="symptoms"
                                value={formData.symptoms}
                                onChange={handleInputChange}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                className={`w-full p-2 rounded mb-3 outline-0 transition-all duration-1
                                 ${isFocused ? "border ring-1 border-blue-300 ring-offset-2 ring-offset-blue-300 ring-blue-300" : "border border-black/10"}`}
                                placeholder="Type symptoms..."
                                rows="2"
                            ></textarea>
                        </div>

                        <div className="autocomplete mb-4">
                            <label className="block mb-2 text-black/80">Tests:</label>
                            <textarea
                                name="tests"
                                value={formData.tests}
                                onChange={handleInputChange}
                                onFocus={() => setIsFocused1(true)}
                                onBlur={() => setIsFocused1(false)}
                                className={`w-full p-2 rounded mb-3 outline-0 transition-all duration-1
                                 ${isFocused1 ? "border ring-1 border-blue-300 ring-offset-2 ring-offset-blue-300 ring-blue-300" : "border border-black/10"}`}
                                placeholder="Type test names..."
                                rows="2"
                            ></textarea>
                        </div>

                        <label className="block mb-2 text-black/80">Advice:</label>
                        <textarea
                            name="advice"
                            value={formData.advice}
                            onChange={handleInputChange}
                            onFocus={() => setIsFocused2(true)}
                            onBlur={() => setIsFocused2(false)}
                            className={`w-full p-2 rounded mb-3 outline-0 transition-all duration-1
                                 ${isFocused2 ? "border ring-1 border-blue-300 ring-offset-2 ring-offset-blue-300 ring-blue-300" : "border border-black/10"}`}
                            rows="3"
                            placeholder="Enter doctor's advice..."
                        ></textarea>

                        <button
                            type="button"
                            className="cursor-pointer btn btn-secondary bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-600"
                            onClick={() => fileInputRef.current.click()}
                        >
                            Attach Report
                        </button>

                        <input
                            type="file"
                            id="fileUpload"
                            ref={fileInputRef}
                            className="hidden"
                            multiple
                            accept="image/*,application/pdf"
                            onChange={handleFileUpload}
                        />

                        <div className="mt-3 flex flex-wrap gap-3">
                            {files.map((file, index) => (
                                <div key={index} className="relative bg-gray-100 rounded-lg p-3 text-center shadow hover:scale-105 transition-transform">
                                    {file.preview ? (
                                        <img src={file.preview} alt="Preview" className="w-24 h-24 object-cover rounded" />
                                    ) : (
                                        <div className="w-24 h-24 flex items-center justify-center bg-gray-200 rounded">
                                            <span className="text-xs">PDF</span>
                                        </div>
                                    )}
                                    <button
                                        type="button"
                                        className="absolute top-1 right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
                                        onClick={() => removeFile(index)}
                                    >
                                        ×
                                    </button>
                                    <div className="file-name text-xs mt-2 truncate w-24">{file.name}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Content */}
                    <div className="w-full md:w-2/3 lg:w-[70%] bg-white p-4 rounded-lg shadow">
                        <div className="mb-5">
                            <div className="flex flex-wrap justify-center gap-2 mb-4">
                                <div className="min-w-[200px]">
                                    <div className="form-group text-center">
                                        <input
                                            name="patientId"
                                            value={formData.patientId}
                                            onChange={handleInputChange}
                                            className="form-control p-2 rounded border outline-none border-black/10 focus:ring-1 focus:ring-offset-2 focus:border-blue-300 focus:ring-offset-blue-300 focus:ring-blue-300"
                                            placeholder="Enter Patient Id"
                                            type="text"
                                        />
                                    </div>
                                </div>
                                <div className="items-center">
                                    <strong className="mr-2">Pr No:</strong>
                                    <span className='text-blue-800 text-lg'>123456</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 bg-[#f8f9fa] rounded p-2.5">
                                <div className="w-full sm:w-[calc(50%-8px)] md:w-[calc(33.33%-8px)] lg:w-[calc(25%-8px)]">
                                    <label className="block text-black/80 mb-1">Patient Name:</label>
                                    <input
                                        name="patientName"
                                        value={formData.patientName}
                                        onChange={handleInputChange}
                                        type="text"
                                        className="form-control w-full bg-white p-2 rounded border outline-none border-black/10 focus:ring-1 focus:ring-offset-2 focus:border-blue-300 focus:ring-offset-blue-300 focus:ring-blue-300"
                                    />
                                </div>
                                <div className="w-full sm:w-[calc(50%-8px)] md:w-[calc(33.33%-8px)] lg:w-[calc(25%-8px)]">
                                    <label className="block text-black/80 mb-1">Phone:</label>
                                    <input
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        type="tel"
                                        className="form-control w-full p-2 bg-white rounded border outline-none border-black/10 focus:ring-1 focus:ring-offset-2 focus:border-blue-300 focus:ring-offset-blue-300 focus:ring-blue-300"
                                    />
                                </div>
                                <div className="w-full sm:w-[calc(50%-8px)] md:w-[calc(33.33%-8px)] lg:w-[calc(10%-8px)]">
                                    <label className="block text-black/80 mb-1">Age:</label>
                                    <input
                                        name="age"
                                        value={formData.age}
                                        onChange={handleInputChange}
                                        type="number"
                                        className="form-control w-full p-2 bg-white rounded border outline-none border-black/10 focus:ring-1 focus:ring-offset-2 focus:border-blue-300 focus:ring-offset-blue-300 focus:ring-blue-300"
                                    />
                                </div>

                                <div className="w-full sm:w-[calc(50%-8px)] md:w-[calc(33.33%-8px)] lg:w-[calc(20%-8px)]">
                                    <label className="block text-black/80 mb-1">Sex:</label>
                                    <select
                                        name="sex"
                                        value={formData.sex}
                                        onChange={handleInputChange}
                                        className="form-control w-full p-2 bg-white rounded border outline-none border-black/10 focus:ring-1 focus:ring-offset-2 focus:border-blue-300 focus:ring-offset-blue-300 focus:ring-blue-300"
                                    >
                                        <option value="">Select Sex</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Others">Others</option>
                                    </select>
                                </div>

                                <div className="w-full sm:w-[calc(50%-8px)] md:w-[calc(33.33%-8px)] lg:w-[calc(20%-8px)]">
                                    <label className="block mb-1">Date of Birth:</label>
                                    <input
                                        name="dob"
                                        value={formData.dob}
                                        onChange={handleInputChange}
                                        type="date"
                                        className="form-control w-full p-2 bg-white rounded border outline-none border-black/10 focus:ring-1 focus:ring-offset-2 focus:border-blue-300 focus:ring-offset-blue-300 focus:ring-blue-300"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="title-with-icon mb-4 flex items-center">
                            <img src="https://cdn-icons-png.flaticon.com/512/1455/1455597.png" alt="Rx Icon" className="w-6 h-6 mr-2" />
                            <span className="text-lg text-blue-500 font-medium">R<sub>x</sub></span>
                        </div>

                        <div>
                            {medicineRows.map((row, index) => (
                                <div
                                    key={row.id}
                                    className="medicine-row mb-4 flex flex-wrap gap-4 items-end"
                                >
                                    <div className="w-full md:w-[30%] relative">
                                        <label className="block mb-1">Medicine Name</label>
                                        <input
                                            type="text"
                                            value={row.name}
                                            onChange={(e) => handleMedicineChange(index, 'name', e.target.value)}
                                            className="form-control w-full bg-white p-2 rounded border outline-none border-black/10 focus:ring-1 focus:ring-offset-2 focus:border-blue-300 focus:ring-offset-blue-300 focus:ring-blue-300"
                                            placeholder="Type medicine name..."
                                        />
                                    </div>

                                    {row.name.trim() !== "" && (
                                        <>
                                            <div className="w-full md:w-2/12">
                                                <label className="block mb-1">Frequency</label>
                                                <select
                                                    value={row.frequency}
                                                    onChange={(e) => handleMedicineChange(index, 'frequency', e.target.value)}
                                                    className="form-control w-full bg-white p-2 rounded border outline-none border-black/10 focus:ring-1 focus:ring-offset-2 focus:border-blue-300 focus:ring-offset-blue-300 focus:ring-blue-300"
                                                >
                                                    <option value="">Select</option>
                                                    <option value="1+0+0">1+0+0</option>
                                                    <option value="0+1+0">0+1+0</option>
                                                    <option value="0+0+1">0+0+1</option>
                                                    <option value="1+1+0">1+1+0</option>
                                                    <option value="1+0+1">1+0+1</option>
                                                    <option value="0+1+1">0+1+1</option>
                                                    <option value="1+1+1">1+1+1</option>
                                                </select>
                                            </div>

                                            <div className="w-full md:w-2/12">
                                                <label className="block mb-1">Meal</label>
                                                <select
                                                    value={row.meal}
                                                    onChange={(e) => handleMedicineChange(index, 'meal', e.target.value)}
                                                    className="form-control w-full bg-white p-2 rounded border outline-none border-black/10 focus:ring-1 focus:ring-offset-2 focus:border-blue-300 focus:ring-offset-blue-300 focus:ring-blue-300"
                                                >
                                                    <option value="">Select</option>
                                                    <option value="After Meal">After Meal</option>
                                                    <option value="Before Meal">Before Meal</option>
                                                </select>
                                            </div>

                                            <div className="w-full md:w-2/12">
                                                <label className="block mb-1">Duration</label>
                                                <select
                                                    value={row.duration}
                                                    onChange={(e) => handleMedicineChange(index, 'duration', e.target.value)}
                                                    className="form-control w-full bg-white p-2 rounded border outline-none border-black/10 focus:ring-1 focus:ring-offset-2 focus:border-blue-300 focus:ring-offset-blue-300 focus:ring-blue-300"
                                                >
                                                    <option value="">Select</option>
                                                    <option value="7 days">7 days</option>
                                                    <option value="10 days">10 days</option>
                                                    <option value="14 days">14 days</option>
                                                    <option value="15 days">15 days</option>
                                                    <option value="30 days">30 days</option>
                                                </select>
                                            </div>
                                        </>
                                    )}

                                    <div className="w-full md:w-1/12 flex gap-2">
                                        {index >= 0 && (
                                            <button
                                                type="button"
                                                className="cursor-pointer btn btn-danger bg-red-500 text-white py-2 px-3 rounded hover:bg-red-800"
                                                onClick={() => removeMedicineRow(row.id)}
                                            >
                                                ✕
                                            </button>
                                        )}
                                        {index >= 0 && (
                                            <button
                                                type="button"
                                                className="cursor-pointer btn btn-primary bg-black text-white py-2 px-3 rounded hover:bg-blue-700"
                                                onClick={addMedicineRow}
                                            >
                                                +
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center mt-8">
                            <button
                                onClick={() => {
                                    navigate("/prescriptionview");
                                }}
                                type="submit"
                                className="cursor-pointer btn btn-primary bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default PrescriptionEntry;