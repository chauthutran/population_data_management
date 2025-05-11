interface AccordionPanelProps {
    title: string;
    children: React.ReactNode;
    isOpen: boolean;
    onClick: () => void;
    className?: string;
}

export default function AccordionPanel({
    title,
    children,
    isOpen,
    onClick,
    className,
}: AccordionPanelProps) {
    return (
        <div
            className={`border border-gray-200 ${isOpen && 'h-full'} flex flex-col`}
        >
            {/* Header */}
            <button
                onClick={onClick}
                className={`w-full flex justify-between items-center bg-gray-100 px-4 py-2 text-left ${className}`}
            >
                <span className="font-medium">{title}</span>
            </button>

            {/* Content with smooth transition */}
            <div
                className={`transition-all duration-300 overflow-hidden ${
                    isOpen
                        ? 'flex-1 opacity-100 p-4 border-t'
                        : 'max-h-0 opacity-0'
                }`}
            >
                {isOpen && children}
            </div>
        </div>
    );
}
