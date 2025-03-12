import { FcEnteringHeavenAlive } from "react-icons/fc";
import { FaDatabase } from "react-icons/fa";


export default function SlideBar () {
    
    return (
        <aside className="w-1/4 bg-soft-sky-blue p-4 text-white">
            <ul>
                <li className="p-2 hover:bg-muted-teal">Data Entry</li>
                <li className="p-2 hover:bg-muted-teal">Approvals</li>
                <li className="p-2 hover:bg-muted-teal">Chart</li>
            </ul>
        </aside>
    )
}