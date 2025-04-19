import React from 'react'
import PitchCard from '../components/PitchCard'

const SavedPitches = () => {
    return (
        <div className='flex flex-col w-full'>
            <div className='w-full mini-desktop:w-auto px-[1.5rem] py-[1rem] mt-[4.6rem] mini-desktop:ml-[20rem]'>
                <h1 className='font-Medium text-txt-black text-[1.4rem]'>Your Saved Pitches</h1>
            </div>
            <div className='flex flex-col w-full pb-[1.5rem]'>
                <PitchCard />
                <PitchCard />
                <PitchCard />
            </div>
        </div>
    )
}

export default SavedPitches