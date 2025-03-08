import { IOrgUnit } from "@/types/definations"
import { useEffect, useState } from "react"


export default function OrgUnitTree() {
    
    const [roots, setRoots] = useState<IOrgUnit[]>([]);
    const [childrenMap, setChildrenMap] = useState<Record<string, IOrgUnit[]>>({});
    const [expended, setExpanded] = useState<Record<string, boolean>>({});
    
    useEffect(() => {
        fetchRoots();
    }, []);
    
    const fetchRoots = async() => {
        const res = await fetch("/api/orgUnits");
        const roots = await res.json();
        setRoots(roots);
    }
    
    // Fetch children for a given orgUnit
    const fetchChildren = async (parentId: string) => {
        if (childrenMap[parentId]) {
            setExpanded((prev) => ({ ...prev, [parentId]: !prev[parentId] }));
            return;
        }
        
        const res = await fetch(`/api/orgUnits?parentId=${parentId}`);
        const children = await res.json();
        if (children) {
            setChildrenMap((prev) => ({ ...prev, [parentId]: children }));
            setExpanded((prev) => ({ ...prev, [parentId]: true}));
        }
    }
    
    return (
        <div className="p-4 border border-slate-200 min-h-screen">
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
    
        return (
            <ul className="ml-4 border-l border-gray-400">
                {nodes.map((node) => (
                    <li key={node._id} className="relative pl-4 mb-2">
                        <button
                            onClick={() => fetchChildren(node._id)}
                            className="text-sm  text-blue-500"
                        >
                            {expended[node._id] ? "[-]" : "[+]"}
                        </button>
                        <span className="ml-2">{node.name}</span>
                
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