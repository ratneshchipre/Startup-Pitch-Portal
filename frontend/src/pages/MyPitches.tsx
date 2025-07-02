import { useEffect, useState } from "react";
import PitchCard from "../components/PitchCard";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchPitchesForFounder } from "../redux/slices/founderPitchSlice";

interface founderPitches {
  _id: string;
  userId: string;
  title: string;
  file: object;
  category: string;
  goal: number;
  tags: string;
}

const MyPitches = () => {
  const founderPitchesState = useAppSelector((state) => state.founderPitches);
  const dispatch = useAppDispatch();
  const [pitches, setPitches] = useState<founderPitches[] | null>(null);
  const { role, userId } = useParams();

  useEffect(() => {
    dispatch(fetchPitchesForFounder());
  }, [dispatch]);

  useEffect(() => {
    if (founderPitchesState.data) {
      setPitches(founderPitchesState.data);
    }
  }, [founderPitchesState.data]);

  return (
    <div className="flex flex-col w-full">
      <div className="w-full mini-desktop:w-auto px-[1.5rem] py-[1rem] mt-[4.6rem] mini-desktop:ml-[20rem]">
        <h1 className="font-Medium text-txt-black text-[1.4rem]">My Pitches</h1>
      </div>
      <div className="flex flex-col w-full pb-[1.5rem]">
        {pitches && pitches.length > 0 ? (
          pitches.map((pitch) => (
            <PitchCard
              key={pitch._id}
              id={pitch._id}
              link={`/account/${role}/${userId}/pitches/${pitch._id}`}
              {...pitch}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 mt-8">
            You have not created any pitches yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyPitches;
