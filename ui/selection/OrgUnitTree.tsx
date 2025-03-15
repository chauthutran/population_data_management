import { IOrgUnit } from "@/types/definations"
import { useEffect, useState } from "react"
import SelectionHeader from "./SelectionHeader";
import useClickOutside from "../../hooks/useClickOutside";
import { useSelection } from "@/hooks/useSelection";
import { useSetSelection } from "@/hooks/useSetSelection";
import { get } from "@/utils/apiClient";


export default function OrgUnitTree() {
    
    const { selectedOrgUnit, selectedPeriod } = useSelection();
    const [roots, setRoots] = useState<IOrgUnit[]>([]);
    const [childrenMap, setChildrenMap] = useState<Record<string, IOrgUnit[]>>({});
    const [expended, setExpanded] = useState<Record<string, boolean>>({});
    const [showed, setShowed] = useState<boolean>(false);
    const dropdownRef = useClickOutside(() => setShowed(false)); // Close dropdown when clicked outside
    
    useEffect(() => {
        fetchRoots();
    }, []);
    
    const fetchRoots = async() => {
        const list = await get<IOrgUnit[]>("/api/orgUnits");
        setRoots(list);
    }
    
    // Fetch children for a given orgUnit
    const fetchChildren = async (parentId: string) => {
        if (childrenMap[parentId]) {
            setExpanded((prev) => ({ ...prev, [parentId]: !prev[parentId] }));
            return;
        }
        
        const children = await get<IOrgUnit[]>(`/api/orgUnits?parentId=${parentId}`);
        if (children) {
            setChildrenMap((prev) => ({ ...prev, [parentId]: children }));
            setExpanded((prev) => ({ ...prev, [parentId]: true}));
        }
    }
    
    const title = (selectedOrgUnit) ? selectedOrgUnit.name : "Select OrgUnit";
    
    return (
        <div 
            className="relative bg-white border rounded-md border-gray-200 focus:ring-2 focus:ring-lemon-lime"
            tabIndex={0}
            ref={dropdownRef}
        >
            
            {/* <SelectionHeader title={title} showed={showed} setShowed={setShowed} disabled={selectedPeriod === null} /> */}
            <SelectionHeader title={title} showed={showed} setShowed={setShowed} disabled={false} />
            
            {showed && <>
                <div className="absolute flex flex-col w-full z-50 top-10 left-0 right-0 border border-gray-200 h-96 shadow-lg bg-muted-teal text-black rounded-md bg-white overflow-hidden">
                    {/* Scrollable Content */}
                    <div className="flex-1 border border-gray-200 overflow-auto p-2">
                        {roots.length > 0 ? (
                            <OrgUnitNode
                                nodes={roots}
                                expended={expended}
                                fetchChildren={fetchChildren}
                                childrenMap={childrenMap}
                            />
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                    
                    {/* Sticky Close Button */}
                    <div className="border-t border-gray-200">
                        <button className="p-3 bg-color-4 hover:bg-deep-green text-white w-full" onClick={() => setShowed(false)}>
                            Close
                        </button>
                    </div>
                </div>
            </>}
            
        </div>
    )
}

const OrgUnitNode = ({
        nodes, 
        expended, 
        fetchChildren, 
        childrenMap
} : {
    nodes: IOrgUnit[];
    expended: Record<string, boolean>;
    fetchChildren: (parentId: string) => void;
    childrenMap: Record<string, IOrgUnit[]>;
}) => {
    const { selectedOrgUnit } = useSelection();
    const { selectOrgUnit } = useSetSelection();
    
    return (
        <ul className="ml-4 border-l border-gray-200">
            {nodes.map((node) => (
                <li key={node._id} className="relative pl-4 mb-2">
                    <button
                        onClick={() => fetchChildren(node._id)}
                        className="text-sm text-blue-600 focus:outline-none transition-all duration-300"
                    >
                        {expended[node._id] ? "[-]" : "[+]" }
                    </button>
                    <span
                        className={`ml-2 ${selectedOrgUnit && selectedOrgUnit._id === node._id && "font-bold"}`}
                        onClick={() => selectOrgUnit(node)}
                    >
                        {node.name}
                    </span>
                
                    {expended[node._id] && childrenMap[node._id] && (
                        <OrgUnitNode
                            nodes={childrenMap[node._id]}
                            expended={expended}
                            fetchChildren={fetchChildren}
                            childrenMap={childrenMap}
                        />
                    )}
                </li>
            ))}
        </ul>
    );
}