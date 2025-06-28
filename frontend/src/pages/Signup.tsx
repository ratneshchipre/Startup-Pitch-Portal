import { useState } from "react";
import headLogo from "../assets/headLogo(black).png";
import googleImg from "../assets/googleImg.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

type SignupFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
};

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignupFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "Select a role",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignupForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/user/signup", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: formData.role.split(" ").pop(),
      });
      console.log(response);
      if (response.data.success === true) {
        navigate(
          `/account/${response.data.user.role.toLowerCase()}/${
            response.data.user.id
          }/profile`
        );
      }
    } catch (error) {}
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
              className={`flex w-full justify-center items-center mt-[1.5rem] font-Regular border-[1px] py-[0.5rem] px-[0.9rem] rounded-xl cursor-pointer hover:border-txt-black focus:bg-btn-blue focus:text-nav-white focus:border-btn-blue ${
                formData.role === "Sign up as a Founder"
                  ? "bg-btn-blue border-btn-blue text-nav-white"
                  : "border-border text-txt-gray-black"
              }`}
              onClick={() =>
                setFormData({ ...formData, role: "Sign up as a Founder" })
              }
            >
              Join as a Founder
            </button>
            <button
              className={`flex w-full justify-center items-center mt-[1.5rem] font-Regular border-[1px] py-[0.5rem] px-[0.9rem] rounded-xl cursor-pointer hover:border-txt-black ${
                formData.role === "Sign up as an Investor"
                  ? "focus:bg-btn-blue focus:text-nav-white focus:border-btn-blue"
                  : "text-txt-gray-black border-border"
              }`}
              onClick={() =>
                setFormData({ ...formData, role: "Sign up as an Investor" })
              }
            >
              Join as an Investor
            </button>
          </div>
          <button
            className={`flex w-full justify-center items-center mt-[1.5rem] font-Regular text-txt-gray-black border-border border-[1px] py-[0.5rem] px-[0.4rem] rounded-xl ${
              formData.role === "Sign up as a Founder" ||
              formData.role === "Sign up as an Investor"
                ? "cursor-pointer hover:border-txt-black"
                : "cursor-not-allowed opacity-50 hover:border-border"
            }`}
            disabled={
              !(
                formData.role === "Sign up as a Founder" ||
                formData.role === "Sign up as an Investor"
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
            onSubmit={handleSignupForm}
            className="w-full flex flex-col justify-center items-center"
          >
            <div className="flex flex-col items-start w-full font-Regular mt-[1rem]">
              <label className="text-[1.1rem]">First Name</label>
              <input
                type="text"
                required
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                className="border-border w-full border-[1px] mt-[0.5rem] rounded-lg px-[0.8rem] py-[0.5rem] outline-txt-gray-black-black"
              />
            </div>
            <div className="flex flex-col items-start w-full font-Regular mt-[1rem]">
              <label className="text-[1.1rem]">Last Name</label>
              <input
                type="text"
                required
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
                className="border-border w-full border-[1px] mt-[0.5rem] rounded-lg px-[0.8rem] py-[0.5rem] outline-txt-gray-black-black"
              />
            </div>
            <div className="flex flex-col items-start w-full font-Regular mt-[1rem]">
              <label className="text-[1.1rem]">Email address</label>
              <input
                type="email"
                required
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className="border-border w-full border-[1px] mt-[0.5rem] rounded-lg px-[0.8rem] py-[0.5rem] outline-txt-gray-black-black"
              />
            </div>
            <div className="flex flex-col items-start w-full font-Regular mt-[1rem]">
              <label className="text-[1.1rem]">Password</label>
              <input
                type="password"
                required
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="border-border w-full border-[1px] mt-[0.5rem] rounded-lg px-[0.8rem] py-[0.5rem] outline-txt-gray-black-black"
              />
            </div>
            <button
              type="submit"
              className={`font-Regular mt-[1.5rem] text-nav-white w-full py-[0.5rem] text-center rounded-lg cursor-not-allowed transition ${
                formData.role === "Sign up as a Founder" ||
                formData.role === "Sign up as an Investor"
                  ? "bg-btn-blue cursor-pointer"
                  : "bg-border cursor-not-allowed"
              }`}
            >
              {formData.role}
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
