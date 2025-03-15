import { JSONObject } from "@/types/definations";
import OrgUnitLevelSelect from "@/ui/selection/OrgUnitLevelSelect";
import OrgUnitTree from "@/ui/selection/OrgUnitTree";

export default function OrgUnitFilterPanel ({
    panelIdx,
    isOpen,
    togglePanel,
    handleOrgUnitLevelOnChange,
}: {
    panelIdx: number;
    isOpen: boolean;
    togglePanel: (panelIdx: number) => void;
    handleOrgUnitLevelOnChange: (level: JSONObject) => void;
}) {
    
    return (
        <div className="border border-gray-300">
            {/* Header */}
            <button
                onClick={() => togglePanel(panelIdx)}
                className="w-full flex justify-between items-center bg-gray-100 px-4 py-2 text-left"
            >
                <span className="font-medium">OrgUnit</span>
                <span>{isOpen ? "▼" : "▲"}</span>
            </button>

            {/* Content (Only visible if open) */}
            {isOpen && (
                <div className="p-4 bg-white border-t border-gray-300">
                    <OrgUnitTree />
                                
                    <OrgUnitLevelSelect onChange={handleOrgUnitLevelOnChange} />
                    
                </div>
            )}
        </div>
    )
}