import { useState } from "react";
import PitchCard from "../components/PitchCard";
import { useParams } from "react-router-dom";

const MyPitches = () => {
  // const { role, userId, pitchId } = useParams();
  const [pitches, setPitches] = useState<number>(0);

  setPitches(2);

  return (
    <div className="flex flex-col w-full">
      <div className="w-full mini-desktop:w-auto px-[1.5rem] py-[1rem] mt-[4.6rem] mini-desktop:ml-[20rem]">
        <h1 className="font-Medium text-txt-black text-[1.4rem]">My Pitches</h1>
      </div>
      <div className="flex flex-col w-full pb-[1.5rem]">
        {/* {pitches.length > 0 ? (
          pitches.map((pitch) => (
            <PitchCard
              key={pitch.id}
              id={pitch.id}
              link={`/account/${role}/${userId}/pitches/${pitchId}`}
              {...pitch.data()}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 mt-8">
            You have not created any pitches yet.
          </p>
        )} */}
      </div>
    </div>
  );
};

export default MyPitches;
