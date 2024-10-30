import React, {useEffect, useState} from 'react'
import logo from '../assets/logo2.png'
import { Link, useNavigate, useLocation } from 'react-router-dom'

const Sidebar = () => {
    const navigate = useNavigate()
    const [activeLocation, setActiveLocation] = useState('profile')
    const handleLogout = () => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('user')
        localStorage.removeItem('company')
        navigate('/')
    }
    const location = useLocation();

    useEffect(() => {
        if(location.pathname === '/reviews') setActiveLocation('reviews')
        else setActiveLocation('profile')
    }, [location]);
    return (
        <div className='w-1/4 px-4 py-6 border-2 h-screen flex flex-col justify-between min-w-48'>
            <div>
                <div className='mb-8'>
                    <Link to='/'>
                        <img alt='logo' src={logo} className='w-full'></img>
                    </Link>
                </div>
                <Link to='/reviews'>
                    <div className={activeLocation === 'reviews' ? 'border-b-2 px-2 py-4 flex gap-2 text-lg text-primary-600 bg-primary-100' : 'border-b-2 px-2 py-4 flex gap-2 text-lg text-gray-600'}>
                        <div className="bg-reviews w-6 h-6 my-auto"></div>
                        <div>My Reviews</div>
                    </div>
                </Link>
                <Link to='/profile'>
                    <div className={activeLocation === 'profile'? 'border-b-2 px-2 py-4 flex gap-2 text-lg text-primary-600 bg-primary-100' : 'border-b-2 px-2 py-4 flex gap-2 text-lg text-gray-600'}>
                        <div className="bg-user w-6 h-6 my-auto"></div>
                        <div>My Profile</div>
                    </div>
                </Link>
            </div>
            <div>
                <button onClick={handleLogout} className='px-2 py-4 flex gap-2 text-lg text-gray-600'>
                    <div className="bg-logout w-6 h-6 my-auto"></div>
                    <div>Sign Out</div>
                </button>
            </div>
        </div>
    )
}
export default Sidebar