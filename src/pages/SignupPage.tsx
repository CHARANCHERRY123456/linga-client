import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { signupService } from "../store/slices/auth/authService";
import type { AuthRootState } from "../types/auth/authSliceTypes";
import { toast } from "react-toastify";

interface FormErrors {
    email?: string;
    password?: string;
    username?: string;
    confirmPassword?: string;
}

export default function SignupPage(){
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLoading, error, isAuthenticated } = useSelector((state : AuthRootState ) => state.auth);

    useEffect(() => {
        if(isAuthenticated) navigate("/");
    }, [isAuthenticated, navigate]);

    const [formData, setFormData] = useState({
        "email" : "",
        "password" : "",
        "username" : "",
        "confirmPassword": ""
    });

    const [errors, setErrors] = useState<FormErrors>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        // Clear error when user starts typing
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!validateForm()) return;
        
        try {
            const { confirmPassword, ...signupData } = formData;
            await dispatch(signupService(signupData) as any);
        } catch (err) {
            console.error("Signup failed:", err);
        }
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        
        // Username validation
        if (!formData.username) {
            newErrors.username = "Username is required";
        } else if (formData.username.length < 2) {
            newErrors.username = "Username must be at least 2 characters";
        }
        
        // Email validation
        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email";
        }
        
        // Password validation
        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }
        
        // Confirm password validation
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4">
            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <div className="mx-auto h-16 w-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
                        <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
                    <p className="text-gray-600">Join us to Learn English</p>
                </div>

                {/* Form */}
                <form className="bg-white rounded-2xl shadow-xl p-8 space-y-6" onSubmit={handleSubmit}>
                    {/* Global Error */}

                    {/* Username Field */}
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            name="username"
                            autoComplete="username"
                            required
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                                errors.username ? 'border-red-300 bg-red-50' : 'border-gray-300'
                            }`}
                            placeholder="Enter your username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                        {errors.username && (
                            <p className="text-red-500 text-xs mt-1">{errors.username}</p>
                        )}
                    </div>

                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            autoComplete="email"
                            required
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                                errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                            }`}
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            autoComplete="new-password"
                            required
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                                errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
                            }`}
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                        )}
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            name="confirmPassword"
                            autoComplete="new-password"
                            required
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                                errors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-300'
                            }`}
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={ isLoading}
                        className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Creating account...
                            </>
                        ) : (
                            'Create Account'
                        )}
                    </button>

                    {/* Login Link */}
                    <div className="text-center">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                className="text-green-500 hover:text-green-600 font-medium transition-colors"
                            >
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}