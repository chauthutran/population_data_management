export default function Header () {
    
    return (
        <header className="flex justify-between items-center bg-[var(--navbar-bg)] p-4 rounded-lg shadow-md">
            <h1 className="text-xl font-semibold">Population Data Management</h1>
            <button className="bg-button-danger text-white px-4 py-2 rounded-lg">Logout</button>
        </header>
    )
}