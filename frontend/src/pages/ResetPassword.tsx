import headLogo from "../assets/headLogo(black).png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";

const ResetPassword = () => {
  const handleResetSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col justify-center items-center px-[2rem]">
      <div className="w-full tablet:w-[25rem] mx-auto bg-signin flex flex-col justify-center items-center py-[1.5rem] px-[2.5rem] mb-[2rem] mt-[7rem] shadow-lg rounded-2xl border-border border-[1px]">
        <div className="flex flex-col items-center">
          <img src={headLogo} alt="logo" className="w-[6rem]" />
        </div>
        <div className="flex w-full flex-col items-center">
          <h2 className="font-Bold text-txt-black text-center text-[1.4rem]">
            Reset Password
          </h2>
          <form
            onSubmit={handleResetSubmit}
            className="w-full flex flex-col justify-center items-center"
          >
            <div className="flex flex-col items-start w-full font-Regular mt-[1rem]">
              <span className="text-[1.1rem]">Email address</span>
              <input
                type="text"
                placeholder="Enter your registered email"
                className="border-border w-full border-[1px] mt-[0.5rem] rounded-lg px-[0.8rem] py-[0.5rem] outline-txt-gray-black-black"
              />
            </div>
          </form>
          <button className="font-Regular mt-[1rem] bg-border text-nav-white w-full py-[0.5rem] text-center cursor-pointer rounded-lg transition">
            Send Reset Link
            <FontAwesomeIcon icon={faCaretRight} className="ml-[0.5rem]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
