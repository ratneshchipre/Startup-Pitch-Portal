import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import headLogo from "../assets/headLogo(black).png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className='flex justify-center items-center'>
            <div className={`fixed flex justify-between items-center w-full top-0 py-[0.8rem] ${isOpen ? 'border-b-dash-border border-b-[1.5px]' : ''} px-[1.5rem] lg:px-[4rem] xl:px-[7rem] z-50 backdrop-blur-sm bg-nav-white/70`}>
                <Link to='/' className='font-Medium'>
                    <div className='flex items-center'>
                        <h1 className='text-txt-black text-[1.4rem]'>NextMove</h1>
                        <img src={headLogo} alt="logo" className='h-[4rem] ml-[-0.5rem]' />
                    </div>
                </Link>
                <div className='flex gap-[0.8rem] items-center'>
                    <Link to='/account/login' className='hidden items-center font-Regular text-[1rem] sm:flex'>
                        <button className='cursor-pointer'>
                            <h3 className='text-txt-gray-black hover:text-txt-black'>LogIn</h3>
                        </button>
                    </Link>
                    <Link to='/account/signup' className='hidden items-center font-Regular text-[1rem] sm:flex'>
                        <button className='bg-btn-blue hover:bg-hover-blue py-[0.3rem] px-[0.8rem] rounded-3xl cursor-pointer transition'>
                            <h3 className='text-nav-white'>Sign Up</h3>
                        </button>
                    </Link>
                    <button className='text-[1.3rem] ml-[0.8rem] cursor-pointer sm:hidden'>
                        <FontAwesomeIcon onClick={() => setIsOpen(!isOpen)} icon={faBars} />
                    </button>
                </div>
            </div>
            {isOpen &&
                <div className='fixed top-0 backdrop-blur-sm bg-nav-white/70 border-b-dash-border border-b-[1.5px] flex flex-col w-full h-[13rem] items-end justify-end pb-[1.6rem] pr-[1.5rem]'>
                    <div className='flex flex-col justify-end gap-[1rem] items-end'>
                        <Link to='/account/login' onClick={() => setIsOpen(false)} className='flex items-center font-Medium text-[1rem]'>
                            <button className='cursor-pointer'>
                                <h3 className='text-txt-gray-black hover:text-txt-black text-[1.1rem]'>LogIn</h3>
                            </button>
                        </Link>
                        <Link to='/account/signup' onClick={() => setIsOpen(false)} className='flex items-center font-Medium text-[1rem]'>
                            <button className='cursor-pointer'>
                                <h3 className='text-txt-gray-black hover:text-txt-black text-[1.1rem]'>Sign Up</h3>
                            </button>
                        </Link>
                    </div>
                </div>
            }
        </nav>
    )
}

export default Navbar