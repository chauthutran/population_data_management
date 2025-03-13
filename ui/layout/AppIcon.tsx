import Image from "next/image";

export default function AppIcon({size}: {size: number}) {
    return (
        <div className="text-lg font-bold rounded-full bg-white p-2">
            <Image src="/lego1.svg" alt="Population Icon" width={size} height={size} />
        </div>
    )
}