import {react} from 'react';
import {Link} from 'react-router-dom';
const Navbar=()=>{
    return(
        <nav className='bg-red-600 text-white p-4 shadow-md sticky top-0 z-50'>
            <div className='max-w-7xl mx-auto flex justify-between items-center'>
                <Link to="/" className="text-2xl font-bold">📰News Today</Link>
                <div className="space-x-4">
                    <Link to="/" className="hover:underline">Home</Link>
                    <Link to="/add" className="hover:underline">Add News</Link>
                    <Link to="/login" className="hover:underline">Login</Link>
                    <Link to="/register" className="hover:underline">Register</Link>
                </div>
            </div>
        </nav>
    )
} 
export default Navbar;