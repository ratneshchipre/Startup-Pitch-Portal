import headLogo from "../assets/headLogo(white).png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="flex flex-col justify-center items-center w-full py-[1.5rem] px-[1rem]">
      <div className="bg-footer text-nav-white w-[95%] rounded-2xl py-[2rem] px-[1.5rem]">
        <Link to="/" className="flex items-center justify-center">
          <h1 className="font-Regular text-[1.3rem]">NextMove</h1>
          <img src={headLogo} alt="logo" className="w-[4rem] ml-[-0.5rem]" />
        </Link>
        <div className="text-center">
          <span className="font-Light">
            Where Bold Ideas Meet the Right Eyes.
          </span>
        </div>
        <hr className="text-border mt-[1.5rem]" />
        <div className="mt-[1.5rem] flex flex-col justify-center ">
          <span className="text-center font-Light">
            © 2025 NextMove. All rights reserved.
          </span>
          <ul className="text-center font-Light flex flex-col justify-between mt-[1rem] gap-[0.5rem]">
            <Link to="/terms-and-conditions">
              <li className="text-border hover:text-nav-white cursor-pointer">
                Terms and Conditions
              </li>
            </Link>
            <Link to="/privacy-and-policy">
              <li className="text-border hover:text-nav-white cursor-pointer">
                Privacy Policy
              </li>
            </Link>
            <Link to="/">
              <li className="text-border hover:text-nav-white cursor-pointer">
                FAQ
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
