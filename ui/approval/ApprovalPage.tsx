import Footer from "../layout/Footer";
import Header from "../layout/Header";
import LoginForm from "../login/LoginForm";
import DataValueList from "./DataValueList";
import DataSetSelect from "./selection/DataSetSelect";
import OrgUnitTree from "./selection/OrgUnitTree";
import PeriodSelect from "./selection/PeriodSelect";

export default function ApprovalPage () {
    return (

<div className="bg-secondary-bg flex flex-col min-h-screen">
    
    <Header />
    
    <main className="flex-grow p-6">
        <div className="flex flex-wrap gap-4 items-center justify-center mb-6">
          
            <DataSetSelect />

            <PeriodSelect periodType="Yearly" />

            <OrgUnitTree />

            <button className="bg-primary-bg text-white px-4 py-3 rounded-lg">Clear Data</button>
            

            <DataValueList />
            
        </div>
    </main>
    
   <Footer />

</div>

    )
}