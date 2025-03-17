export default function DisableField (
{
    title,
}: {
    title: string;
}
) {
    
    return (
        <div className={`text-justify flex items-center cursor-pointer py-2 px-3 relative border-2 rounded-md bg-gray-200 focus:ring-2 border-gray-300 text-gray-700`}
        >{title}</div>
    )
}