import { useEffect, useState } from "react";
import headLogo from "../assets/headLogo(black).png";
import googleImg from "../assets/googleImg.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [logInEnabled, setLogInEnabled] = useState(false);

  // useEffect(() => {
  //   setLogInEnabled(
  //     email && email.endsWith("@gmail.com") && password.length >= 6
  //   );
  // }, [email, password]);

  // const handleLogIn = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   try {
  //     // await firebase.signinUserWithEmailAndPass(email, password);
  //     // const role = JSON.parse(localStorage.getItem("form"))?.role1;
  //     // alert("Login successful!");
  //     // navigate(`/account/${role.toLowerCase()}/profile`);

  //     const { role } = await firebase.signinUserWithEmailAndPass(
  //       email,
  //       password
  //     );
  //     alert("Login successful!");
  //     navigate(`/account/${role.toLowerCase()}/profile`);
  //   } catch (error) {
  //     console.error("Login failed:", error);
  //     alert("Invalid credentials. Please try again.");
  //   }
  //   setLoading(false);
  // };

  // const handleGoogleLogin = async () => {
  //   const role = JSON.parse(localStorage.getItem("form"))?.role1;
  //   await firebase.signinWithGoogle(role, navigate);
  // };

  return (
    <div className="flex flex-col justify-center items-center px-[2rem]">
      <div className="w-auto sm:w-[30rem] mx-auto bg-signin flex flex-col justify-center items-center py-[1.5rem] px-[2.5rem] mb-[2rem] mt-[7rem] shadow-lg rounded-2xl border-border border-[1px]">
        <div className="flex flex-col items-center">
          <img src={headLogo} alt="logo" className="w-[6rem]" />
        </div>
        <div className="flex w-full flex-col items-center">
          <h2 className="font-Bold text-txt-black text-center text-[1.4rem]">
            Log In to NextMove
          </h2>
          <p className="font-Regular text-txt-gray-black text-[1.1rem] text-center mt-[0.3rem]">
            Welcome back! Please log in to continue
          </p>
          <button
            // onClick={handleGoogleLogin}
            className="flex w-full justify-center items-center mt-[1.5rem] font-Regular text-txt-gray-black border-border border-[1px] px-[0.4rem] py-[0.5rem] rounded-xl cursor-pointer hover:border-txt-black"
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
            // onSubmit={handleLogIn}
            className="w-full flex flex-col justify-center items-center"
          >
            <div className="flex flex-col items-start w-full font-Regular mt-[1rem]">
              <span className="text-[1.1rem]">Email address</span>
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
              <span className="text-[1.1rem]">Password</span>
              <input
                type="password"
                placeholder="Enter your password"
                className="border-border w-full border-[1px] mt-[0.5rem] rounded-lg px-[0.8rem] py-[0.5rem] outline-txt-gray-black-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col w-full mt-[0.5rem]">
              <Link to="/account/login/reset-password">
                <span className="font-Medium text-btn-blue text-[1.05rem] cursor-pointer">
                  Forgot password?
                </span>
              </Link>
            </div>
            <button
              className={`font-Regular mt-[1rem] bg-border text-nav-white w-full py-[0.5rem] text-center rounded-lg cursor-not-allowed transition ${
                !logInEnabled
                  ? "cursor-not-allowed"
                  : "cursor-pointer bg-btn-blue"
              }`}
              disabled={loading}
            >
              Continue
              <FontAwesomeIcon icon={faCaretRight} className="ml-[0.5rem]" />
            </button>
          </form>
          <div className="flex flex-col mt-[1rem] w-full">
            <span className="font-Regular text-txt-black text-center">
              Don't have an account yet?{" "}
              <Link
                to="/account/signup"
                className="text-btn-blue hover:underline"
              >
                Sign Up
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

export default Login;
