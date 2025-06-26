import React, { useEffect, useState } from "react";
import headLogo from "../assets/headLogo(black).png";
import googleImg from "../assets/googleImg.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useStartupContext } from "../contexts/StartupContext";
import { useFirebase } from "../contexts/Firebase";

const Signup = () => {
  const [role, setRole] = useState("Select a role");

  const firebase = useFirebase();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupEnabled, setSignupEnabled] = useState(false);

  useEffect(() => {
    setSignupEnabled(
      name &&
        lastName &&
        email.endsWith("@gmail.com") &&
        password.length >= 6 &&
        (role === "Sign Up as a Founder" || role === "Sign Up as an Investor")
    );
  }, [role, email, password, name, lastName]);

  const saveFormToLocalStorage = () => {
    const form = {
      email1: email,
      name1: name,
      lastName1: lastName,
      password1: password,
      role1: role.includes("Founder") ? "Founder" : "Investor",
    };
    localStorage.setItem("form", JSON.stringify(form));
    sessionStorage.setItem("choice", form.role1);
  };

  const handleGoogleLogin = async () => {
    const selectedRole =
      role === "Sign Up as a Founder"
        ? "Founder"
        : role === "Sign Up as an Investor"
        ? "Investor"
        : null;

    if (!selectedRole) {
      alert("Please select a role first");
      return;
    }

    sessionStorage.setItem("choice", selectedRole); // optional fallback
    await firebase.signupWithGoogle(navigate, selectedRole);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!signupEnabled) return;
    saveFormToLocalStorage();
    navigate("/account/signup/otp-verification");
  };

  return (
    <div className="flex flex-col justify-center items-center px-[2rem]">
      <div className="w-auto sm:w-[30rem] mx-auto bg-signin flex flex-col justify-center items-center py-[1.5rem] px-[2.5rem] mb-[2rem] mt-[7rem] shadow-lg rounded-2xl border-border border-[1px]">
        <div className="flex flex-col items-center">
          <img src={headLogo} alt="logo" className="w-[6rem]" />
        </div>
        <div className="flex w-full flex-col items-center">
          <h2 className="font-Bold text-txt-black text-center w-full text-[1.4rem]">
            Join NextMove Now!
          </h2>
          <p className="font-Regular w-full text-txt-gray-black text-[1.1rem] text-center mt-[0.3rem]">
            Sign Up as a Founder or an Investor
          </p>
          <div className="flex w-full gap-[0.5rem]">
            <button
              className={`flex w-full justify-center items-center mt-[1.5rem] font-Regular text-txt-gray-black border-border border-[1px] py-[0.5rem] px-[0.9rem] rounded-xl cursor-pointer hover:border-txt-black focus:bg-btn-blue focus:text-nav-white focus:border-btn-blue ${
                role === "founder"
                  ? "bg-btn-blue border-btn-blue text-white"
                  : ""
              } ${role === "founder" ? "text-nav-white" : ""}`}
              onClick={() => setRole("Sign Up as a Founder")}
            >
              Join as a Founder
            </button>
            <button
              className={`flex w-full justify-center items-center mt-[1.5rem] font-Regular text-txt-gray-black border-border border-[1px] py-[0.5rem] px-[0.9rem] rounded-xl cursor-pointer hover:border-txt-black focus:bg-btn-blue focus:text-nav-white focus:border-btn-blue ${
                role === "investor"
                  ? "bg-btn-blue border-btn-blue text-white"
                  : ""
              } ${role === "investor" ? "text-nav-white" : ""}`}
              onClick={() => setRole("Sign Up as an Investor")}
            >
              Join as an Investor
            </button>
          </div>
          <button
            className={`flex w-full justify-center items-center mt-[1.5rem] font-Regular text-txt-gray-black border-border border-[1px] py-[0.5rem] px-[0.4rem] rounded-xl ${
              role === "Sign Up as a Founder" ||
              role === "Sign Up as an Investor"
                ? "cursor-pointer hover:border-txt-black"
                : "cursor-not-allowed opacity-50 hover:border-border"
            }`}
            onClick={handleGoogleLogin}
            disabled={
              !(
                role === "Sign Up as a Founder" ||
                role === "Sign Up as an Investor"
              )
            }
          >
            <img
              src={googleImg}
              alt="google-logo"
              className="w-[1.4rem] mr-[0.5rem]"
            />
            Continue with Google
          </button>
          <div className="w-full flex flex-col justify-center items-center">
            <hr className="w-full mt-[2rem] text-border" />
            <span className="font-Regular text-center text-[1.1rem] text-txt-gray-black bg-signin mt-[-0.9rem] px-[0.5rem]">
              or
            </span>
          </div>
          <form
            onSubmit={handleFormSubmit}
            className="w-full flex flex-col justify-center items-center"
          >
            <div className="flex flex-col items-start w-full font-Regular mt-[1rem]">
              <label className="text-[1.1rem]">First Name</label>
              <input
                type="text"
                placeholder="Enter your first name"
                className="border-border w-full border-[1px] mt-[0.5rem] rounded-lg px-[0.8rem] py-[0.5rem] outline-txt-gray-black-black"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col items-start w-full font-Regular mt-[1rem]">
              <label className="text-[1.1rem]">Last Name</label>
              <input
                type="text"
                placeholder="Enter your last name"
                className="border-border w-full border-[1px] mt-[0.5rem] rounded-lg px-[0.8rem] py-[0.5rem] outline-txt-gray-black-black"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col items-start w-full font-Regular mt-[1rem]">
              <label className="text-[1.1rem]">Email address</label>
              <input
                type="email"
                placeholder="Enter your email address"
                className="border-border w-full border-[1px] mt-[0.5rem] rounded-lg px-[0.8rem] py-[0.5rem] outline-txt-gray-black-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col items-start w-full font-Regular mt-[1rem]">
              <label className="text-[1.1rem]">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="border-border w-full border-[1px] mt-[0.5rem] rounded-lg px-[0.8rem] py-[0.5rem] outline-txt-gray-black-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className={`font-Regular mt-[1.5rem] bg-border text-nav-white w-full py-[0.5rem] text-center rounded-lg cursor-not-allowed transition ${
                signupEnabled
                  ? "cursor-pointer bg-btn-blue"
                  : "cursor-not-allowed"
              }`}
            >
              {role}
              <FontAwesomeIcon icon={faCaretRight} className="ml-[0.5rem]" />
            </button>
          </form>
          <div className="flex flex-col mt-[1rem] w-full">
            <span className="font-Regular text-txt-black text-center">
              Already have an account?{" "}
              <Link
                to="/account/login"
                className="text-btn-blue hover:underline"
              >
                Log In
              </Link>
            </span>
            <span className="font-Regular text-[0.9rem] mt-[1rem] text-center">
              By continuing, you agree to NextMove's <br />
              <Link
                to="/terms-and-conditions"
                className="text-btn-blue hover:underline"
              >
                Terms and Condition
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy-and-policy"
                className="text-btn-blue hover:underline"
              >
                Privacy Policy
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
