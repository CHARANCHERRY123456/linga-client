import { useDispatch, useSelector } from "react-redux"
import { loginService  } from "../store/slices/auth/authService";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { type AuthRootState } from "../types/auth/authSliceTypes";
import { type LoginReqType } from "../types/authTypes";

interface FormErrors {
    email?: string;
    password?: string;
}

export default function LoginPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [formData, setFormData] = useState<LoginReqType>({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const { isLoading, error, isAuthenticated } = useSelector(
        (state: AuthRootState) => state.auth
    );

    // if already authenticated redirect to home
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated]);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

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

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field: keyof LoginReqType, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            await dispatch(loginService(formData) as any);
            // useEffect will handle if isAuthenticated changed
        } catch (err) {
            console.error("Login failed:", err);
        } finally {
            setIsSubmitting(false);
        }
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
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                    <p className="text-gray-600">Sign in to continue chatting</p>
                </div>

                {/* Form */}
                <form className="bg-white rounded-2xl shadow-xl p-8 space-y-6" onSubmit={handleSubmit}>


                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            required
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                                errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                            }`}
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
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
                            autoComplete="current-password"
                            required
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                                errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
                            }`}
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting || isLoading}
                        className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                    >
                        {isSubmitting || isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Signing in...
                            </>
                        ) : (
                            'Sign In'
                        )}
                    </button>

                    {/* Signup Link */}
                    <div className="text-center">
                        <p className="text-gray-600">
                            Don't have an account?{' '}
                            <Link
                                to="/signup"
                                className="text-green-500 hover:text-green-600 font-medium transition-colors"
                            >
                                Sign up here
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}