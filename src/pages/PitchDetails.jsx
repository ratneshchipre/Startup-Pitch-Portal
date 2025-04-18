import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faDollarSign } from '@fortawesome/free-solid-svg-icons'
import { faList } from '@fortawesome/free-solid-svg-icons'
import { faPaperclip } from '@fortawesome/free-solid-svg-icons'
import { faTag } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-regular-svg-icons'
import { faAddressBook } from '@fortawesome/free-solid-svg-icons'
import { faStarHalfStroke } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import recipeApp from "../assets/recipeApp.mp4";
import tempImg from "../assets/tempImg.jpg";
import { useNavigate } from 'react-router-dom'

const PitchDetails = () => {
    const navigate = useNavigate();

    return (
        <div className='flex flex-col w-full'>
            <div className='absolute z-100 mini-desktop:w-[80%] mini-desktop:right-0 flex w-full min-h-screen'>
                <div className={`flex flex-col bg-nav-white w-full min-h-screen px-[1.5rem] pt-[1.5rem] pb-[1.5rem] mini-desktop:pb-[0rem] transition-all duration-300 ease-in-out mini-desktop:shadow-2xl`}>
                    <div className='w-full border-b-border border-b-[1px]'>
                        <FontAwesomeIcon onClick={() => navigate(-1)} icon={faArrowLeft} className='text-btn-blue text-[1.5rem] cursor-pointer pb-[1rem]' />
                    </div>
                    <div className='flex flex-col w-full mini-desktop:flex-row mini-desktop:gap-[3rem]'>
                        <div className='flex flex-col w-full mini-desktop:w-[70%]'>
                            <div className='flex flex-col mt-[1.5rem]'>
                                <h2 className='font-Medium text-txt-black text-[1.3rem] '>AI Tutor: Your Personalized Learning Assistant</h2>
                                <p className='font-Regular text-txt-gray-black mt-[2rem] mb-[2rem] pb-[1.5rem] border-b-border border-b-[1px]'>AI Tutor is an intelligent, real-time assistant that helps students learn complex topics by simplifying concepts, generating practice questions, and tracking progress. It's designed for school and college students, integrated with voice input, visual explanations, and instant doubt resolution.</p>
                            </div>
                            <div className='flex flex-col gap-[2rem] border-b-border border-b-[1px] pb-[1.5rem]'>
                                <div className='flex gap-[0.5rem]'>
                                    <FontAwesomeIcon icon={faDollarSign} className='text-txt-black text-[1.1rem] cursor-pointer pb-[1rem] mt-[0.2rem] ml-[0.3rem]' />
                                    <div className='flex flex-col'>
                                        <span className='font-Medium text-txt-black'>Proposed Funding</span>
                                        <span className='font-Regular text-txt-gray-black'>$1000</span>
                                    </div>
                                </div>
                                <div className='flex gap-[0.5rem]'>
                                    <FontAwesomeIcon icon={faList} className='text-txt-black text-[1.1rem] cursor-pointer pb-[1rem] mt-[0.2rem]' />
                                    <div className='flex flex-col'>
                                        <span className='font-Medium text-txt-black'>Pitch Category</span>
                                        <span className='font-Regular text-txt-gray-black'>Tech</span>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col mt-[1.5rem] pb-[2rem] border-b-border border-b-[1px]'>
                                <div className='flex gap-[0.7rem]'>
                                    <FontAwesomeIcon icon={faPaperclip} className='text-txt-black text-[1.1rem] cursor-pointer pb-[1rem] mt-[0.2rem]' />
                                    <h2 className='font-Medium text-txt-black'>Pitch Attachments</h2>
                                </div>
                                <div className='mt-[1rem] h-[15rem] w-full'>
                                    <video src={recipeApp} controls className='rounded-2xl h-[15rem]'></video>
                                    {/* <img src={tempImg} className='rounded-2xl h-full w-full object-cover bg-center'></img> */}
                                </div>
                            </div>
                            <div className='flex flex-col mt-[1.5rem] border-b-border border-b-[1px] mini-desktop:pb-[1rem] mini-desktop:border-none'>
                                <div className='flex gap-[0.7rem]'>
                                    <FontAwesomeIcon icon={faComment} className='text-txt-black text-[1.1rem] cursor-pointer pb-[1rem] mt-[0.2rem]' />
                                    <h2 className='font-Medium text-txt-black'>Feedback</h2>
                                </div>
                                <div className='mt-[0.8rem] w-full pb-[2rem] mini-desktop:pb-[0rem]'>
                                    <textarea placeholder='Write a feedback...' className='w-full font-Medium text-txt-gray-black rounded-lg py-[0.7rem] px-[0.8rem] h-[12rem] bg-dash-border resize-none'></textarea>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col w-full mini-desktop:w-[30%]'>
                            <div className='mt-[1.5rem] flex flex-col gap-[0.7rem] pb-[2rem] border-b-border border-b-[1px]'>
                                <div className='flex gap-[0.7rem]'>
                                    <FontAwesomeIcon icon={faTag} className='text-txt-black text-[1.1rem] cursor-pointer pb-[1rem] mt-[0.2rem]' />
                                    <h2 className='font-Medium text-txt-black'>Tags</h2>
                                </div>
                                <div className='w-full flex flex-wrap'>
                                    <ul className='w-full flex flex-wrap gap-y-[1.5rem] gap-x-[0.8rem]'>
                                        {['AI', 'Tech', 'Healthcare', 'Founder', 'Machines', 'Finance', 'Innovative', 'Blockchain'].map((tag, index) => (
                                            <li key={index}>
                                                <span className='font-Medium text-btn-blue bg-blue-50 py-[0.4rem] px-[0.7rem] rounded-lg border-btn-blue border-[1px]'>
                                                    {tag}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className='flex flex-col mt-[1.5rem] pb-[1rem]'>
                                <div className='flex gap-[0.7rem]'>
                                    <FontAwesomeIcon icon={faStarHalfStroke} className='text-txt-black text-[1.1rem] cursor-pointer pb-[1rem] mt-[0.2rem]' />
                                    <h2 className='font-Medium text-txt-black'>Give your Rating</h2>
                                </div>
                                <div className='mt-[0.8rem] w-full pb-[3.5rem]'>
                                    <div className='flex gap-[0.3rem]'>
                                        <FontAwesomeIcon icon={faStar} className='text-btn-blue cursor-pointer' />
                                        <FontAwesomeIcon icon={faStar} className='text-btn-blue cursor-pointer' />
                                        <FontAwesomeIcon icon={faStar} className='text-btn-blue cursor-pointer' />
                                        <FontAwesomeIcon icon={faStar} className='text-btn-blue cursor-pointer' />
                                        <FontAwesomeIcon icon={faStar} className='text-border cursor-pointer' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='fixed mini-desktop:sticky mini-desktop:right-0 mini-desktop:items-end mini-desktop:justify-end left-0 w-full flex flex-col justify-between items-center bg-nav-white bottom-0 '>
                        <div className='w-full flex flex-col justify-between items-center bg-nav-white'>
                            <hr className='w-full flex text-dash-border' />
                            <div className='flex w-full'>
                                <div className='w-full py-[1rem] pl-[0.7rem] pr-[0.4rem]'>
                                    <button className='w-full flex justify-center items-center font-Medium bg-btn-blue  border-btn-blue border-[1px] py-[0.5rem] rounded-lg text-nav-white cursor-pointer hover:bg-hover-blue transition-all'>
                                        <FontAwesomeIcon icon={faAddressBook} className='text-[1.2rem] text-nav-white mr-[0.5rem]' />
                                        Contact Now
                                    </button>
                                </div>
                                <div className='w-full py-[1rem] pr-[0.7rem] pl-[0.4rem]'>
                                    <button className='w-full flex justify-center items-center font-Medium border-btn-blue border-[1px] py-[0.5rem] rounded-lg cursor-pointer text-btn-blue hover:bg-dash-border transition-all'>
                                        <FontAwesomeIcon icon={faHeartRegular} className='text-[1.2rem] text-btn-blue mr-[0.5rem]' />
                                        Save Pitch
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PitchDetails