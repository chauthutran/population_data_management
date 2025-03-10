export default function SlideBar () {
    
    return (
        <>
            <aside className="w-64 bg-sidebar-bg text-white p-6">
                <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
                <nav>
                    <ul>
                        <li className="mb-4"><a href="#" className="block py-2 px-4 bg-opacity-90 rounded-lg">Data Entry</a></li>
                        <li className="mb-4"><a href="#" className="block py-2 px-4 hover:bg-opacity-90 rounded-lg">Approvals</a></li>
                        <li><a href="#" className="block py-2 px-4 hover:bg-opacity-90 rounded-lg">Charts</a></li>
                    </ul>
                </nav>
            </aside>
        </>
    )
}