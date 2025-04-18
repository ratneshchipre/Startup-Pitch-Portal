import React, { useRef } from 'react'
import HeroSec from '../components/HeroSec'

const Home = () => {
    const sectionRef = useRef(null);

    return (
        <div className='flex flex-col items-center justify-center'>
            <HeroSec sectionRef={sectionRef} />
        </div>
    )
}

export default Home