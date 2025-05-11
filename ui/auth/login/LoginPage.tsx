import Image from 'next/image';
import LoginForm from './LoginForm';
import AppDetailsIntro from '@/ui/layout/AppDetailsIntro';

export default function LoginPage() {
    return (
        <div className="lg:flex lg:flex-row items-start w-full flex-1 space-x-10 my-10 space-y-10">
            <div className="flex-1 flex-col space-y-5 mx-5">
                <div className="text-left">
                    The Population Data Management Application is a powerful and
                    user-friendly platform designed to help organizations
                    collect, manage, and visualize population-related data
                    efficiently.
                    <br />
                    Whether you're tracking demographics, conducting surveys, or
                    analyzing trends, this application provides a seamless
                    workflow from data entry to advanced analytics.
                </div>

                <fieldset className="px-6 pt-3 pb-6 rounded-3xl bg-gray-100 border border-gray-300 max-w-md">
                    <legend className="text-lg px-3 py-2 text-blue-600">
                        🚀 Get Started
                    </legend>

                    <p className="text-gray-600 text-sm mb-4">
                        Welcome! Please sign in to access your account and
                        explore our features.
                    </p>

                    <LoginForm />
                </fieldset>
            </div>

            <div className="lg:flex items-center justify-center hidden">
                <Image
                    src="target-svgrepo-com.svg"
                    alt="target"
                    width={300}
                    height={300}
                />
            </div>

            <div className="flex-1 flex flex-col space-y-10">
                <AppDetailsIntro />
            </div>
        </div>
    );
}
