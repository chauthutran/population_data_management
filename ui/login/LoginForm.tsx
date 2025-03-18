import { PAGE_DASHBOARD } from "@/constants";
import useAsyncData from "@/hooks/useAsyncData";
import { useAuth } from "@/hooks/useAuth";
import { useCurrentPage } from "@/hooks/usePage";
import { IUser } from "@/types/definations";
import { post } from "@/utils/apiClient";
import { FormEvent, useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";

export default function LoginForm () {
    const { curUser, setUser } = useAuth();
    const { setCurrentPage } = useCurrentPage();
    const { data, error, loading, refetch } = useAsyncData<IUser | null>();
    
    const [email, setEmail] = useState("demo@example.com");
    const [password, setPassword] = useState("1234");

    useEffect(() => {
        if(data) {
            setUser(data);
            setCurrentPage(PAGE_DASHBOARD, "Dashboard");
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
    console.log(loading);
    return (
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
            <h2 className="text-3xl font-bold text--text-color mb-4">Welcome</h2>
            <p className="text-gray-600 mb-6">Manage and visualize population data with ease.</p>
            
            <form onSubmit={handleSubmit}>
                <input type="email"
                    value={email}
                    placeholder="Email"
                    className="w-full p-3 border rounded-md mb-4"
                    required
                    onChange={(e) => setEmail(e.target.value)}/>
                    
                <input type="password"
                    value={password}
                    placeholder="Password"
                    className="w-full p-3 border rounded-md mb-4"
                    required
                    onChange={(e) => setPassword(e.target.value)}/>
                    
                <button className="bg-black text-white px-4 py-3 rounded-lg w-full flex space-x-3 justify-center">
                    <span>Login</span>  
                    <span style={{visibility: loading ? "visible" : "hidden"}}> <FaSpinner className="animate-spin mr-2" /></span>
                </button>
            </form>
    
            <p className="text-gray-600 mt-4">Don't have an account? <a href="#" className="text-primary-bg font-semibold">Sign up</a></p>
        </div>
    )
}