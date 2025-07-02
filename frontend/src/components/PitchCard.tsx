import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";

type PitchRatingTypes = {
  rating: number;
  hover: number | null;
  locked: boolean;
};

interface PitchProps {
  _id: string;
  userId: string;
  title: string;
  details: string;
  file: object;
  category: string;
  goal: number;
  tags: string;
}

const PitchCard = (props: PitchProps) => {
  const { _id, title, details, goal } = props;
  const { role, userId } = useParams();
  const [pitchRating, setPitchRating] = useState<PitchRatingTypes>({
    rating: 0,
    hover: null,
    locked: false,
  });

  const handleClick = (value: number, e: React.MouseEvent) => {
    if (pitchRating.locked) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const isHalf = e.clientX - rect.left < rect.width / 2;
    const selected = isHalf ? value - 0.5 : value;
    setPitchRating({ ...pitchRating, rating: selected });
    setPitchRating({ ...pitchRating, locked: true });
  };

  const handleMouseMove = (value: number, e: React.MouseEvent) => {
    if (pitchRating.locked) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const isHalf = e.clientX - rect.left < rect.width / 2;
    const hovered = isHalf ? value - 0.5 : value;
    setPitchRating({ ...pitchRating, hover: hovered });
  };

  const handleMouseLeave = () => {
    if (pitchRating.locked) return;
    setPitchRating({ ...pitchRating, hover: null });
  };

  const getStarClass = (value: number) => {
    const activeValue =
      pitchRating.hover !== null ? pitchRating.hover : pitchRating.rating;
    if (value <= activeValue) return "text-btn-blue";
    if (value - 0.5 === activeValue) return "text-btn-blue";
    return "text-gray-300";
  };

  return (
    <div className="flex flex-col w-full">
      <div className="w-full mini-desktop:w-auto px-[1.5rem] mini-desktop:ml-[20rem]">
        <Link to={`/account/${role}/${userId}/my-pitches/${_id}`}>
          <div className="hover:bg-dash-border px-[1.2rem] py-[1.4rem] cursor-pointer rounded-md">
            <FontAwesomeIcon
              icon={faHeartRegular}
              className="absolute right-[3.5rem] text-[1.3rem] text-txt-black"
            />
            <h2 className="font-Regular text-btn-blue text-[1.2rem] line-clamp-2 overflow-hidden [-webkit-box-orient:vertical] [display:-webkit-box]">
              {title}
            </h2>
            <p className="font-Light text-txt-gray-black text-[1.05rem] line-clamp-3 overflow-hidden [-webkit-box-orient:vertical] [display:-webkit-box] mt-[0.8rem] mb-[2rem]">
              {details}
            </p>
            <div className="flex justify-between gap-[1rem] items-center">
              <span className="font-Regular text-txt-gray-black">
                Proposed Funding($):{" "}
                <span className="text-txt-black">{goal}</span>
              </span>
              <div className="flex gap-[0.3rem]">
                {[1, 2, 3, 4, 5].map((value) => (
                  <FontAwesomeIcon
                    icon={faStar}
                    key={value}
                    onClick={(e) => handleClick(value, e)}
                    onMouseMove={(e) => handleMouseMove(value, e)}
                    onMouseLeave={handleMouseLeave}
                    className={`cursor-pointer transition-all ${getStarClass(
                      value
                    )}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PitchCard;
