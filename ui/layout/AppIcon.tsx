import Image from "next/image";

export default function AppIcon({size}: {size: number}) {
    return (
        <div
            className="rounded-full bg-white flex items-center justify-center flex-shrink-0"
            style={{ width: size, height: size }}
        >
            <Image src="/lego1.svg" alt="Population Icon" width={size * 0.8} height={size * 0.8} />
        </div>
        // <div className="text-lg font-bold rounded-full bg-white p-2">
        //     <Image src="/lego1.svg" alt="Population Icon" />
        // </div>
    )
}