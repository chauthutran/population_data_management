import Image from "next/image";
import AppIcon from "../layout/AppIcon";
import Header from "../layout/Header";
import LoginForm from "./LoginForm";

export default function LoginPage () {
    
    return (
        <div className="flex h-full">
            <div className="flex flex-col">
                <Header />
                <LoginForm />
                
            </div>
            
            <div>
                <Image src="building-town-svgrepo-com.svg" alt="Population Icon"  width={500} height={800} />
            </div>
        </div>
        //  <div className="bg-secondary-bg flex flex-col h-full">
            // <div className="flex-grow flex items-center justify-center">
                // <LoginForm />
            // </div>
        // </div>
        
        // <div className="flex flex-col h-screen w-full">
        //     <div className="flex flex-row">
        //         <header className="flex flex-col">
        //             <AppIcon size={90} />
        //             <div className="truncate mx-3 text-2xl text-black font-semibold border-b-2 border-b-gray-300">Population Data Management</div>
        //         </header>
                
                
        //         <div className="bg-gray-300">
        //             <LoginForm />
        //         </div>
        //     </div>
            
        //     {/* <hr className="border-t border-gray-300 my-4" /> */}
        // </div>
    )
}