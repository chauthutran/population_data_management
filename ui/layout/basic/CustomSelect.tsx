import { useEffect, useState } from "react";
import useAsyncData from "@/hooks/useAsyncData";
import useClickOutside from "@/hooks/useClickOutside";
import SelectionHeader from "../selection/SelectionHeader";

export default function CustomSelect<T>({
    title,
    displayProp,
    fetchData,
    onChange,
    selected,
}: {
    title: string,
    displayProp: string,
    fetchData: () => Promise<T[]>,
    onChange: (value: T) => void;
    selected?: T | null;
}) {
    const { data, error, refetch, loading } = useAsyncData<T[]>();
    const [selectedItem, setSelectedItem] = useState<T | null>(selected || null);
    const [showed, setShowed] = useState<boolean>(false);
    const dropdownRef = useClickOutside(() => setShowed(false)); // Close dropdown when clicked outside
    
    useEffect(() => {
        refetch(fetchData);
    }, []);
    
    
    useEffect(() => {
        // Set initial selected item if provided
        if (selected) {
            setSelectedItem(selected);
        }
    }, [selected]);

    const handleSelect = (item: T) => {
        setSelectedItem(item as any);
        onChange(item);
        setShowed(false); // Close dropdown after selection
    };
    
    if (loading) return (<>Loading ...</>);
    
    const displayedTitle = (selectedItem) ? (selectedItem as any)[displayProp] : title;
    
    return (
        <div 
            className={`relative border-2 rounded-md bg-white focus:ring-2 focus:ring-blue-200 ${selectedItem ? "border-blue-300" : "border-gray-300"}`}
            tabIndex={0}
            ref={dropdownRef}
        >
            <SelectionHeader title={displayedTitle} showed={showed} setShowed={setShowed} disabled={false} />
            
            {showed && <div 
                className="absolute w-full rounded-md z-50 top-10 left-0 right-0 bg-white shadow-lg overflow-y-auto"
            >
                {data === null ? (
                    <div className="p-4">Loading...</div>
                ) : (
                    <ul className="border border-gray-200 divide-y divide-gray-300">
                        {data!.map((item: T) => (
                            <li 
                                key={(item as any)._id} // Casting item to any for _id
                                className={`cursor-pointer py-3 px-4 transition duration-200 ease-in-out hover:bg-blue-300 ${
                                    item && (item as any)._id === (selectedItem as any)?._id && "bg-blue-300 font-medium"
                                }`}
                                onClick={() => handleSelect(item)}
                            >
                                {(item as any)[displayProp]}
                            </li>
                        ))}
                    </ul>
                )}
            </div>}
        </div>
    )
}