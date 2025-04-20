import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFirebase } from '../contexts/Firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowLeft, faDollarSign, faList, faPaperclip, faTag,
    faAddressBook, faStar, faStarHalfStroke
} from '@fortawesome/free-solid-svg-icons';
import { faComment, faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import recipeApp from "../assets/recipeApp.mp4";

const PitchDetails = () => {
    const navigate = useNavigate();
    const { pitchID } = useParams();
    const firebase = useFirebase();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { role } = useParams()

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);
    const [locked, setLocked] = useState(false);

    useEffect(() => {
        if (pitchID) {
            firebase.getPitchByID(pitchID).then((value) => {
                if (value.exists()) {
                    const pitchData = value.data();
                    console.log("🔥 Tags field from Firestore:", pitchData.tags); // 👈 ADD THIS
                    setData(pitchData);
                }
                setLoading(false);
            });
        }
    }, [firebase, pitchID]);

    const handleClick = (value, e) => {
        if (locked) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const isHalf = e.clientX - rect.left < rect.width / 2;
        const selected = isHalf ? value - 0.5 : value;
        setRating(selected);
        setLocked(true);
    };

    const handleMouseMove = (value, e) => {
        if (locked) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const isHalf = e.clientX - rect.left < rect.width / 2;
        const hovered = isHalf ? value - 0.5 : value;
        setHover(hovered);
    };

    const handleMouseLeave = () => {
        if (locked) return;
        setHover(null);
    };

    const getStarClass = (value) => {
        const activeValue = hover !== null ? hover : rating;
        if (value <= activeValue) return 'text-btn-blue';
        if (value - 0.5 === activeValue) return 'text-btn-blue';
        return 'text-gray-300';
    };

    if (loading) {
        return <p className="text-center mt-10">Loading pitch details...</p>;
    }

    if (!data) {
        return <p className="text-center mt-10 text-red-500">Pitch not found.</p>;
    }

    const tagsArray = Array.isArray(data.tags)
        ? data.tags
        : typeof data.tags === 'string'
            ? data.tags.split(',').map(tag => tag.trim()).filter(Boolean)
            : [];

    return (
        <div className='flex flex-col w-full'>
            <div className='absolute z-100 mini-desktop:w-[80%] mini-desktop:right-0 flex w-full min-h-screen'>
                <div className='flex flex-col bg-nav-white w-full min-h-screen px-[1.5rem] pt-[1.5rem] pb-[1.5rem] mini-desktop:pb-[0rem] transition-all duration-300 ease-in-out mini-desktop:shadow-2xl'>
                    <div className='w-full border-b-border border-b-[1px]'>
                        <FontAwesomeIcon onClick={() => navigate(-1)} icon={faArrowLeft} className='text-btn-blue text-[1.5rem] cursor-pointer pb-[1rem]' />
                    </div>

                    <div className='flex flex-col w-full mini-desktop:flex-row mini-desktop:gap-[3rem]'>
                        <div className='flex flex-col w-full mini-desktop:w-[70%]'>

                            {/* Title + Description */}
                            <div className='flex flex-col mt-[1.5rem]'>
                                <h2 className='font-Medium text-txt-black text-[1.3rem]'>{data.pitch || 'Untitled Pitch'}</h2>
                                <p className='font-Regular text-txt-gray-black mt-[2rem] mb-[2rem] pb-[1.5rem] border-b-border border-b-[1px]'>
                                    {data.PitchDetails || 'No description provided.'}
                                </p>
                            </div>

                            {/* Funding + Category */}
                            <div className='flex flex-col gap-[2rem] border-b-border border-b-[1px] pb-[1.5rem]'>
                                <div className='flex gap-[0.5rem]'>
                                    <FontAwesomeIcon icon={faDollarSign} className='text-txt-black text-[1.1rem] mt-[0.2rem]' />
                                    <div className='flex flex-col'>
                                        <span className='font-Medium text-txt-black'>Proposed Funding</span>
                                        <span className='font-Regular text-txt-gray-black'>${data.funding_goal || 'Not specified'}</span>
                                    </div>
                                </div>
                                <div className='flex gap-[0.5rem]'>
                                    <FontAwesomeIcon icon={faList} className='text-txt-black text-[1.1rem] mt-[0.2rem]' />
                                    <div className='flex flex-col'>
                                        <span className='font-Medium text-txt-black'>Pitch Category</span>
                                        <span className='font-Regular text-txt-gray-black'>{data.category || 'N/A'}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Attachments */}
                            <div className={`flex flex-col mt-[1.5rem] pb-[2rem] ${role === 'founder' ? 'border-none' : 'border-b-border border-b-[1px]'}`}>
                                <div className='flex gap-[0.7rem]'>
                                    <FontAwesomeIcon icon={faPaperclip} className='text-txt-black text-[1.1rem] mt-[0.2rem]' />
                                    <h2 className='font-Medium text-txt-black'>Pitch Attachments</h2>
                                </div>
                                <div className='mt-[1rem] h-[22rem] w-full'>
                                    <video src={recipeApp} controls className='rounded-2xl h-full w-full object-cover'></video>
                                </div>
                            </div>

                            {/* Feedback Textarea */}
                            {role != 'founder' &&
                                <div className='flex flex-col mt-[1.5rem] border-b-border border-b-[1px] mini-desktop:pb-[1rem] mini-desktop:border-none'>
                                    <div className='flex gap-[0.7rem]'>
                                        <FontAwesomeIcon icon={faComment} className='text-txt-black text-[1.1rem] mt-[0.2rem]' />
                                        <h2 className='font-Medium text-txt-black'>Feedback</h2>
                                    </div>
                                    <div className='mt-[0.8rem] w-full pb-[2rem] mini-desktop:pb-[0rem]'>
                                        <textarea placeholder='Write a feedback...' className='w-full font-Medium text-txt-gray-black rounded-lg py-[0.7rem] px-[0.8rem] h-[12rem] bg-dash-border resize-none'></textarea>
                                    </div>
                                </div>
                            }
                        </div>

                        {/* Tags + Rating */}
                        <div className='flex flex-col w-full mini-desktop:w-[30%]'>

                            {/* Tags */}
                            <div className={`mt-[1.5rem] flex flex-col gap-[0.7rem] ${role === 'founder' ? 'border-none pb-[5rem]' : 'border-b-border border-b-[1px] pb-[2rem]'}`}>
                                <div className='flex gap-[0.7rem]'>
                                    <FontAwesomeIcon icon={faTag} className='text-txt-black text-[1.1rem]' />
                                    <h2 className='font-Medium text-txt-black'>Tags</h2>
                                </div>
                                <div className='flex flex-wrap gap-y-[1.5rem] gap-x-[0.8rem]'>
                                    {tagsArray.length > 0 ? (
                                        tagsArray.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="bg-blue-100 text-btn-blue font-Medium text-sm px-3 py-1 rounded-lg border border-btn-blue"
                                            >
                                                {tag}
                                            </span>
                                        ))
                                    ) : (
                                        <p className="font-Regular text-border">No tags available.</p>
                                    )}
                                </div>
                            </div>

                            {/* Rating */}
                            {role != 'founder' &&
                                <div className='flex flex-col mt-[1.5rem] pb-[1rem]'>
                                    <div className='flex gap-[0.7rem]'>
                                        <FontAwesomeIcon icon={faStarHalfStroke} className='text-txt-black text-[1.1rem]' />
                                        <h2 className='font-Medium text-txt-black'>Give your Rating</h2>
                                    </div>
                                    <div className='mt-[0.8rem] flex gap-[0.3rem] pb-[3.5rem]'>
                                        {[1, 2, 3, 4, 5].map((value) => (
                                            <FontAwesomeIcon
                                                icon={faStar}
                                                key={value}
                                                className={`cursor-pointer text-[1.3rem] transition-all ${getStarClass(value)}`}
                                                onClick={(e) => handleClick(value, e)}
                                                onMouseMove={(e) => handleMouseMove(value, e)}
                                                onMouseLeave={handleMouseLeave}
                                            />
                                        ))}
                                    </div>
                                </div>
                            }
                        </div>
                    </div>

                    {/* Bottom Buttons */}
                    <div className='fixed mini-desktop:sticky left-0 w-full flex flex-col bg-nav-white bottom-0'>
                        <hr className='w-full text-dash-border' />
                        <div className='flex w-full'>
                            <div className='w-full py-[1rem] pl-[0.7rem] pr-[0.4rem]'>
                                <button className='w-full flex justify-center items-center font-Medium bg-btn-blue border-btn-blue border-[1px] py-[0.5rem] rounded-lg text-nav-white cursor-pointer hover:bg-hover-blue transition-all'>
                                    <FontAwesomeIcon icon={faAddressBook} className='text-[1.2rem] text-nav-white mr-[0.5rem]' />
                                    Contact Now
                                </button>
                            </div>
                            {role != 'founder' &&
                                <div className='w-full py-[1rem] pr-[0.7rem] pl-[0.4rem]'>
                                    <button className='w-full flex justify-center items-center font-Medium border-btn-blue border-[1px] py-[0.5rem] rounded-lg cursor-pointer text-btn-blue hover:bg-dash-border transition-all'>
                                        <FontAwesomeIcon icon={faHeartRegular} className='text-[1.2rem] text-btn-blue mr-[0.5rem]' />
                                        Save Pitch
                                    </button>
                                </div>
                            }
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PitchDetails;

