import useAsyncData from "@/hooks/useAsyncData";
import useClickOutside from "@/hooks/useClickOutside";
import { useEffect, useState } from "react";

export default function CustomMultiSelect<T>({
	title,
	displayProp,
	valueProp,
	fetchData,
	onChange,
}: {
	title: string;
	displayProp: string;
	valueProp: string;
	fetchData: () => Promise<T[]>;
	onChange: (value: T[]) => void;
}) {
	const { data, error, refetch, loading } = useAsyncData<T[]>();
	const [selected, setSelected] = useState<T[]>([]);
	const [showed, setShowed] = useState<boolean>(false);
	const dropdownRef = useClickOutside(() => setShowed(false)); // Close dropdown when clicked outside

	useEffect(() => {
		refetch(fetchData);
	}, []);

	const toggleSelect = (item: T) => {
		const exists = selected.some((v) => (v as any)[valueProp] === (item as any)[valueProp]);
		const newValues = exists
		? selected.filter((v) => (v as any)[valueProp] !== (item as any)[valueProp])
		: [...selected, item];

		setSelected(newValues);
		onChange(newValues);
	};

  	if (loading) return <>Loading ...</>;

	return (
		<div className="relative w-full" ref={dropdownRef}>
			{/* Selected Options */}
			<div
				className="border border-gray-300 rounded-lg p-2 cursor-pointer bg-white flex justify-between items-center"
				onClick={() => setShowed(!showed)}
			>
				<div className="flex flex-wrap gap-1">
				{selected.length > 0 ? (
					selected.map((item, index) => (
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
				<div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
				{data!.map((item, index) => {
					const exists = selected.some((v) => (v as any)[valueProp] === (item as any)[valueProp]);

					return (
					<div
						key={index}
						className={`p-2 cursor-pointer hover:bg-gray-100 flex items-center ${
						exists ? "bg-gray-200" : ""
						}`}
						onClick={() => toggleSelect(item)}
					>
						<input type="checkbox" checked={exists} className="mr-2" readOnly />
						{(item as any)[displayProp]}
					</div>
					);
				})}
				</div>
			)}
		</div>
	);
}
