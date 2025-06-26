import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import { useFirebase } from "../contexts/Firebase";
import { useNavigate } from "react-router-dom";

const PitchCard = (props) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [locked, setLocked] = useState(false);
  const firebase = useFirebase();
  const [pitch, setPitches] = useState();
  const navigate = useNavigate();
  const { role } = useParams();

  useEffect(() => {
    firebase.listAllPitchs().then((pitch) => setPitches(pitch.docs));
  }, []);

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
    if (value <= activeValue) return "text-btn-blue";
    if (value - 0.5 === activeValue) return "text-btn-blue";
    return "text-gray-300";
  };

  const tags = Array.isArray(props.tags)
    ? props.tags
    : props.tags?.split(",").map((tag) => tag.trim());

  return (
    <div className="flex flex-col w-full">
      <div className="w-full mini-desktop:w-auto px-[1.5rem] mini-desktop:ml-[20rem]">
        <Link to={`/account/${role}/pitch/id/${props.id}`}>
          <div className="hover:bg-dash-border px-[1.2rem] py-[1.4rem] cursor-pointer rounded-md">
            <FontAwesomeIcon
              icon={faHeartRegular}
              className="absolute right-[3.5rem] text-[1.3rem] text-txt-black"
            />
            <h2 className="font-Regular text-btn-blue text-[1.2rem] line-clamp-2 overflow-hidden [-webkit-box-orient:vertical] [display:-webkit-box]">
              {props.pitch}
            </h2>
            <p className="font-Light text-txt-gray-black text-[1.05rem] line-clamp-3 overflow-hidden [-webkit-box-orient:vertical] [display:-webkit-box] mt-[0.8rem] mb-[2rem]">
              {props.pitchDetails}
            </p>
            <div className="flex justify-between gap-[1rem] items-center">
              <span className="font-Regular text-txt-gray-black">
                Proposed Funding($):{" "}
                <span className="text-txt-black">{props.funding_goal}</span>
              </span>
              <div className="flex gap-[0.3rem]">
                {[1, 2, 3, 4, 5].map((value) => (
                  <FontAwesomeIcon
                    icon={faStar}
                    key={value}
                    className={`cursor-pointer transition-all ${getStarClass(
                      value
                    )}`}
                    onClick={(e) => handleClick(value, e)}
                    onMouseMove={(e) => handleMouseMove(value, e)}
                    onMouseLeave={handleMouseLeave}
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
