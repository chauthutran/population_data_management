import { PAGE_DASHBOARD } from "@/constants";
import useAsyncData from "@/hooks/useAsyncData";
import { useAuth } from "@/hooks/useAuth";
import { useCurrentPage } from "@/hooks/usePage";
import { IUser } from "@/types/definations";
import { post } from "@/utils/apiClient";
import { FormEvent, useEffect, useState } from "react";
import { CiLock } from "react-icons/ci";
import { FaRegUser, FaSpinner } from "react-icons/fa";
import { MdLockOutline, MdOutlineEmail } from "react-icons/md";

export default function LoginForm () {
    const { setUser } = useAuth();
    const { setCurrentPage } = useCurrentPage();
    const { data, error, loading, refetch } = useAsyncData<IUser | null>();
    
    const [email, setEmail] = useState("demo@example.com");
    const [password, setPassword] = useState("1234");

    useEffect(() => {
        if(data) {
            setUser(data);
            setCurrentPage(PAGE_DASHBOARD);
        }
    }, [data]);
    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent page reload
        await refetch(login);
    }
    
    const login = async (): Promise<IUser | null> => {
        const payload = {
            email,
            password,
        }
        
        return await post<IUser, any>("/api/auth/login", payload);
    }
    
    return (
        // <div className="shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <div className="p-8 max-w-md w-ful">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Welcome</h2>
            {/* <p className="text-color-1 mb-6">Manage and visualize population data with ease.</p> */}
            
            <form onSubmit={handleSubmit} className="space-y-3 text-gray-400">
                <div className="relative flex items-center w-full max-w-md">
                    <FaRegUser className="absolute left-3" size={16} />
                    <input type="email"
                        value={email}
                        placeholder="Email"
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full focus:text-gray-800"
                        required
                        onChange={(e) => setEmail(e.target.value)}/>
                </div>

                <div className="relative flex items-center w-full max-w-md">
                    <MdLockOutline className="absolute left-3" size={20} />
                    <input type="password"
                        value={password}
                        placeholder="Password"
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full focus:text-gray-800"
                        required
                        onChange={(e) => setPassword(e.target.value)}/>
                </div>
    
                <div className="flex flex-row space-x-12 items-center">
                    <button
                       className="shadow-lg hover:shadow-gray-400 px-3 py-2 bg-blue-400 font-semibold rounded-lg transition-transform transform hover:scale-105 flex flex-row text-black space-x-3"
                    >
                        <span className="pl-2">Login</span>  
                        <span style={{visibility: loading ? "visible" : "hidden"}}> <FaSpinner className="animate-spin" /></span>
                    </button>
                    
                    <div className="flex justify-end">
                        <div className="cursor-pointer hover:underline">
                            Forget Password?
                        </div>
                    </div>
                </div>
                {error && <p className="text-red-500">{error}</p>}
            </form>
    
            <p className="text-gray-600 mt-4">Don't have an account? <a href="#" className="text-primary-bg font-semibold">Sign up</a></p>
        </div>
    )
}