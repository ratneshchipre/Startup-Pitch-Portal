import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import PitchCard from "../components/PitchCard";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchPitchesForInvestor } from "../redux/slices/investorPitchSlice";

interface founderPitches {
  _id: string;
  userId: string;
  title: string;
  file: object;
  category: string;
  goal: number;
  tags: string;
}

const FindPitches = () => {
  const investorPitchesState = useAppSelector((state) => state.investorPitches);
  const dispatch = useAppDispatch();
  const [pitches, setPitches] = useState<founderPitches[] | null>(null);
  const { role, userId } = useParams();

  useEffect(() => {
    dispatch(fetchPitchesForInvestor());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(investorPitchesState.data)) {
      setPitches(investorPitchesState.data as founderPitches[]);
    } else {
      setPitches(null);
    }
  }, [investorPitchesState.data]);

  return (
    <div className="flex flex-col w-full">
      <div className="w-full mini-desktop:w-auto px-[1.5rem] py-[1rem] mt-[4.6rem] mini-desktop:ml-[20rem]">
        <h1 className="font-Medium text-txt-black text-[1.4rem]">
          Pitches you might like
        </h1>
        <input
          type="text"
          placeholder="Search for pitches..."
          className="w-full font-Regular text-txt-black px-[0.7rem] py-[0.7rem] border-border border-[1.5px] rounded-lg mt-[1rem]"
        />
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute bg-btn-blue mt-[1.35rem] text-[1.2rem] py-[0.55rem] px-[0.6rem] ml-[-2.8rem] rounded-lg text-nav-white cursor-pointer hover:bg-hover-blue transition-all"
        />
      </div>
      <div className="flex flex-col w-full pb-[1.5rem]">
        {pitches?.map((pitch) => (
          <PitchCard
            id={pitch._id}
            key={pitch._id}
            link={`/account/${role}/${userId}/find-pitches/${pitch._id}`}
            {...pitch}
          />
        ))}
      </div>
    </div>
  );
};

export default FindPitches;
