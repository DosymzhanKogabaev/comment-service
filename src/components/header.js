import React, { useState, useEffect } from 'react'
import logo from '../assets/logo2.png'
import { Link, useNavigate } from 'react-router-dom'
import SearchCompanies from './searchCompanies'

function isAuthorized() {
    const token = localStorage.getItem('access_token')
    if(token) return true
    return false
}

function isAuthorizedUser() {
    const user = localStorage.getItem('user')
    if(user) return true
    return false
}

const Header = ({companies}) => {
    const [isAuth, setIsAuth] = useState(isAuthorized())
    const [isUser, setIsUser] = useState(isAuthorizedUser())
    const navigate = useNavigate();

    const handleNavigateToProfile = () => {
        navigate('/profile');
    }

    return (
        <div className="border-b shadow-lg">
            <div className='wrapper flex items-center justify-between'>
                <div className='flex gap-x-8 items-center'>
                    <Link to='/'><img src={logo} className='h-16' alt='logo'></img></Link>
                    <SearchCompanies companies={companies}></SearchCompanies>
                </div>
                {
                    isAuth ? 
                    <div className='flex'>
                        <Link to='/add-review' className='h-full py-6 px-6 hover:bg-[#f4f9ff]'>
                            <svg className="mx-auto"  xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='#3460A4'>
                                <path d='M12 2A10 10 0 0 0 2 12a9.9 9.9 0 0 0 2.26 6.33l-2 2a1 1 0 0 0-.21 1.09A1 1 0 0 0 3 22h9a10 10 0 0 0 0-20m0 18H5.41l.93-.93a1 1 0 0 0 0-1.41A8 8 0 1 1 12 20m3-9h-2V9a1 1 0 1 0-2 0v2H9a1 1 0 0 0 0 2h2v2a1 1 0 0 0 2 0v-2h2a1 1 0 1 0 0-2'/>
                            </svg>
                            <div className='text-[#3460A4]'>Leave Review</div>
                        </Link>
                        <button className='h-full py-6 px-6 hover:bg-[#f4f9ff]'>
                            <svg className="mx-auto" xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='#3460A4'>
                                <path d='M20 17h2v2H2v-2h2v-7a8 8 0 1 1 16 0zm-2 0v-7a6 6 0 0 0-12 0v7zm-9 4h6v2H9z'/>
                            </svg>
                            <div className='text-[#3460A4]'>Notifications</div>
                        </button>
                        <button onClick={handleNavigateToProfile} className='h-full py-6 px-6 hover:bg-[#f4f9ff]' type="button">
                            <svg className='mx-auto' xmlns='http://www.w3.org/2000/svg' width='25' height='24' fill='#3460A4'>
                                <path d='M16.21 12.71a6 6 0 1 0-7.42 0 10 10 0 0 0-6.22 8.18 1.006 1.006 0 1 0 2 .22 8 8 0 0 1 15.9 0 1 1 0 0 0 1 .89h.11a1 1 0 0 0 .88-1.1 10 10 0 0 0-6.25-8.19M12.5 12a4 4 0 1 1 0-8.001 4 4 0 0 1 0 8Z'/>
                            </svg>
                            <div className='text-[#3460A4]'>Profile</div>
                        </button>
                    </div> :
                    <div className="flex gap-4">
                        <Link to='/sign-in'>
                            <button className='text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'>Sign In</button>
                        </Link>
                        <Link to='/sign-up'>
                            <button className='text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'>Sign Up</button>
                        </Link>
                    </div>
                }   
            </div>
        </div>
    )
}
export default Header