'use client';

import { useState } from 'react';
import registrationSchema from '@/validation/registrationSchema';
import { JSONObject } from '@/types/definations';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';

export default function UserRegisterForm({ onClose }: { onClose: () => void }) {
    
    const router = useRouter();
    const { setUser } = useAuth();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState<JSONObject>({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { error } = registrationSchema.validate(formData, {
            abortEarly: false,
        });
        if (error) {
            const newErrors: JSONObject = {};
            error.details.forEach((err) => {
                newErrors[err.path[0] as string] = err.message;
            });
            setErrors(newErrors);
        } else {
            setLoading(true);
            setMessage('');

            try {
                const response = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: formData.email,
                        password: formData.password,
                    }),
                });

                const result = await response.json();
                if (!response.ok)
                    throw new Error(result.message || 'Something went wrong');

                setUser(result);
                router.push('/dashboard');
            } catch (error: any) {
                setMessage(error.message);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="max-w-md p-8 bg-white rounded-xl shadow-lg mx-auto">
            <header className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Register</h2>
                <button
                    onClick={onClose}
                    aria-label="Close registration form"
                    className="text-gray-500 hover:text-gray-800 text-3xl font-bold focus:outline-none"
                >
                    &times;
                </button>
            </header>

            {message && (
                <p className="text-red-600 text-sm mb-4 font-medium">
                    {message}
                </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                    <label
                        htmlFor="email"
                        className="block text-base font-semibold mb-1"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-lg"
                        placeholder="you@example.com"
                        autoComplete="email"
                    />
                    {errors.email && (
                        <p className="text-red-600 text-sm mt-1">
                            {errors.email}
                        </p>
                    )}
                </div>

                {/* Password Field */}
                <div>
                    <label
                        htmlFor="password"
                        className="block text-base font-semibold mb-1"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-lg"
                        placeholder="Enter your password"
                        autoComplete="new-password"
                    />
                    {errors.password && (
                        <p className="text-red-600 text-sm mt-1">
                            {errors.password}
                        </p>
                    )}
                </div>

                {/* Confirm Password Field */}
                <div>
                    <label
                        htmlFor="confirmPassword"
                        className="block text-base font-semibold mb-1"
                    >
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-lg"
                        placeholder="Confirm your password"
                        autoComplete="new-password"
                    />
                    {errors.confirmPassword && (
                        <p className="text-red-600 text-sm mt-1">
                            {errors.confirmPassword}
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 rounded-lg text-white text-lg font-semibold transition-colors ${
                        loading
                            ? 'bg-blue-300 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                >
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>
        </div>
    );
}
