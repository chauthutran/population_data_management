import { IOrgUnit } from "@/types/definations"
import { useEffect, useState } from "react"
import SelectionHeader from "./SelectionHeader";
import useClickOutside from "./useClickOutside";
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
        <div className="relative w-64 bg-muted-teal border rounded-md border-light-gray-blue-event">
            
            <SelectionHeader title={title} showed={showed} setShowed={setShowed} disabled={selectedPeriod === null} />
            
            {showed && <div className="absolute w-full z-50 top-10 left-0 right-0 border border-slate-200 h-96 shadow-lg overflow-auto bg-muted-teal text-gray-100 rounded-md" ref={dropdownRef}>
                <div className="border border-slate-200 min-h-96">
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
            </div>}
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
        <ul className="ml-4 border-l border-gray-300">
            {nodes.map((node) => (
                <li key={node._id} className="relative pl-4 mb-2">
                    <button
                        onClick={() => fetchChildren(node._id)}
                        className="text-sm text-white hover:text-white focus:outline-none transition-all duration-300"
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