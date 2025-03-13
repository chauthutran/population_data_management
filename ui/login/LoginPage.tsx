import Footer from "../layout/Footer";
import LoginForm from "./LoginForm";
import LoginHeader from "./LoginHeader";

export default function LoginPage () {
    
    return (
         <div className="bg-secondary-bg flex flex-col h-full">
            <div className="flex-grow flex items-center justify-center">
                <LoginForm />
            </div>
        </div>
    )
}