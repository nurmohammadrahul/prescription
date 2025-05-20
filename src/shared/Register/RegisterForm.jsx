import { useState } from 'react';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        };

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
            valid = false;
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
            valid = false;
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
            valid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            valid = false;
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setIsSubmitting(true);
            setTimeout(() => {
                setIsSubmitting(false);
                navigate('/dashboard');
            }, 1500);
        }
    };
    return (
        <div className="w-full max-w-md mx-auto p-8 bg-white/20 rounded-xl shadow-md space-y-6">
            <div className=" text-center space-y-2">
                <h1 className="text-3xl font-bold text-white">Registration</h1>
                <p className="text-white">Sign up to continue your journey</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="form-group relative transition-all duration-600 ease-out opacity-100 translate-y-0">
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full p-4 pl-10 text-gray-300 rounded-lg border focus:outline-none focus:ring-1 focus:ring-offset-1 ${errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                            }`}
                        placeholder="Email address"
                        required
                    />
                    <FaEnvelope className="input-icon absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    {errors.email && (
                        <span className="error-message text-red-500 text-sm mt-1 block">{errors.email}</span>
                    )}
                </div>

                <div className="form-group relative transition-all duration-600 ease-out opacity-100 translate-y-0">
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full p-4 pl-10 text-gray-300 rounded-lg border focus:outline-none focus:ring-1 focus:ring-offset-1 ${errors.password ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                            }`}
                        placeholder="Password"
                        required
                    />
                    <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    {errors.password && (
                        <span className=" text-red-500 text-sm mt-1 block">{errors.password}</span>
                    )}
                </div>



                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="cursor-pointer w-full bg-white text-black font-medium py-3 px-4 rounded-lg transition-all duration-300 ease-out opacity-100 translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Registering...' : 'Register'}
                </button>
            </form>

            <div className="text-center transition-all duration-600 ease-out opacity-100 translate-y-0">
                <p className="text-gray-300">
                    Already have an account?
                    <Link
                        to="/login"
                        className="text-white ml-1"
                    >
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterForm;