import Image from "next/image";
import AppIcon from "../layout/AppIcon";
import Header from "../layout/Header";
import LoginForm from "./LoginForm";
import BackgroundChart from "./BackgroundChart";

export default function LoginPage () {
    
    return (
        <div className="flex flex-1">
    {/* Left Side - Login Form */}
    <div className="flex flex-1 justify-center">
        <div className="w-full max-w-md p-8">
            <p className="text-color-1 mb-4 uppercase font-semibold text-center" style={{ letterSpacing: "1px" }}>
                We're glad to have you here.
            </p>
            <LoginForm />
        </div>
    </div>

    {/* Right Side - Background Chart */}
    <div className="flex-1 flex items-center justify-center">
        <BackgroundChart />
    </div>
</div>

    )
}