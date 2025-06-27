import { useState } from "react";
import { LuUpload } from "react-icons/lu";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faUserLarge } from "@fortawesome/free-solid-svg-icons";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import avatarImg from "../assets/avatarImg.png";
import { Link, useNavigate, useParams } from "react-router-dom";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  let navigate = useNavigate();
  const { role } = useParams();

  return (
    <div className="flex flex-col mini-desktop:flex-row w-full items-center">
      <div className="fixed flex gap-[1.2rem] items-center w-full top-0 py-[1rem] px-[1rem] mini-desktop:px-[2rem] z-100 bg-nav-white border-b-dash-border border-b-[2px]">
        <div className="flex mini-desktop:hidden">
          <FontAwesomeIcon
            icon={faBars}
            onClick={() => setIsOpen(!isOpen)}
            className="text-txt-black p-[0.4rem] hover:bg-gray-200 rounded-lg cursor-pointer transition border-border border-[1px]"
          />
        </div>
        <h1 className="font-Medium text-[1.3rem] text-txt-black select-none">
          Welcome, {}!
        </h1>
      </div>
      <div
        className={`fixed top-0 left-0 h-full bg-nav-white border-r-dash-border border-r-[2px] transition-all duration-300 ease-in-out w-[70%] mobile:w-[20rem] overflow-hidden z-50 mini-desktop:fixed ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        } mini-desktop:opacity-100 mini-desktop:pointer-events-auto shadow-2xl mini-desktop:shadow-lg`}
      >
        <div className="mt-[5.5rem] flex flex-col items-center justify-center border-b-dash-border border-b-[2px] pb-[1.2rem] px-[3rem]">
          <div className="flex w-[5rem] rounded-[50%] flex-col items-center justify-center">
            <img
              src={`${avatarImg}`}
              alt="avatar"
              className="h-full w-full rounded-[50%] object-cover bg-center"
            />
          </div>
          <div className="flex flex-col w-auto justify-center items-center mt-[1rem]">
            <h2 className="font-Medium text-txt-black text-center text-[1.1rem] line-clamp-1 overflow-hidden [-webkit-box-orient:vertical] [display:-webkit-box]">
              {}
            </h2>
            <p className="font-Regular text-txt-gray-black text-center wrap-break-word line-clamp-1 overflow-hidden [-webkit-box-orient:vertical] [display:-webkit-box]">
              {}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center px-[1rem] py-[1.3rem]">
          <div className="w-full">
            <ul className="font-Medium flex flex-col text-features gap-[0.4rem]">
              <li>
                <Link
                  to={`${
                    role === "founder"
                      ? "/account/founder/profile"
                      : "/account/investor/profile"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <button className="flex items-center w-full gap-[1.2rem] px-[1.5rem] py-[0.7rem] rounded-lg hover:bg-blue-50 hover:text-btn-blue cursor-pointer transition-all focus:bg-blue-50 focus:text-btn-blue">
                    <FontAwesomeIcon icon={faUserLarge} className="" />
                    <span className="text-[1.1rem]">Profile</span>
                  </button>
                </Link>
              </li>
              <li>
                <Link
                  to={`${
                    role === "founder"
                      ? "/account/founder/create-pitch"
                      : "/account/investor/find-pitches"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <button className="flex items-center w-full gap-[1.2rem] px-[1.5rem] py-[0.7rem] rounded-lg hover:bg-blue-50 hover:text-btn-blue cursor-pointer transition-all focus:bg-blue-50 focus:text-btn-blue">
                    {role === "founder" ? <LuUpload /> : <FaMagnifyingGlass />}
                    <span className="text-[1.1rem]">
                      {role === "founder" ? "Upload Pitch" : "Find Pitches"}
                    </span>
                  </button>
                </Link>
              </li>
              <li>
                <Link
                  to={`${
                    role === "founder"
                      ? "/account/founder/my-pitches"
                      : "/account/investor/saved-pitches"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <button className="flex items-center w-full gap-[1.2rem] px-[1.5rem] py-[0.7rem] rounded-lg hover:bg-blue-50 hover:text-btn-blue cursor-pointer transition-all focus:bg-blue-50 focus:text-btn-blue">
                    <FontAwesomeIcon
                      icon={role === "founder" ? faList : faHeart}
                      className=""
                    />
                    <span className="text-[1.1rem]">
                      {role === "founder" ? "My Pitches" : "Saved Pitches"}
                    </span>
                  </button>
                </Link>
              </li>
              <li>
                <Link
                  to={`${
                    role === "founder"
                      ? "/account/founder/analytics"
                      : "/account/investor/my-investments"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <button className="flex items-center w-full gap-[1.2rem] px-[1.5rem] py-[0.7rem] rounded-lg hover:bg-blue-50 hover:text-btn-blue cursor-pointer transition-all focus:bg-blue-50 focus:text-btn-blue">
                    <FontAwesomeIcon icon={faChartLine} className="" />
                    <span className="text-[1.1rem]">
                      {role === "founder" ? "Analytics" : "My Investments"}
                    </span>
                  </button>
                </Link>
              </li>
              {role === "founder" && (
                <li>
                  <Link
                    to="/account/founder/feedback"
                    onClick={() => setIsOpen(false)}
                  >
                    <button className="flex items-center w-full gap-[1.2rem] px-[1.5rem] py-[0.7rem] rounded-lg hover:bg-blue-50 hover:text-btn-blue cursor-pointer transition-all focus:bg-blue-50 focus:text-btn-blue">
                      <FontAwesomeIcon icon={faComment} className="" />
                      <span className="text-[1.1rem]">Feedback</span>
                    </button>
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <div
            className={`w-full font-Medium flex flex-col ${
              role === "founder" ? "mt-[3.5rem]" : "mt-[7rem]"
            }  text-features gap-[0.4rem]`}
          >
            <Link to="/account/:role/ResetPassword">
              <button className="flex items-center w-full gap-[1.2rem] px-[1.5rem] py-[0.7rem] rounded-lg hover:bg-blue-50 hover:text-btn-blue cursor-pointer transition-all focus:bg-blue-50 focus:text-btn-blue">
                <FontAwesomeIcon icon={faGear} className="" />
                <span className="text-[1.1rem]">Settings</span>
              </button>
            </Link>
            <button className="flex items-center w-full gap-[1.2rem] px-[1.5rem] py-[0.7rem] rounded-lg hover:bg-red-100 hover:text-red-400 cursor-pointer transition-all focus:bg-red-100 focus:text-red-400">
              <FontAwesomeIcon icon={faArrowRightFromBracket} className="" />
              <span className="text-[1.1rem]">Log Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
