import { useState } from "react";
import headLogo from "../assets/headLogo(black).png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const OtpVerification = () => {

  return (
    <div className="flex flex-col justify-center items-center px-[2rem]">
      <div className="w-full tablet:w-[25rem] mx-auto bg-signin flex flex-col justify-center items-center py-[1.5rem] px-[2rem] mb-[2rem] mt-[7rem] shadow-lg rounded-2xl border-border border-[1px]">
        <Link to="/account/signup" className="w-full flex flex-col">
          <div>
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="text-txt-black text-[1.3rem]"
            />
          </div>
        </Link>
        <div className="flex flex-col items-center">
          <img src={headLogo} alt="logo" className="w-[6rem]" />
        </div>
        <div className="flex flex-col justify-center items-center text-center">
          <h2 className="font-Bold text-txt-black text-[1.4rem]">{}</h2>
          {/* {heading != "OTP Verified!" && (
            <span
              className={`font-Regular text-center ${
                condition.includes("Successfully")
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {condition}
            </span>
          )} */}
        </div>

        {/* {counter !== 0 && counter !== null && (
          <input
            type="text"
            className="font-Regular border-border w-full border-[1px] mt-[1rem] rounded-lg px-[0.8rem] py-[0.5rem] outline-txt-gray-black-black"
            placeholder="Enter 6-digit OTP"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        )}

        {heading != "OTP Verified!" && (
          <button
            className="font-Regular mt-[1rem] bg-btn-blue hover:bg-hover-blue text-nav-white w-full py-[0.5rem] text-center cursor-pointer rounded-lg transition"
            onClick={otpSent === "Send OTP" ? sendOtp : checkOtp}
          >
            {otpSent}
          </button>
        )}

        <Link
          to={
            condition === "Otp Sent Successfully!!"
              ? JSON.parse(localStorage.getItem("form")).role1 === "Founder"
                ? "/user/founder/profile"
                : "/user/investor/find-pitches"
              : `/account/signup`
          }
          className={`w-full bg-btn-blue rounded-lg hover:bg-hover-blue text-center mt-[1rem] transition-all ${
            counter === null ? "flex" : "hidden"
          }`}
        >
          <button
            className="text-center mx-auto text-nav-white font-Medium py-[0.5rem] px-[1rem]"
            onClick={() =>
              localStorage.setItem(
                "email",
                JSON.parse(localStorage.getItem("form"))?.email1
              )
            }
          >
            {condition === "OTP Sent Successfully!"
              ? "Continue"
              : "Return to Signup"}
          </button>
        </Link> */}
      </div>
    </div>
  );
};

export default OtpVerification;
