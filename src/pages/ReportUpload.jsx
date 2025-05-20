import { useState, useRef } from 'react';

const ReportUpload = () => {
    const [files, setFiles] = useState([]);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles([...files, ...selectedFiles]);
    };

    const removeFile = (index) => {
        const updatedFiles = [...files];
        updatedFiles.splice(index, 1);
        setFiles(updatedFiles);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission with the files
        console.log('Submitted files:', files);
        // Add your API call or form processing logic here
    };

    return (
        <div className="max-w-[1200px] mx-auto my-6">
            <div className="bg-white drop-shadow-2xl rounded-lg p-6">
                <div className="flex justify-center">
                    <div className="w-full md:w-1/2">
                        <div className="form-group">
                            <label className="block text-lg text-gray-700 mb-2">Please Add Your Report</label>
                            <div
                                className={`border-2 border-dashed border-gray-300 ${files.length > 0 ? 'p-6 pt-8 pb-8 min-h-[300px]' : 'p-6 h-48'
                                    } text-center cursor-pointer transition-all flex flex-col items-center justify-center rounded-lg`}
                                onClick={() => fileInputRef.current.click()}
                            >
                                <input
                                    type="file"
                                    className="hidden"
                                    ref={fileInputRef}
                                    accept="image/*, application/pdf"
                                    multiple
                                    onChange={handleFileChange}
                                />
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-800 cursor-pointer text-white rounded-md hover:bg-blue-700 transition-colors"
                                >
                                    Select Report
                                </button>
                                {files.length > 0 && (
                                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                        {files.map((file, index) => (
                                            <div key={index} className="relative group">
                                                {file.type.startsWith('image/') ? (
                                                    <img
                                                        src={URL.createObjectURL(file)}
                                                        alt={file.name}
                                                        className="w-20 h-20 object-cover rounded border border-gray-200"
                                                    />
                                                ) : (
                                                    <div className="w-full h-32 bg-gray-100 flex flex-col items-center justify-center rounded border border-gray-200">
                                                        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                        </svg>
                                                        <span className="text-xs text-gray-500 mt-1 truncate w-full px-2">{file.name}</span>
                                                    </div>
                                                )}
                                                <button
                                                    type="button"
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                    onClick={() => removeFile(index)}
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                                <span className="text-xs text-gray-600 truncate block mt-1">{file.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center mt-6">
                    <button
                        className="px-6 py-2 cursor-pointerF bg-blue-800 hover:bg-blue-600 text-white rounded-md transition-colors"
                        onClick={handleSubmit}
                        disabled={files.length === 0}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReportUpload;