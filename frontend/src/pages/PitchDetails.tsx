import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faDollarSign,
  faList,
  faPaperclip,
  faTag,
  faAddressBook,
  faStar,
  faStarHalfStroke,
} from "@fortawesome/free-solid-svg-icons";
import {
  faComment,
  faHeart as faHeartRegular,
} from "@fortawesome/free-regular-svg-icons";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchPitchDetails } from "../redux/slices/pitchDetailsSlice";

type PitchRatingTypes = {
  rating: number;
  hover: number | null;
  locked: boolean;
};

interface PitchTypes {
  _id: string;
  title: string;
  details: string;
  file: {
    url: string;
  };
  category: string;
  goal: number;
  tags: string;
}

const PitchDetails = () => {
  const pitchDetailsState = useAppSelector((state) => state.pitchDetails);
  const dispatch = useAppDispatch();
  const [pitch, setPitch] = useState<PitchTypes | null>(null);
  const navigate = useNavigate();
  const { role, pitchId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pitchRating, setPitchRating] = useState<PitchRatingTypes>({
    rating: 0,
    hover: null,
    locked: false,
  });

  useEffect(() => {
    dispatch(fetchPitchDetails({ pitchId }));
    console.log(pitchDetailsState.data);
  }, [dispatch]);

  useEffect(() => {
    if (pitchDetailsState.isLoading) {
      setLoading(true);
      setError(null);
      return;
    }

    if (pitchDetailsState.isError) {
      setLoading(false);
      setError("Failed to load pitches.");
      setPitch(null);
      return;
    }

    if (pitchDetailsState.data && pitchDetailsState.data._id) {
      setPitch({
        _id: pitchDetailsState.data._id || "",
        title: pitchDetailsState.data.title || "",
        details: pitchDetailsState.data.details || "",
        file: {
          url:
            pitchDetailsState.data.file &&
            typeof pitchDetailsState.data.file === "object" &&
            "url" in pitchDetailsState.data.file
              ? (pitchDetailsState.data.file.url as string)
              : "",
        },
        category: pitchDetailsState.data.category || "",
        goal: pitchDetailsState.data.goal || 0,
        tags: pitchDetailsState.data.tags || "",
      });
      setError(null);
    } else if (!pitchId) {
      setPitch(null);
      setError("No Pitch ID provided in the URL.");
    } else {
      setPitch(null);
      setError("No pitches loaded or matching ID found.");
    }
    setLoading(false);
  }, [
    pitchDetailsState.isLoading,
    pitchDetailsState.isError,
    pitchDetailsState.data,
    pitchId,
  ]);

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

  // if (loading) {
  //   return <p className="text-center mt-10">Loading pitch details...</p>;
  // }

  // if (!pitch) {
  //   return <p className="text-center mt-19 text-red-500">Pitch not found.</p>;
  // }

  return (
    <div className="flex flex-col w-full">
      <div className="absolute z-100 mini-desktop:w-[80%] mini-desktop:right-0 flex w-full min-h-screen">
        <div className="flex flex-col bg-nav-white w-full min-h-screen px-[1.5rem] pt-[1.5rem] pb-[1.5rem] mini-desktop:pb-[0rem] transition-all duration-300 ease-in-out mini-desktop:shadow-2xl">
          <div className="w-full border-b-border border-b-[1px]">
            <FontAwesomeIcon
              onClick={() => navigate(-1)}
              icon={faArrowLeft}
              className="text-btn-blue text-[1.5rem] cursor-pointer pb-[1rem]"
            />
          </div>
          <div className="flex flex-col w-full mini-desktop:flex-row mini-desktop:gap-[3rem]">
            <div className="flex flex-col w-full mini-desktop:w-[70%]">
              <div className="flex flex-col mt-[1.5rem]">
                <h2 className="font-Medium text-txt-black text-[1.3rem]">
                  {pitch?.title}
                </h2>
                <p className="font-Regular text-txt-gray-black mt-[2rem] mb-[2rem] pb-[1.5rem] border-b-border border-b-[1px]">
                  {pitch?.details}
                </p>
              </div>
              <div className="flex flex-col gap-[2rem] border-b-border border-b-[1px] pb-[1.5rem]">
                <div className="flex gap-[0.5rem]">
                  <FontAwesomeIcon
                    icon={faDollarSign}
                    className="text-txt-black text-[1.1rem] mt-[0.2rem]"
                  />
                  <div className="flex flex-col">
                    <span className="font-Medium text-txt-black">
                      Proposed Funding
                    </span>
                    <span className="font-Regular text-txt-gray-black">
                      {pitch?.goal}
                    </span>
                  </div>
                </div>
                <div className="flex gap-[0.5rem]">
                  <FontAwesomeIcon
                    icon={faList}
                    className="text-txt-black text-[1.1rem] mt-[0.2rem]"
                  />
                  <div className="flex flex-col">
                    <span className="font-Medium text-txt-black">
                      Pitch Category
                    </span>
                    <span className="font-Regular text-txt-gray-black">
                      {pitch?.category}
                    </span>
                  </div>
                </div>
              </div>
              <div
                className={`flex flex-col mt-[1.5rem] pb-[2rem] ${
                  role === "founder"
                    ? "border-none"
                    : "border-b-border border-b-[1px]"
                }`}
              >
                <div className="flex gap-[0.7rem]">
                  <FontAwesomeIcon
                    icon={faPaperclip}
                    className="text-txt-black text-[1.1rem] mt-[0.2rem]"
                  />
                  <h2 className="font-Medium text-txt-black">
                    Pitch Attachments
                  </h2>
                </div>
                <div className="mt-[1rem] h-[22rem] w-full">
                  <img
                    src={pitch?.file.url}
                    className="rounded-2xl h-full w-full object-cover"
                  ></img>
                </div>
              </div>
              {role != "founder" && (
                <div className="flex flex-col mt-[1.5rem] border-b-border border-b-[1px] mini-desktop:pb-[1rem] mini-desktop:border-none">
                  <div className="flex gap-[0.7rem]">
                    <FontAwesomeIcon
                      icon={faComment}
                      className="text-txt-black text-[1.1rem] mt-[0.2rem]"
                    />
                    <h2 className="font-Medium text-txt-black">Feedback</h2>
                  </div>
                  <div className="mt-[0.8rem] w-full pb-[2rem] mini-desktop:pb-[0rem]">
                    <textarea
                      placeholder="Write a feedback..."
                      className="w-full font-Medium text-txt-gray-black rounded-lg py-[0.7rem] px-[0.8rem] h-[12rem] bg-dash-border resize-none"
                    ></textarea>
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col w-full mini-desktop:w-[30%]">
              <div
                className={`mt-[1.5rem] flex flex-col gap-[0.7rem] ${
                  role === "founder"
                    ? "border-none pb-[5rem]"
                    : "border-b-border border-b-[1px] pb-[2rem]"
                }`}
              >
                <div className="flex gap-[0.7rem]">
                  <FontAwesomeIcon
                    icon={faTag}
                    className="text-txt-black text-[1.1rem]"
                  />
                  <h2 className="font-Medium text-txt-black">Tags</h2>
                </div>
                <div className="flex flex-wrap gap-y-[1.5rem] gap-x-[0.8rem]">
                  {pitch?.tags && pitch.tags.split(",").length > 0 ? (
                    pitch.tags.split(",").map((tag, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-btn-blue font-Medium text-sm px-3 py-1 rounded-lg border border-btn-blue"
                      >
                        {tag}
                      </span>
                    ))
                  ) : (
                    <p className="font-Regular text-border">
                      No tags available.
                    </p>
                  )}
                </div>
              </div>
              {role != "founder" && (
                <div className="flex flex-col mt-[1.5rem] pb-[1rem]">
                  <div className="flex gap-[0.7rem]">
                    <FontAwesomeIcon
                      icon={faStarHalfStroke}
                      className="text-txt-black text-[1.1rem]"
                    />
                    <h2 className="font-Medium text-txt-black">
                      Give your Rating
                    </h2>
                  </div>
                  <div className="mt-[0.8rem] flex gap-[0.3rem] pb-[3.5rem]">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <FontAwesomeIcon
                        icon={faStar}
                        key={value}
                        className={`cursor-pointer text-[1.3rem] transition-all ${getStarClass(
                          value
                        )}`}
                        onClick={(e) => handleClick(value, e)}
                        onMouseMove={(e) => handleMouseMove(value, e)}
                        onMouseLeave={handleMouseLeave}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="fixed mini-desktop:sticky left-0 w-full flex flex-col bg-nav-white bottom-0">
            <hr className="w-full text-dash-border" />
            <div className="flex w-full">
              <div className="w-full py-[1rem] pl-[0.7rem] pr-[0.4rem]">
                <button className="w-full flex justify-center items-center font-Medium bg-btn-blue border-btn-blue border-[1px] py-[0.5rem] rounded-lg text-nav-white cursor-pointer hover:bg-hover-blue transition-all">
                  <FontAwesomeIcon
                    icon={faAddressBook}
                    className="text-[1.2rem] text-nav-white mr-[0.5rem]"
                  />
                  Contact Now
                </button>
              </div>
              {role != "founder" && (
                <div className="w-full py-[1rem] pr-[0.7rem] pl-[0.4rem]">
                  <button className="w-full flex justify-center items-center font-Medium border-btn-blue border-[1px] py-[0.5rem] rounded-lg cursor-pointer text-btn-blue hover:bg-dash-border transition-all">
                    <FontAwesomeIcon
                      icon={faHeartRegular}
                      className="text-[1.2rem] text-btn-blue mr-[0.5rem]"
                    />
                    Save Pitch
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PitchDetails;
