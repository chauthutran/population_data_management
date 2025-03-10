export default function LoginForm () {
    
    return (
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
            <h2 className="text-3xl font-bold text--text-color mb-4">Welcome</h2>
            <p className="text-gray-600 mb-6">Manage and visualize population data with ease.</p>
            
            <form>
                <input type="email" placeholder="Email" className="w-full p-3 border rounded-md mb-4"/>
                <input type="password" placeholder="Password" className="w-full p-3 border rounded-md mb-4"/>
                <button className="bg-button-primary text-white px-4 py-3 rounded-lg w-full">Login</button>
            </form>
    
            <p className="text-gray-600 mt-4">Don't have an account? <a href="#" className="text-primary-bg font-semibold">Sign up</a></p>
        </div>
    )
}