import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import PitchCard from "../components/PitchCard";
import { useParams } from "react-router-dom";

const FindPitches = () => {
  // const params = useParams();
  // const [pitch, setpitch] = useState([]);
  // const [userEmail, setUserEmail] = useState(null);
  // const [userName, setUserName] = useState(null);

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
        {/* {pitch.map((pitch) => (
          <PitchCard
            link={pitch.data().link}
            key={pitch.id}
            id={pitch.id}
            {...pitch.data()}
          />
        ))} */}
      </div>
    </div>
  );
};

export default FindPitches;
