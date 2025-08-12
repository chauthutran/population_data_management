import useAsyncData from '@/hooks/useAsyncData';
import { useAuth } from '@/hooks/useAuth';
import { IUser, JSONObject } from '@/types/definations';
import { post } from '@/utils/apiClient';
import { FormEvent, useEffect, useState } from 'react';
import { FaRegUser, FaSpinner } from 'react-icons/fa';
import { MdLockOutline } from 'react-icons/md';
import UserRegisterForm from '../UserRegisterForm';
import loginSchema from "@/validation/loginSchema";
import { useRouter } from 'next/navigation';

export default function LoginForm() {
    const { setUser } = useAuth();
    const router = useRouter();

    const { data, error, loading, refetch } = useAsyncData<IUser | null>();

    const [email, setEmail] = useState('demo@example.com');
    const [password, setPassword] = useState('1234');
    const [showRegister, setShowRegister] = useState(false);
    const [errors, setErrors] = useState<JSONObject>({});

    useEffect(() => {
        if (data) {
            setUser(data);
            router.push('/dashboard'); // Redirect to dashboard
        }
    }, [data]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent page reload
        
        const { error } = loginSchema.validate({email, password}, {
            abortEarly: false,
        });
        
        if(error) {
            const newErrors: JSONObject = {};
            error.details.forEach((err) => {
                newErrors[err.path[0] as string] = err.message;
            });
            setErrors(newErrors);
        }
        await refetch(login);
    };

    const showRegisterForm = () => {
        setShowRegister(true);
    };

    const login = async (): Promise<IUser | null> => {
        const payload = {
            email,
            password,
        };

        return await post<IUser, any>('/api/auth/login', payload);
    };

    return (
        <>
            <div className="max-w-md w-ful">
                <form
                    onSubmit={handleSubmit}
                    className="space-y-3 text-gray-400"
                >
                    <div>
                        <div className="relative flex items-center w-full max-w-md">
                            <FaRegUser className="absolute left-3" size={16} />
                            <input
                                type="email"
                                value={email}
                                placeholder="Email"
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-gray-800"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>


                    <div>
                        <div className="relative flex items-center w-full max-w-md">
                            <MdLockOutline className="absolute left-3" size={20} />
                            <input
                                type="password"
                                value={password}
                                placeholder="Password"
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-gray-800"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <p className="text-red-500 text-sm">{errors.password}</p>
                    </div>

                    <div className="flex flex-row space-x-12 items-center w-full">
                        <button className="flex-1 hover:shadow-gray-400 hover:shadow-lg px-3 py-2 bg-blue-500 text-white font-semibold rounded-lg transition-transform transform hover:scale-105 flex flex-row space-x-3 items-center justify-center">
                            <span className="pl-2">Login</span>
                            <span
                                style={{
                                    visibility: loading ? 'visible' : 'hidden',
                                }}
                            >
                                <FaSpinner className="animate-spin" />
                            </span>
                        </button>

                        <div className="flex justify-end">
                            <div className="cursor-pointer hover:underline">
                                Forget Password?
                            </div>
                        </div>
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                </form>

                <p className="pl-3 text-gray-500 text-sm mt-4">
                    Don't have an account?{' '}
                    <a
                        href="#"
                        className="text-blue-600 hover:underline"
                        onClick={() => showRegisterForm()}
                    >
                        Sign up
                    </a>
                </p>
            </div>

            {showRegister && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <UserRegisterForm onClose={() => setShowRegister(false)} />
                </div>
            )}
        </>
    );
}
