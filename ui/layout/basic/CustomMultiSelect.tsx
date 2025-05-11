import useAsyncData from '@/hooks/useAsyncData';
import useClickOutside from '@/hooks/useClickOutside';
import { ReactNode, useEffect, useState } from 'react';

export default function CustomMultiSelect<T>({
    title,
    displayProp,
    valueProp,
    options,
    onChange,
    selected,
    children,
}: {
    title: string;
    displayProp: string;
    valueProp: string;
    options: T[];
    onChange: (value: T[]) => void;
    selected?: T[] | null;
    children?: ReactNode;
}) {
    const [selectedItems, setSelectedItems] = useState<T[]>(selected ?? []); // Default to empty array if null or undefined
    const [showed, setShowed] = useState<boolean>(false);
    const dropdownRef = useClickOutside(() => setShowed(false)); // Close dropdown when clicked outside

    useEffect(() => {}, [selected, options]);

    useEffect(() => {
        setSelectedItems(selected ?? []);
    }, [selected]);

    const toggleSelect = (item: T) => {
        const exists = selectedItems.some(
            (v) => (v as any)[valueProp] === (item as any)[valueProp],
        );
        const newValues = exists
            ? selectedItems.filter(
                  (v) => (v as any)[valueProp] !== (item as any)[valueProp],
              )
            : [...selectedItems, item];

        setSelectedItems(newValues);
        onChange(newValues);
    };

    if (options === null) return <>Loading ...</>;

    return (
        <div className="relative w-full max-h-40 " ref={dropdownRef}>
            {/* Selected Options */}
            <div
                className="border border-gray-300 rounded-lg p-2 cursor-pointer bg-white flex justify-between items-center"
                onClick={() => setShowed(!showed)}
            >
                <div className="flex flex-wrap gap-3">
                    {selectedItems.length > 0 ? (
                        selectedItems.map((item, index) => (
                            <span
                                key={index}
                                className="bg-gray-500 text-white text-sm px-2 py-1 rounded flex items-center"
                            >
                                {(item as any)[displayProp]}
                                <button
                                    className="ml-2 text-white hover:text-red-400"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleSelect(item);
                                    }}
                                >
                                    ✕
                                </button>
                            </span>
                        ))
                    ) : (
                        <span className="text-gray-400">{title}</span>
                    )}
                </div>

                {/* Arrow Icon */}
                {showed ? <span>🞃</span> : <span>🞁</span>}
            </div>

            {/* Dropdown Menu */}
            {showed && (
                <>
                    {children}
                    <div className="absolute z-10 max-h-full w-full bg-white rounded-lg shadow-lg">
                        <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-b-lg">
                            {options!.map((item, index) => {
                                const exists = selectedItems.some(
                                    (v) =>
                                        (v as any)[valueProp] ===
                                        (item as any)[valueProp],
                                );

                                return (
                                    <div
                                        key={index}
                                        className={`p-2 cursor-pointer hover:bg-gray-100 flex items-center ${
                                            exists ? 'bg-gray-200' : 'bg-white'
                                        }`}
                                        onClick={() => toggleSelect(item)}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={exists}
                                            className="mr-2"
                                            readOnly
                                        />
                                        {(item as any)[displayProp]}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
