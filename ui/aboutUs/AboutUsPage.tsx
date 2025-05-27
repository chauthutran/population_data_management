import Image from "next/image";

export default function AboutUsPage () {
    
    return (
        <div className="mx-auto p-6 md:p-10 bg-white rounded-2xl shadow-lg space-y-10">
            {/* Header */}
            <div className="text-center">
                <h1 className="text-4xl font-extrabold text-gray-800">About The Application</h1>
                <p className="mt-3 text-lg text-gray-500">A personal tool for managing and analyzing population data effectively.</p>
            </div>

            {/* Core Features */}
            <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">🚀 Core Features</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-2 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-md shadow-sm">
                    <li><span className="font-medium">Data Entry & Validation:</span> Add and verify population records easily.</li>
                    <li><span className="font-medium">Approval Workflows:</span> Secure and structured data validation system.</li>
                    <li><span className="font-medium">Charts & Analytics:</span> Visual insights on trends and demographics.</li>
                    <li>
                        <span className="font-semibold">🌟 Population Forecasting:</span>
                        <span className="text-gray-700 ml-1">A standout feature that predicts future demographic trends using powerful analytics.</span>
                    </li>
                </ul>
            </section>

            {/* About Developer */}
            <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-3 border-b pb-2">👨‍💻 About Me</h2>
                <p className="text-gray-700 mb-3">
                    Hi, I’m <strong className="text-gray-900">Chau Thu Tran</strong>, the developer behind this application. I created this project as a way to demonstrate my skills in building practical, data-driven tools—combining clean UI design, efficient workflows, and analytical capabilities.
                </p>
                <a
                href="https://neocities.org/site/chauthutran"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-blue-600 font-medium hover:underline hover:text-blue-800 transition"
                >
                🌐 View My Personal Profile
                </a>
            </section>
        </div>

    )
}