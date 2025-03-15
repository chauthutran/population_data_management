import { useEffect, useState } from "react";
import useAsyncData from "@/hooks/useAsyncData";
import useClickOutside from "@/hooks/useClickOutside";
import SelectionHeader from "../SelectionHeader";

export default function CustomSelect<T>({
    title,
    displayProp,
    fetchData,
    onChange,
}: {
    title: string,
    displayProp: string,
    fetchData: () => Promise<T[]>,
    onChange: (value: T) => void; // <-- New prop to notify parent
}) {
    const { data, error, refetch, loading } = useAsyncData<T[]>();
    const [selected, setSelected] = useState<T[] | null>(null);
    const [showed, setShowed] = useState<boolean>(false);
    const dropdownRef = useClickOutside(() => setShowed(false)); // Close dropdown when clicked outside
    
    useEffect(() => {
        refetch(fetchData);
    }, [])

    const handleSelect = (item: T) => {
        setSelected(item as any);
        if (onChange) onChange(item); // Notify parent component
        setShowed(false); // Close dropdown after selection
    };
    
    if (loading) return (<>Loading ...</>);
    
    const displayedTitle = (selected) ? (selected as any)[displayProp] : title;
    
    return (
        <div 
            className={`relative border-2 rounded-md bg-white focus:ring-2 focus:ring-lemon-lime ${selected ? "border-lemon-lime" : "border-gray-300"}`}
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
                                className={`cursor-pointer py-3 px-4 transition duration-200 ease-in-out hover:bg-lemon-lime ${
                                    item && (item as any)._id === (selected as any)?._id && "bg-lemon-lime font-semibold"
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