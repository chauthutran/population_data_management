export default function SelectionHeader ({
    title,
    showed,
    setShowed,
    disabled,
}: {
    title: string;
    showed: boolean;
    setShowed: (flag: boolean) => void;
    disabled: boolean;
}) {
    
    const handleOnClick = () => {
        if (!disabled) {
            console.log("Clicked");
            setShowed(!showed);  // use functional form of setState to avoid stale closure
        }
    }
    
    return (
        <div 
            className={`cursor-pointer py-2 px-3 space-x-3 text-justify flex items-center text-gray-700 ${disabled && "bg-gray-200"}`} 
            onClick={handleOnClick}
        >
            <span className="flex-1 truncate-text">{title}</span>
            {showed && (
                <span className="">
                    &#128899;
                </span>
            )}
            {!showed && (
                <span className="">
                    &#128897;
                </span>
            )}
        </div>
    )
}