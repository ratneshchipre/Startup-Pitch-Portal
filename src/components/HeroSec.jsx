import React from 'react'
import { motion } from 'framer-motion';
import { fadeInUp, fadeIn, btnFadeInUp } from '../utils/motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import uploadPitchImg from "../assets/uploadPitchImg.png";
import gridTunnelImg from "../assets/gridTunnelImg.jpg";

const HeroSec = ({ sectionRef }) => {
    const scrollToSection = () => {
        if (sectionRef.current) {
            const yOffset = -80;
            const y =
                sectionRef.current.getBoundingClientRect().top +
                window.pageYOffset +
                yOffset;

            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <div className='flex flex-col justify-center items-center w-full px-[2rem] mini-desktop:px-[3rem] lg:px-[4rem] xl:px-[8rem] pt-[8rem] pb-[3rem] overflow-hidden'>
            <div className='w-full fade-bottom-mask absolute z-0 mt-[-3rem] overflow-hidden'>
                <img src={gridTunnelImg} alt="" className='w-full h-full object-fill opacity-15 mix-blend-screen' />
            </div>
            <div className='flex flex-col items-center z-10 gap-[1rem] xl:gap-[1.5rem] text-center'>
                <h1 style={{ wordSpacing: '5rem' }} className='text-[2.5rem] tablet:text-[2.7rem] xl:text-[3.2rem] text-txt-black text-center font-Bold leading-[3.5rem] xl:leading-[4rem] mini-desktop:w-[60%] mini-desktop:text-[3rem] [word-spacing:1rem]'><div className="inline-block">
                    {["Where", "Bold", "Ideas"].map((word, i) => (
                        <motion.span
                            key={i}
                            custom={i}
                            variants={fadeInUp}
                            initial="hidden"
                            animate="visible"
                            className={`mr-[0.7rem] inline-block ${word === "Bold" || word === "Ideas"
                                ? "bg-gradient-to-r from-[#1E40AF] to-[#0EA5E9] bg-clip-text text-transparent"
                                : ""
                                }`}
                        >
                            {word}
                        </motion.span>
                    ))}
                </div>

                    <br className="hidden mobile:flex" />

                    <div className="inline-block">
                        {["Meet", "the", "Right", "Eyes."].map((word, i) => (
                            <motion.span
                                key={i + 3}
                                custom={i + 3}
                                variants={fadeInUp}
                                initial="hidden"
                                animate="visible"
                                className="mr-[0.7rem] inline-block"
                            >
                                {word}
                            </motion.span>
                        ))}
                    </div></h1>
                <motion.p
                    variants={fadeIn('up', 0.7)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className='text-txt-gray-black text-[0.9rem] tablet:text-[1rem] mini-desktop:text-[1.1rem] xl:text-[1.3rem] font-Regular w-auto leading-[1.6rem]'
                >Bridging visionary founders with the investors who believe in them.</motion.p>
                <motion.div
                    variants={btnFadeInUp}
                    initial="hidden"
                    animate="visible"
                    className='bg-btn-blue font-Medium text-nav-white py-[0.5rem] px-[1.5rem] rounded-3xl cursor-pointer hover:bg-hover-blue border-none outline-none transition'
                    onClick={scrollToSection}
                >
                    <button>
                        Get Started
                        <FontAwesomeIcon icon={faChevronRight} className='ml-[0.8rem]' />
                    </button>
                </motion.div>
                <div className='w-[90%] fade-bottom-mask mt-[2rem]'>
                    <motion.img
                        variants={fadeIn('up', 0.5)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        src={uploadPitchImg}
                        alt="hero-img"
                        className='w-full h-full object-fill rounded-[0.5rem]'
                    />
                </div>
            </div>
        </div>
    )
}

export default HeroSec