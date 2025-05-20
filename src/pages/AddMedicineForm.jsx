import { useState } from 'react';

const AddMedicineForm = () => {
    const [medicines, setMedicines] = useState([
        { id: 1, name: '' }
    ]);

    const addMedicine = () => {
        setMedicines([...medicines, {
            id: Date.now(),
            name: ''
        }]);
    };

    const removeMedicine = (id) => {
        if (medicines.length > 1) {
            setMedicines(medicines.filter(med => med.id !== id));
        }
    };

    const handleMedicineChange = (id, value) => {
        setMedicines(medicines.map(med =>
            med.id === id ? { ...med, name: value } : med
        ));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Submitted medicines:', medicines);
    };

    return (
        <div className="max-w-xl mx-auto">
            <div className="p-4 bg-white rounded-lg shadow">
                <h2 className="text-lg text-gray-600 font-semibold mb-4">Please Add Medicine Name</h2>

                {medicines.map((medicine) => (
                    <div key={medicine.id} className="flex items-center mb-3 gap-2">
                        <input
                            type="text"
                            className="flex-1 p-2 bg-white rounded border outline-none border-black/10 focus:ring-1 focus:ring-offset-2 focus:border-blue-300 focus:ring-offset-blue-300 focus:ring-blue-300"
                            placeholder="Medicine Name"
                            value={medicine.name}
                            onChange={(e) => handleMedicineChange(medicine.id, e.target.value)}
                        />
                        <button
                            type="button"
                            className="p-2 cursor-pointer text-white bg-red-500 rounded hover:bg-red-600 w-10 h-10 flex items-center justify-center"
                            onClick={() => removeMedicine(medicine.id)}
                        >
                            ✕
                        </button>
                    </div>
                ))}

                <div className="mt-3">
                    <button
                        type="button"
                        className="p-2 cursor-pointer text-white bg-gray-800 rounded hover:bg-blue-700"
                        onClick={addMedicine}
                    >
                        + Add Medicine
                    </button>
                </div>

                <div className="mt-4 text-center">
                    <button
                        type="button"
                        className="cursor-pointer px-4 py-1.5 text-white bg-indigo-700 rounded hover:bg-blue-700"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddMedicineForm;