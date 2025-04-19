import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import avatarImg from "../assets/avatarImg.png";

const Feedback = () => {
    return (
        <div className='flex flex-col w-full'>
            <div className='w-full mini-desktop:w-auto px-[1.5rem] py-[1rem] mt-[4.6rem] mini-desktop:ml-[20rem]'>
                <div className='flex justify-between gap-[2rem] items-center w-full'>
                    <h1 className='font-Bold text-txt-black text-[1.6rem]'>Feedbacks</h1>
                    <div className='bg-blue-200 text-center py-[0.5rem] px-[1rem] rounded-lg'>
                        <span className='font-Medium text-[1.3rem] text-txt-black'>Average: 4 <FontAwesomeIcon icon={faStar} className='text-blue-500 ml-[0.3rem]' /></span>
                    </div>
                </div>
                <div className='flex flex-col tablet-2:flex-row pb-[1.5rem] gap-[1.7rem] mt-[2.5rem]'>
                    <div className='flex flex-col items-start bg-cream-white tablet-2:w-full px-[2rem] py-[1.5rem] rounded-lg shadow-md'>
                        <div className='flex flex-col gap-[1.2rem]'>
                            <div className='flex gap-[1.3rem]'>
                                <div className='flex gap-[0.5rem] w-[3rem] rounded-[50%] items-center'>
                                    <img src={avatarImg} alt="avatar" className='h-full w-full object-cover bg-center' />
                                </div>
                                <div>
                                    <h3 className='font-Medium text-[1.1rem] text-txt-black'>Ratnesh Chipre</h3>
                                    <span className='font-Regular text-[1.1rem] text-txt-gray-black'>4 <FontAwesomeIcon icon={faStar} className='text-blue-500 ml-[0.2rem]' /></span>
                                </div>
                            </div>
                            <div className='flex flex-col'>
                                <span className='font-Regular text-txt-gray-black text-[1.1rem]'>Strong vision but needs more financial projections.</span>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col items-start gap-[5rem] tablet-2:w-full bg-cream-white px-[2rem] py-[1.5rem] rounded-lg shadow-md'>
                        <div className='flex flex-col gap-[1.2rem]'>
                            <div className='flex gap-[1.3rem]'>
                                <div className='flex gap-[0.5rem] w-[3rem] rounded-[50%] items-center'>
                                    <img src={avatarImg} alt="avatar" className='h-full w-full object-cover bg-center' />
                                </div>
                                <div>
                                    <h3 className='font-Medium text-[1.1rem] text-txt-black'>Ratnesh Chipre</h3>
                                    <span className='font-Regular text-[1.1rem] text-txt-gray-black'>4 <FontAwesomeIcon icon={faStar} className='text-blue-500 ml-[0.2rem]' /></span>
                                </div>
                            </div>
                            <div className='flex flex-col'>
                                <span className='font-Regular text-txt-gray-black text-[1.1rem]'>Strong vision but needs more financial projections.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Feedback