import Footer from "../layout/Footer";
import Header from "../layout/Header";
import SlideBar from "../layout/SlideBar";
import PendingApprovalData from "./PendingApprovalData";

export default function DashboardPage () {
    console.log("--- DashboardPage");
    return (
        // <div className="bg-gray-100 text-text-color">
        //     <div className="flex h-screen">
        //         <SlideBar />

        //         <main className="flex-1 p-6">
        //             <Header />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                        {/* <div className="bg-[var(--card-bg)] p-6 rounded-lg shadow-md">
                            <h2 className="text-lg font-semibold mb-4">Enter Population Data</h2>
                            <form>
                                <input type="text" placeholder="City Name" className="w-full p-2 border rounded-md mb-2"/>
                                <input type="number" placeholder="Population Count" className="w-full p-2 border rounded-md mb-2"/>
                                <button className="bg-[var(--button-primary)] text-white px-4 py-2 rounded-lg w-full">Submit</button>
                            </form>
                        </div> */}

                        <PendingApprovalData />

                        <div className="bg-[var(--card-bg)] p-6 rounded-lg shadow-md">
                            <h2 className="text-lg font-semibold mb-4">Population Chart</h2>
                            <canvas id="populationChart"></canvas>
                        </div>
                    </div>
        //         </main>
        //     </div>
        // </div>
    )
}