import Image from "next/image";
import AppIcon from "../layout/AppIcon";
import Header from "../layout/Header";
import LoginForm from "./LoginForm";
import BackgroundChart from "./BackgroundChart";

export default function LoginPage () {
    
    return (
        <div className="flex flex-1">
            {/* Left Side - Login Form */}
            <div className="flex flex-1 bg-white shadow-lg">
                <div className="w-full max-w-md p-8 rounded-lg">
                    
                <p className="text-color-1 mb-4 uppercase font-semibold" style={{letterSpacing: "1px"}}>We're glad to have you here.</p>
                    {/* <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
                        Welcome Back
                    </h2>
                    <p className="text-gray-500 text-center mb-6">
                        Log in to manage your data efficiently.
                    </p> */}
                    <LoginForm />
                </div>
            </div>

            {/* Right Side - Background Chart */}
            <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-500 to-green-500">
                <BackgroundChart />
            </div>
        </div>
    )
}